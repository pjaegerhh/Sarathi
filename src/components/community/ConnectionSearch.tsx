import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface User {
  uuid: string;
  name: string;
  first_name: string;
  email: string;
  user_type: string;
  profile_picture_url: string | null;
}

interface ConnectionStatus {
  status: 'none' | 'pending_sent' | 'pending_received' | 'connected';
  connectionId?: string;
}

export function ConnectionSearch() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [connectionStatuses, setConnectionStatuses] = useState<{ [key: string]: ConnectionStatus }>({});
  const [isSearching, setIsSearching] = useState(false);
  const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      searchUsers();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const searchUsers = async () => {
    if (!user) return;

    setIsSearching(true);

    try {
      const { data, error } = await supabase
        .from('sarathi_user')
        .select('uuid, name, first_name, email, user_type, profile_picture_url')
        .or(`name.ilike.%${searchQuery}%,first_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`)
        .neq('uuid', user.id)
        .limit(20);

      if (error) throw error;

      setSearchResults(data || []);
      
      // Check connection status for each user
      if (data) {
        const statuses: { [key: string]: ConnectionStatus } = {};
        
        for (const searchUser of data) {
          const status = await getConnectionStatus(searchUser.uuid);
          statuses[searchUser.uuid] = status;
        }
        
        setConnectionStatuses(statuses);
      }
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const getConnectionStatus = async (targetUserId: string): Promise<ConnectionStatus> => {
    if (!user) return { status: 'none' };

    try {
      const { data, error } = await supabase
        .from('connections')
        .select('id, status, requester_id, addressee_id')
        .or(`and(requester_id.eq.${user.id},addressee_id.eq.${targetUserId}),and(requester_id.eq.${targetUserId},addressee_id.eq.${user.id})`)
        .single();

      if (error || !data) {
        return { status: 'none' };
      }

      if (data.status === 'accepted') {
        return { status: 'connected', connectionId: data.id };
      }

      if (data.requester_id === user.id) {
        return { status: 'pending_sent', connectionId: data.id };
      }

      return { status: 'pending_received', connectionId: data.id };
    } catch (error) {
      return { status: 'none' };
    }
  };

  const handleSendRequest = async (targetUserId: string) => {
    if (!user) return;

    setActionLoading({ ...actionLoading, [targetUserId]: true });

    try {
      const { error } = await supabase
        .from('connections')
        .insert({
          requester_id: user.id,
          addressee_id: targetUserId,
          status: 'pending',
        });

      if (error) throw error;

      setConnectionStatuses({
        ...connectionStatuses,
        [targetUserId]: { status: 'pending_sent' },
      });
    } catch (error) {
      console.error('Error sending connection request:', error);
      alert(t.community.failedToSendRequest);
    } finally {
      setActionLoading({ ...actionLoading, [targetUserId]: false });
    }
  };

  const handleAcceptRequest = async (targetUserId: string, connectionId: string) => {
    setActionLoading({ ...actionLoading, [targetUserId]: true });

    try {
      const { error } = await supabase
        .from('connections')
        .update({ status: 'accepted' })
        .eq('id', connectionId);

      if (error) throw error;

      setConnectionStatuses({
        ...connectionStatuses,
        [targetUserId]: { status: 'connected', connectionId },
      });
    } catch (error) {
      console.error('Error accepting connection request:', error);
      alert(t.common.error);
    } finally {
      setActionLoading({ ...actionLoading, [targetUserId]: false });
    }
  };

  const handleDeclineRequest = async (targetUserId: string, connectionId: string) => {
    setActionLoading({ ...actionLoading, [targetUserId]: true });

    try {
      const { error } = await supabase
        .from('connections')
        .delete()
        .eq('id', connectionId);

      if (error) throw error;

      setConnectionStatuses({
        ...connectionStatuses,
        [targetUserId]: { status: 'none' },
      });
    } catch (error) {
      console.error('Error declining connection request:', error);
      alert(t.common.error);
    } finally {
      setActionLoading({ ...actionLoading, [targetUserId]: false });
    }
  };

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: isMobile ? '12px' : '24px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
      }}
    >
      <h2
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: isMobile ? '18px' : '20px',
          fontWeight: 600,
          color: '#192126',
          marginBottom: isMobile ? '12px' : '16px',
        }}
      >
        {t.community.findConnections}
      </h2>

      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t.community.searchUsers}
        style={{
          width: '100%',
          padding: isMobile ? '10px 12px' : '12px 16px',
          fontFamily: 'Roboto, sans-serif',
          fontSize: isMobile ? '14px' : '16px',
          color: '#192126',
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          outline: 'none',
          marginBottom: isMobile ? '12px' : '16px',
          boxSizing: 'border-box',
        }}
      />

      {/* Search Results */}
      {isSearching && (
        <div
          style={{
            textAlign: 'center',
            padding: '24px',
            color: '#979797',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          {t.common.loading}
        </div>
      )}

      {!isSearching && searchResults.length === 0 && searchQuery.trim().length >= 2 && (
        <div
          style={{
            textAlign: 'center',
            padding: '24px',
            color: '#979797',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          No users found
        </div>
      )}

      {!isSearching && searchResults.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {searchResults.map((searchUser) => {
            const connectionStatus = connectionStatuses[searchUser.uuid];
            const isLoading = actionLoading[searchUser.uuid];

            return (
              <div
                key={searchUser.uuid}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: isMobile ? '8px' : '12px',
                  borderRadius: '12px',
                  background: '#f8f9fa',
                  flexWrap: isMobile ? 'wrap' : 'nowrap',
                  gap: isMobile ? '8px' : '0',
                }}
              >
                {/* Profile Picture */}
                <div
                  style={{
                    width: isMobile ? '40px' : '48px',
                    height: isMobile ? '40px' : '48px',
                    borderRadius: '50%',
                    background: '#e0e0e0',
                    marginRight: isMobile ? '8px' : '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isMobile ? '16px' : '20px',
                    fontWeight: 600,
                    color: '#979797',
                    flexShrink: 0,
                  }}
                >
                  {(searchUser.first_name || searchUser.name || '?')[0].toUpperCase()}
                </div>

                {/* User Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: isMobile ? '14px' : '16px',
                      fontWeight: 600,
                      color: '#192126',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {searchUser.name || searchUser.first_name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: isMobile ? '12px' : '14px',
                      color: '#979797',
                    }}
                  >
                    {searchUser.user_type}
                  </div>
                </div>

                {/* Action Button */}
                {connectionStatus?.status === 'none' && (
                  <button
                    onClick={() => handleSendRequest(searchUser.uuid)}
                    disabled={isLoading}
                    style={{
                      padding: isMobile ? '6px 12px' : '8px 20px',
                      background: '#388896',
                      border: 'none',
                      borderRadius: '20px',
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: isMobile ? '12px' : '14px',
                      fontWeight: 600,
                      color: '#ffffff',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      opacity: isLoading ? 0.6 : 1,
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isLoading ? t.common.loading : t.community.connectWith}
                  </button>
                )}

                {connectionStatus?.status === 'pending_sent' && (
                  <span
                    style={{
                      padding: isMobile ? '6px 12px' : '8px 20px',
                      background: '#e0e0e0',
                      borderRadius: '20px',
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: isMobile ? '12px' : '14px',
                      color: '#979797',
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t.community.requestPending}
                  </span>
                )}

                {connectionStatus?.status === 'pending_received' && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: isMobile ? 'wrap' : 'nowrap', width: isMobile ? '100%' : 'auto', marginTop: isMobile ? '4px' : '0' }}>
                    <button
                      onClick={() =>
                        handleAcceptRequest(searchUser.uuid, connectionStatus.connectionId!)
                      }
                      disabled={isLoading}
                      style={{
                        padding: isMobile ? '6px 12px' : '8px 20px',
                        background: '#388896',
                        border: 'none',
                        borderRadius: '20px',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: isMobile ? '12px' : '14px',
                        fontWeight: 600,
                        color: '#ffffff',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.6 : 1,
                        flex: isMobile ? 1 : 'none',
                      }}
                    >
                      {t.community.acceptConnection}
                    </button>
                    <button
                      onClick={() =>
                        handleDeclineRequest(searchUser.uuid, connectionStatus.connectionId!)
                      }
                      disabled={isLoading}
                      style={{
                        padding: isMobile ? '6px 12px' : '8px 20px',
                        background: 'transparent',
                        border: '1px solid #e0e0e0',
                        borderRadius: '20px',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: isMobile ? '12px' : '14px',
                        fontWeight: 600,
                        color: '#979797',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.6 : 1,
                        flex: isMobile ? 1 : 'none',
                      }}
                    >
                      {t.community.declineConnection}
                    </button>
                  </div>
                )}

                {connectionStatus?.status === 'connected' && (
                  <span
                    style={{
                      padding: isMobile ? '6px 12px' : '8px 20px',
                      background: '#d1fae5',
                      borderRadius: '20px',
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: isMobile ? '12px' : '14px',
                      color: '#059669',
                      fontWeight: 600,
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t.community.connected}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


