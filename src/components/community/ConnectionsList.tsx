import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

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

export function ConnectionsList() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState<'connections' | 'requests'>('connections');

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

      // Transform data
      const acceptedConnections: Connection[] = (acceptedData || []).map((conn: any) => {
        const otherUser = conn.requester.uuid === user.id ? conn.addressee : conn.requester;
        return {
          id: conn.id,
          user_id: otherUser.uuid,
          name: otherUser.name,
          first_name: otherUser.first_name,
          email: otherUser.email,
          user_type: otherUser.user_type,
          profile_picture_url: otherUser.profile_picture_url,
          status: conn.status,
          created_at: conn.created_at,
        };
      });

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

      const pending: Connection[] = (pendingData || []).map((conn: any) => ({
        id: conn.id,
        user_id: conn.requester.uuid,
        name: conn.requester.name,
        first_name: conn.requester.first_name,
        email: conn.requester.email,
        user_type: conn.requester.user_type,
        profile_picture_url: conn.requester.profile_picture_url,
        status: conn.status,
        created_at: conn.created_at,
      }));

      setPendingRequests(pending);
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

  const handleRemove = async (connectionId: string) => {
    if (!confirm(t.community.removeConnection + '?')) return;

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
      console.error('Error removing connection:', error);
      alert(t.common.error);
    } finally {
      setActionLoading({ ...actionLoading, [connectionId]: false });
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
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <button
          onClick={() => setActiveTab('connections')}
          style={{
            padding: '12px 24px',
            background: 'transparent',
            border: 'none',
            borderBottom:
              activeTab === 'connections' ? '2px solid #388896' : '2px solid transparent',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: activeTab === 'connections' ? '#388896' : '#979797',
            cursor: 'pointer',
          }}
        >
          {t.community.myConnections} ({connections.length})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          style={{
            padding: '12px 24px',
            background: 'transparent',
            border: 'none',
            borderBottom:
              activeTab === 'requests' ? '2px solid #388896' : '2px solid transparent',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: activeTab === 'requests' ? '#388896' : '#979797',
            cursor: 'pointer',
          }}
        >
          {t.community.connectionRequests} ({pendingRequests.length})
        </button>
      </div>

      {/* Connections List */}
      {activeTab === 'connections' && (
        <>
          {connections.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
              }}
            >
              <div
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#192126',
                  marginBottom: '8px',
                }}
              >
                {t.community.noConnectionsYet}
              </div>
              <div
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  color: '#979797',
                }}
              >
                {t.community.noConnectionsDescription}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {connections.map((connection) => (
                <div
                  key={connection.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    borderRadius: '12px',
                    background: '#f8f9fa',
                  }}
                >
                  {/* Profile Picture */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: '#e0e0e0',
                      marginRight: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#979797',
                    }}
                  >
                    {(connection.first_name || connection.name || '?')[0].toUpperCase()}
                  </div>

                  {/* User Info */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#192126',
                      }}
                    >
                      {connection.name || connection.first_name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '14px',
                        color: '#979797',
                      }}
                    >
                      {connection.user_type}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(connection.id)}
                    disabled={actionLoading[connection.id]}
                    style={{
                      padding: '8px 20px',
                      background: 'transparent',
                      border: '1px solid #e0e0e0',
                      borderRadius: '20px',
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#dc2626',
                      cursor: actionLoading[connection.id] ? 'not-allowed' : 'pointer',
                      opacity: actionLoading[connection.id] ? 0.6 : 1,
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

      {/* Pending Requests */}
      {activeTab === 'requests' && (
        <>
          {pendingRequests.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px',
                color: '#979797',
              }}
            >
              No pending connection requests
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pendingRequests.map((request) => (
                <div
                  key={request.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    borderRadius: '12px',
                    background: '#f8f9fa',
                  }}
                >
                  {/* Profile Picture */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: '#e0e0e0',
                      marginRight: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#979797',
                    }}
                  >
                    {(request.first_name || request.name || '?')[0].toUpperCase()}
                  </div>

                  {/* User Info */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#192126',
                      }}
                    >
                      {request.name || request.first_name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '14px',
                        color: '#979797',
                      }}
                    >
                      {request.user_type}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleAccept(request.id)}
                      disabled={actionLoading[request.id]}
                      style={{
                        padding: '8px 20px',
                        background: '#388896',
                        border: 'none',
                        borderRadius: '20px',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '14px',
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
                        padding: '8px 20px',
                        background: 'transparent',
                        border: '1px solid #e0e0e0',
                        borderRadius: '20px',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '14px',
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
          )}
        </>
      )}
    </div>
  );
}


