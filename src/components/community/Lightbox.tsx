/**
 * Lightbox Component
 * Full-screen image/video viewer with navigation
 */

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  mediaUrls: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  mediaUrls,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const currentUrl = mediaUrls[currentIndex];
  const isVideo = currentUrl?.includes('.mp4') || currentUrl?.includes('.webm') || currentUrl?.includes('.mov');

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < mediaUrls.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, mediaUrls.length, onClose, onNavigate]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < mediaUrls.length - 1) {
      onNavigate(currentIndex + 1);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10001,
          transition: 'transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.background = '#388896';
          e.currentTarget.style.boxShadow = '0px 0px 15px rgba(56, 136, 150, 0.5)';
          const icon = e.currentTarget.querySelector('svg');
          if (icon) {
            icon.setAttribute('stroke', '#ffffff');
            icon.setAttribute('color', '#ffffff');
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
          e.currentTarget.style.boxShadow = 'none';
          const icon = e.currentTarget.querySelector('svg');
          if (icon) {
            icon.setAttribute('stroke', '#192126');
            icon.setAttribute('color', '#192126');
          }
        }}
      >
        <X size={24} color="#192126" />
      </button>

      {/* Counter */}
      {mediaUrls.length > 1 && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            color: '#192126',
            zIndex: 10001,
          }}
        >
          {currentIndex + 1} / {mediaUrls.length}
        </div>
      )}

      {/* Previous Button */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10001,
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
          }}
        >
          <ChevronLeft size={32} color="#192126" />
        </button>
      )}

      {/* Next Button */}
      {currentIndex < mediaUrls.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10001,
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
          }}
        >
          <ChevronRight size={32} color="#192126" />
        </button>
      )}

      {/* Media Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isVideo ? (
          <video
            src={currentUrl}
            controls
            autoPlay
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
              borderRadius: '8px',
            }}
          />
        ) : (
          <img
            src={currentUrl}
            alt={`Media ${currentIndex + 1}`}
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
        )}
      </div>

      {/* Thumbnail Navigation (for multiple images) */}
      {mediaUrls.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '12px',
            borderRadius: '12px',
            maxWidth: '90vw',
            overflowX: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {mediaUrls.map((url, index) => {
            const thumbIsVideo = url.includes('.mp4') || url.includes('.webm') || url.includes('.mov');
            return (
              <button
                key={index}
                onClick={() => onNavigate(index)}
                style={{
                  width: '60px',
                  height: '60px',
                  border: index === currentIndex ? '3px solid #388896' : '2px solid transparent',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  padding: 0,
                  background: 'none',
                  opacity: index === currentIndex ? 1 : 0.6,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (index !== currentIndex) {
                    e.currentTarget.style.opacity = '0.8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentIndex) {
                    e.currentTarget.style.opacity = '0.6';
                  }
                }}
              >
                {thumbIsVideo ? (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                    }}
                  >
                    ▶
                  </div>
                ) : (
                  <img
                    src={url}
                    alt={`Thumbnail ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
