import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { loadMediaUrl, loadSignedUrl } from '../../utils/mediaLoader';

interface Connection {
  id: string;
  user_id: string;
  name: string;
  first_name: string;
  email: string;
  user_type: string;
  profile_picture_url: string | null;
  status: string;
  created_at: string;
}

interface ConnectionsListProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function ConnectionsList({ onNavigate }: ConnectionsListProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Connection[]>([]);
  const [sentRequests, setSentRequests] = useState<Connection[]>([]);
  const [profilePictureUrls, setProfilePictureUrls] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState<'connections' | 'requests'>('connections');
  const [confirmModal, setConfirmModal] = useState<{
    type: 'cancel' | 'remove';
    connectionId: string;
    fullName: string;
  } | null>(null);

  useEffect(() => {
    loadConnections();
  }, [user]);

  const loadConnections = async () => {
    if (!user) return;

    setIsLoading(true);

    try {
      // Load accepted connections
      const { data: acceptedData, error: acceptedError } = await supabase
        .from('connections')
        .select(`
          id,
          status,
          created_at,
          requester:requester_id(uuid, name, first_name, email, user_type, profile_picture_url),
          addressee:addressee_id(uuid, name, first_name, email, user_type, profile_picture_url)
        `)
        .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`)
        .eq('status', 'accepted');

      if (acceptedError) throw acceptedError;

      // Transform data (otherUser may be null if RLS blocks nested read before migration)
      const acceptedConnections: Connection[] = (acceptedData || []).map((conn: any) => {
        const otherUser = conn.requester?.uuid === user.id ? conn.addressee : conn.requester;
        return {
          id: conn.id,
          user_id: otherUser?.uuid,
          name: otherUser?.name,
          first_name: otherUser?.first_name,
          email: otherUser?.email,
          user_type: otherUser?.user_type,
          profile_picture_url: otherUser?.profile_picture_url ?? null,
          status: conn.status,
          created_at: conn.created_at,
        };
      }).filter((c: Connection) => c.user_id);

      setConnections(acceptedConnections);

      // Load pending requests (received)
      const { data: pendingData, error: pendingError } = await supabase
        .from('connections')
        .select(`
          id,
          status,
          created_at,
          requester:requester_id(uuid, name, first_name, email, user_type, profile_picture_url)
        `)
        .eq('addressee_id', user.id)
        .eq('status', 'pending');

      if (pendingError) throw pendingError;

      // Only include received requests where the requester (other user) still exists
      const pending: Connection[] = (pendingData || []).map((conn: any) => ({
        id: conn.id,
        user_id: conn.requester?.uuid,
        name: conn.requester?.name,
        first_name: conn.requester?.first_name,
        email: conn.requester?.email,
        user_type: conn.requester?.user_type,
        profile_picture_url: conn.requester?.profile_picture_url ?? null,
        status: conn.status,
        created_at: conn.created_at,
      })).filter((c: Connection) => c.user_id);

      setPendingRequests(pending);

      // Load sent requests (where current user is requester, status pending)
      const { data: sentData, error: sentError } = await supabase
        .from('connections')
        .select(`
          id,
          status,
          created_at,
          addressee:addressee_id(uuid, name, first_name, email, user_type, profile_picture_url)
        `)
        .eq('requester_id', user.id)
        .eq('status', 'pending');

      if (sentError) throw sentError;

      // Only include sent requests where the addressee (other user) still exists
      const sent: Connection[] = (sentData || []).map((conn: any) => ({
        id: conn.id,
        user_id: conn.addressee?.uuid,
        name: conn.addressee?.name,
        first_name: conn.addressee?.first_name,
        email: conn.addressee?.email,
        user_type: conn.addressee?.user_type,
        profile_picture_url: conn.addressee?.profile_picture_url ?? null,
        status: conn.status,
        created_at: conn.created_at,
      })).filter((c: Connection) => c.user_id);

      setSentRequests(sent);

      // Load signed URLs for all profile pictures (connections + received + sent)
      const allWithPics = [...acceptedConnections, ...pending, ...sent];
      const urlMap: Record<string, string> = {};
      await Promise.all(
        allWithPics.map(async (c) => {
          if (c.profile_picture_url && c.user_id) {
            const path = c.profile_picture_url;
            const url = path.startsWith('http')
              ? path
              : path.startsWith('profile-media/')
                ? await loadMediaUrl(path)
                : await loadSignedUrl('profile-media', path);
            if (url) urlMap[c.user_id] = url;
          }
        })
      );
      setProfilePictureUrls(urlMap);
    } catch (error) {
      console.error('Error loading connections:', error);
      alert(t.community.failedToLoadConnections);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (connectionId: string) => {
    setActionLoading({ ...actionLoading, [connectionId]: true });

    try {
      const { error } = await supabase
        .from('connections')
        .update({ status: 'accepted' })
        .eq('id', connectionId);

      if (error) throw error;

      // Reload connections
      await loadConnections();
    } catch (error) {
      console.error('Error accepting connection:', error);
      alert(t.common.error);
    } finally {
      setActionLoading({ ...actionLoading, [connectionId]: false });
    }
  };

  const handleDecline = async (connectionId: string) => {
    setActionLoading({ ...actionLoading, [connectionId]: true });

    try {
      const { error } = await supabase
        .from('connections')
        .delete()
        .eq('id', connectionId);

      if (error) throw error;

      // Reload connections
      await loadConnections();
    } catch (error) {
      console.error('Error declining connection:', error);
      alert(t.common.error);
    } finally {
      setActionLoading({ ...actionLoading, [connectionId]: false });
    }
  };

  const performRemove = async (connectionId: string) => {
    setActionLoading((prev) => ({ ...prev, [connectionId]: true }));
    try {
      const { error } = await supabase
        .from('connections')
        .delete()
        .eq('id', connectionId);
      if (error) throw error;
      await loadConnections();
    } catch (error) {
      console.error('Error removing connection:', error);
      alert(t.common.error);
    } finally {
      setActionLoading((prev) => ({ ...prev, [connectionId]: false }));
      setConfirmModal(null);
    }
  };

  const performDecline = async (connectionId: string) => {
    setActionLoading((prev) => ({ ...prev, [connectionId]: true }));
    try {
      const { error } = await supabase
        .from('connections')
        .delete()
        .eq('id', connectionId);
      if (error) throw error;
      await loadConnections();
    } catch (error) {
      console.error('Error declining connection:', error);
      alert(t.common.error);
    } finally {
      setActionLoading((prev) => ({ ...prev, [connectionId]: false }));
      setConfirmModal(null);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '24px',
          textAlign: 'center',
          color: '#979797',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        {t.common.loading}
      </div>
    );
  }

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: isMobile ? '10px 12px' : '16px 20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
      }}
    >
      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: isMobile ? '4px' : '12px',
          marginBottom: isMobile ? '12px' : '16px',
          borderBottom: '1px solid #e0e0e0',
          overflow: 'hidden',
        }}
      >
        <button
          onClick={() => setActiveTab('connections')}
          style={{
            padding: isMobile ? '6px 6px' : '10px 16px',
            background: 'transparent',
            border: 'none',
            borderBottom:
              activeTab === 'connections' ? '2px solid #388896' : '2px solid transparent',
            fontFamily: 'Roboto, sans-serif',
            fontSize: isMobile ? '11px' : '13px',
            fontWeight: 600,
            color: activeTab === 'connections' ? '#388896' : '#979797',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {t.community.myConnections} ({connections.length})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          style={{
            padding: isMobile ? '6px 6px' : '10px 16px',
            background: 'transparent',
            border: 'none',
            borderBottom:
              activeTab === 'requests' ? '2px solid #388896' : '2px solid transparent',
            fontFamily: 'Roboto, sans-serif',
            fontSize: isMobile ? '11px' : '13px',
            fontWeight: 600,
            color: activeTab === 'requests' ? '#388896' : '#979797',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {t.community.connectionRequests} ({pendingRequests.length + sentRequests.length})
        </button>
      </div>

      {/* Connections List */}
      {activeTab === 'connections' && (
        <>
          {connections.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '24px 16px',
              }}
            >
              <div
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: isMobile ? '13px' : '14px',
                  fontWeight: 600,
                  color: '#192126',
                  marginBottom: '6px',
                }}
              >
                {t.community.noConnectionsYet}
              </div>
              <div
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: isMobile ? '11px' : '12px',
                  color: '#979797',
                }}
              >
                {t.community.noConnectionsDescription}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {connections.map((connection) => (
                <div
                  key={connection.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: isMobile ? '6px 8px' : '8px 10px',
                    borderRadius: '10px',
                    background: '#f8f9fa',
                    flexWrap: isMobile ? 'wrap' : 'nowrap',
                    gap: isMobile ? '6px' : '0',
                    minWidth: 0,
                    overflow: 'hidden',
                  }}
                >
                  {/* Profile Picture + User Info: clickable to open profile */}
                  <div
                    role={onNavigate ? 'button' : undefined}
                    onClick={() => onNavigate?.('user-profile', { userId: connection.user_id, previousPage: 'profile' })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flex: 1,
                      minWidth: 0,
                      overflow: 'hidden',
                      cursor: onNavigate ? 'pointer' : 'default',
                    }}
                  >
                    <div
                      style={{
                        width: isMobile ? '32px' : '40px',
                        height: isMobile ? '32px' : '40px',
                        borderRadius: '50%',
                        background: '#e0e0e0',
                        marginRight: isMobile ? '6px' : '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: isMobile ? '12px' : '14px',
                        fontWeight: 600,
                        color: '#979797',
                        flexShrink: 0,
                        overflow: 'hidden',
                      }}
                    >
                      {profilePictureUrls[connection.user_id] ? (
                        <img
                          src={profilePictureUrls[connection.user_id]}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        [(connection.first_name || connection.name || '?')[0].toUpperCase()]
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                      <div
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: isMobile ? '12px' : '13px',
                          fontWeight: 600,
                          color: '#192126',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {[connection.first_name, connection.name].filter(Boolean).join(' ') || t.common.user}
                      </div>
                      <div
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: isMobile ? '10px' : '11px',
                          color: '#979797',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {connection.user_type}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmModal({
                        type: 'remove',
                        connectionId: connection.id,
                        fullName: [connection.first_name, connection.name].filter(Boolean).join(' ') || t.common.user,
                      });
                    }}
                    disabled={actionLoading[connection.id]}
                    style={{
                      padding: isMobile ? '4px 8px' : '6px 12px',
                      background: 'transparent',
                      border: '1px solid #e0e0e0',
                      borderRadius: '16px',
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: isMobile ? '10px' : '11px',
                      fontWeight: 600,
                      color: '#dc2626',
                      cursor: actionLoading[connection.id] ? 'not-allowed' : 'pointer',
                      opacity: actionLoading[connection.id] ? 0.6 : 1,
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t.community.removeConnection}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Pending Requests: Received + Sent */}
      {activeTab === 'requests' && (
        <>
          {pendingRequests.length === 0 && sentRequests.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '24px 16px',
                fontFamily: 'Roboto, sans-serif',
                fontSize: isMobile ? '11px' : '12px',
                color: '#979797',
              }}
            >
              {t.community.noPendingConnectionRequests}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Received requests */}
              {pendingRequests.length > 0 && (
                <div>
                  <div
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: isMobile ? '11px' : '12px',
                      fontWeight: 600,
                      color: '#979797',
                      marginBottom: '8px',
                    }}
                  >
                    {t.community.receivedRequests}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pendingRequests.map((request) => (
                      <div
                        key={request.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: isMobile ? '6px 8px' : '8px 10px',
                          borderRadius: '10px',
                          background: '#f8f9fa',
                          flexWrap: isMobile ? 'wrap' : 'nowrap',
                          gap: isMobile ? '6px' : '0',
                          minWidth: 0,
                          overflow: 'hidden',
                        }}
                      >
                        {/* Profile Picture */}
                        <div
                          style={{
                            width: isMobile ? '32px' : '40px',
                            height: isMobile ? '32px' : '40px',
                            borderRadius: '50%',
                            background: '#e0e0e0',
                            marginRight: isMobile ? '6px' : '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: isMobile ? '12px' : '14px',
                            fontWeight: 600,
                            color: '#979797',
                            flexShrink: 0,
                            overflow: 'hidden',
                          }}
                        >
                          {profilePictureUrls[request.user_id] ? (
                            <img
                              src={profilePictureUrls[request.user_id]}
                              alt=""
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          ) : (
                            [(request.first_name || request.name || '?')[0].toUpperCase()]
                          )}
                        </div>

                        {/* User Info */}
                        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                          <div
                            style={{
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: isMobile ? '12px' : '13px',
                              fontWeight: 600,
                              color: '#192126',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {[request.first_name, request.name].filter(Boolean).join(' ') || t.common.user}
                          </div>
                          <div
                            style={{
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: isMobile ? '10px' : '11px',
                              color: '#979797',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {request.user_type}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: isMobile ? 'wrap' : 'nowrap', flexShrink: 0 }}>
                          <button
                            onClick={() => handleAccept(request.id)}
                            disabled={actionLoading[request.id]}
                            style={{
                              padding: isMobile ? '4px 8px' : '6px 12px',
                              background: '#388896',
                              border: 'none',
                              borderRadius: '16px',
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: isMobile ? '10px' : '11px',
                              fontWeight: 600,
                              color: '#ffffff',
                              cursor: actionLoading[request.id] ? 'not-allowed' : 'pointer',
                              opacity: actionLoading[request.id] ? 0.6 : 1,
                            }}
                          >
                            {t.community.acceptConnection}
                          </button>
                          <button
                            onClick={() => handleDecline(request.id)}
                            disabled={actionLoading[request.id]}
                            style={{
                              padding: isMobile ? '4px 8px' : '6px 12px',
                              background: 'transparent',
                              border: '1px solid #e0e0e0',
                              borderRadius: '16px',
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: isMobile ? '10px' : '11px',
                              fontWeight: 600,
                              color: '#979797',
                              cursor: actionLoading[request.id] ? 'not-allowed' : 'pointer',
                              opacity: actionLoading[request.id] ? 0.6 : 1,
                            }}
                          >
                            {t.community.declineConnection}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sent requests */}
              {sentRequests.length > 0 && (
                <div>
                  <div
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: isMobile ? '11px' : '12px',
                      fontWeight: 600,
                      color: '#979797',
                      marginBottom: '8px',
                    }}
                  >
                    {t.community.sentRequests}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {sentRequests.map((request) => (
                      <div
                        key={request.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: isMobile ? '6px 8px' : '8px 10px',
                          borderRadius: '10px',
                          background: '#f8f9fa',
                          flexWrap: isMobile ? 'wrap' : 'nowrap',
                          gap: isMobile ? '6px' : '0',
                          minWidth: 0,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: isMobile ? '32px' : '40px',
                            height: isMobile ? '32px' : '40px',
                            borderRadius: '50%',
                            background: '#e0e0e0',
                            marginRight: isMobile ? '6px' : '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: isMobile ? '12px' : '14px',
                            fontWeight: 600,
                            color: '#979797',
                            flexShrink: 0,
                            overflow: 'hidden',
                          }}
                        >
                          {profilePictureUrls[request.user_id] ? (
                            <img
                              src={profilePictureUrls[request.user_id]}
                              alt=""
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            [(request.first_name || request.name || '?')[0].toUpperCase()]
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                          <div
                            style={{
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: isMobile ? '12px' : '13px',
                              fontWeight: 600,
                              color: '#192126',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {[request.first_name, request.name].filter(Boolean).join(' ') || t.common.user}
                          </div>
                          <div
                            style={{
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: isMobile ? '10px' : '11px',
                              color: '#979797',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {request.user_type}
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setConfirmModal({
                              type: 'cancel',
                              connectionId: request.id,
                              fullName: [request.first_name, request.name].filter(Boolean).join(' ') || t.common.user,
                            })
                          }
                          disabled={actionLoading[request.id]}
                          style={{
                            padding: isMobile ? '4px 8px' : '6px 12px',
                            background: 'transparent',
                            border: '1px solid #e0e0e0',
                            borderRadius: '16px',
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: isMobile ? '10px' : '11px',
                            fontWeight: 600,
                            color: '#979797',
                            cursor: actionLoading[request.id] ? 'not-allowed' : 'pointer',
                            opacity: actionLoading[request.id] ? 0.6 : 1,
                            flexShrink: 0,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {t.community.cancelRequest}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Confirmation Modal */}
      {confirmModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px',
          }}
          onClick={() => setConfirmModal(null)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              maxWidth: '400px',
              width: '100%',
              padding: '32px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title */}
            <h3
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '20px',
                fontWeight: 600,
                color: '#192126',
                margin: 0,
                marginBottom: '24px',
                textAlign: 'center',
                lineHeight: 1.4,
              }}
            >
              {confirmModal.type === 'cancel'
                ? t.community.cancelRequestConfirmTitle
                : t.community.removeConnectionConfirmMessage.replace('{name}', confirmModal.fullName)}
            </h3>

            {/* Buttons */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {/* Yes button */}
              <button
                onClick={() => {
                  if (confirmModal.type === 'cancel') performDecline(confirmModal.connectionId);
                  else performRemove(confirmModal.connectionId);
                }}
                disabled={actionLoading[confirmModal.connectionId]}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  background: confirmModal.type === 'remove' ? '#dc2626' : '#388896',
                  border: 'none',
                  borderRadius: '12px',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#ffffff',
                  cursor: actionLoading[confirmModal.connectionId] ? 'not-allowed' : 'pointer',
                  opacity: actionLoading[confirmModal.connectionId] ? 0.7 : 1,
                  transition: 'all 0.2s ease',
                }}
              >
                {confirmModal.type === 'cancel' ? t.community.cancelRequestYes : t.community.removeConnectionYes}
              </button>

              {/* No button */}
              <button
                onClick={() => setConfirmModal(null)}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  background: '#f8f9fa',
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#192126',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {confirmModal.type === 'cancel' ? t.community.cancelRequestNo : t.community.removeConnectionNo}
              </button>

              {/* Discard button */}
              <button
                onClick={() => setConfirmModal(null)}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '12px',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#979797',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {t.profile.discard}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


