import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

interface ViewStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: {
    id: string;
    story_text: string | null;
    media_urls: string[] | null;
    created_at: string;
    updated_at: string;
  };
}

export function ViewStoryModal({ isOpen, onClose, story }: ViewStoryModalProps) {
  const { t } = useLanguage();
  const [mediaUrls, setMediaUrls] = useState<{ [key: string]: string }>({});

  // Load signed URLs for all media when modal opens
  useEffect(() => {
    if (isOpen && story.media_urls) {
      loadMediaUrls();
    }
  }, [isOpen, story.media_urls]);

  const loadMediaUrls = async () => {
    if (!story.media_urls) return;

    const urls: { [key: string]: string } = {};
    
    for (const path of story.media_urls) {
      const { data, error } = await supabase.storage
        .from('profile-media')
        .createSignedUrl(path, 3600); // Valid for 1 hour

      if (data?.signedUrl) {
        urls[path] = data.signedUrl;
      } else if (error) {
        console.error('Error loading media URL:', error);
      }
    }

    setMediaUrls(urls);
  };

  if (!isOpen) return null;

  return (
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
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '30px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 32px',
            borderBottom: '1px solid #f2f2f7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '24px',
              fontWeight: 500,
              color: '#192126',
              margin: 0,
            }}
          >
            {t.profile.myStoryTitle}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#192126" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {/* Media Gallery */}
          {story.media_urls && story.media_urls.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: story.media_urls.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                marginBottom: '32px',
              }}
            >
              {story.media_urls.map((mediaUrl, index) => {
                const signedUrl = mediaUrls[mediaUrl];
                const isVideo = mediaUrl.match(/\.(mp4|webm|ogg)$/i);

                if (!signedUrl) return null; // Still loading

                return (
                  <div
                    key={index}
                    style={{
                      borderRadius: '20px',
                      overflow: 'hidden',
                      background: '#000000',
                      aspectRatio: story.media_urls.length === 1 ? undefined : '1/1',
                      minHeight: story.media_urls.length === 1 ? '400px' : undefined,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isVideo ? (
                      <video
                        src={signedUrl}
                        controls
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: story.media_urls.length === 1 ? 'contain' : 'cover',
                        }}
                      />
                    ) : (
                      <img
                        src={signedUrl}
                        alt={`Story media ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: story.media_urls.length === 1 ? 'contain' : 'cover',
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Story Text */}
          {story.story_text && (
            <div
              style={{
                background: '#f8f9fa',
                borderRadius: '20px',
                padding: '24px',
              }}
            >
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '28px',
                  color: '#192126',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  textAlign: 'justify',
                }}
              >
                {story.story_text}
              </p>
            </div>
          )}

          {/* No Content Message */}
          {!story.story_text && (!story.media_urls || story.media_urls.length === 0) && (
            <div
              style={{
                padding: '60px 20px',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '16px',
                  color: '#979797',
                  margin: 0,
                }}
              >
                {t.profile.noStoryDescription}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '24px 32px',
            borderTop: '1px solid #f2f2f7',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: '#388896',
              color: '#ffffff',
              border: 'none',
              borderRadius: '24px',
              padding: '12px 32px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
}
