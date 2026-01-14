import { Bell, Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface CommunityHeaderProps {
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  hasNotifications?: boolean;
}

export function CommunityHeader({ 
  onSearch, 
  onNotificationClick,
  hasNotifications = false 
}: CommunityHeaderProps) {
  const { t } = useLanguage();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div
      style={{
        background: '#ffffff',
        border: '0.8px solid #e0ebe3',
        borderRadius: '30px',
        padding: '16.8px',
        marginBottom: '20px',
      }}
    >
      {/* Header Row */}
      <div style={{ marginBottom: '4px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '4px',
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '22px',
              fontWeight: 400,
              lineHeight: '32px',
              color: '#192126',
              margin: 0,
            }}
          >
            {t.nav.community}
          </h1>

          {/* Notification Bell */}
          <button
            onClick={onNotificationClick}
            style={{
              position: 'relative',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Bell 
              size={24} 
              style={{ 
                color: '#388896',
                strokeWidth: 2,
              }} 
            />
            {hasNotifications && (
              <div
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '8px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#f25a3c',
                }}
              />
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div
          style={{
            background: '#ffffff',
            border: '0.5px solid #c7c8d5',
            borderRadius: '10px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            height: '52px',
            boxShadow: '0px 1px 2px 0px rgba(228, 229, 231, 0.24)',
            overflow: 'hidden',
          }}
        >
          <Search 
            size={24} 
            style={{ 
              color: '#c7c8d5',
              flexShrink: 0,
            }} 
          />
          <input
            type="text"
            placeholder={t.community.searchPlaceholder || 'Search stories, discussions, topics....'}
            onChange={handleSearchChange}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '22px',
              color: '#192126',
              background: 'transparent',
            }}
            // Placeholder styling
            className="search-input"
          />
        </div>
      </div>

      <style>{`
        .search-input::placeholder {
          color: #979797;
        }
      `}</style>
    </div>
  );
}
