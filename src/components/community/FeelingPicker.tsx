/**
 * Feeling Picker Component - Matches Figma "Feeling Container" design
 * Allows users to react to posts and comments with various emotions
 */

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { X, Search } from 'lucide-react';

export type ReactionType =
  | 'sad' | 'shocked' | 'angry' | 'crying' | 'excited' | 'loved' | 'wonderful'
  | 'relaxed' | 'good' | 'nervous' | 'in_disbelief' | 'amazing' | 'disappointed' 
  | 'wow' | 'happy' | 'annoyed';

interface FeelingOption {
  type: ReactionType;
  emoji: string;
}

// Feelings matching Figma design order (left column then right column)
const FEELING_OPTIONS: FeelingOption[] = [
  // Left column
  { type: 'sad', emoji: '😢' },
  { type: 'shocked', emoji: '😱' },
  { type: 'angry', emoji: '😠' },
  { type: 'crying', emoji: '😭' },
  { type: 'excited', emoji: '🤩' },
  { type: 'loved', emoji: '❤️' },
  { type: 'wonderful', emoji: '😊' },
  { type: 'relaxed', emoji: '😌' },
  { type: 'good', emoji: '😃' },
  { type: 'nervous', emoji: '😰' },
  // Right column
  { type: 'in_disbelief', emoji: '😲' },
  { type: 'amazing', emoji: '🤗' },
  { type: 'disappointed', emoji: '😞' },
  { type: 'wow', emoji: '😮' },
  { type: 'happy', emoji: '😄' },
  { type: 'annoyed', emoji: '😒' },
];

interface FeelingPickerProps {
  onSelect: (reaction: ReactionType) => void;
  currentReaction?: ReactionType | null;
  isOpen: boolean;
  onClose: () => void;
  mode?: 'modal' | 'quick'; // modal = full Figma design, quick = hover quick-select
  isMobile?: boolean;
}

export const FeelingPicker: React.FC<FeelingPickerProps> = ({
  onSelect,
  currentReaction,
  isOpen,
  onClose,
  mode = 'modal',
  isMobile = false
}) => {
  const { t, language } = useLanguage();
  const [hoveredFeeling, setHoveredFeeling] = useState<ReactionType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Get label for a feeling
  const getLabel = (type: ReactionType): string => {
    return t.community[`reaction${type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}`] || type;
  };

  const filteredFeelings = FEELING_OPTIONS.filter(f =>
    getLabel(f.type).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const leftColumn = filteredFeelings.slice(0, Math.ceil(filteredFeelings.length / 2));
  const rightColumn = filteredFeelings.slice(Math.ceil(filteredFeelings.length / 2));

  // Quick select mode (hover quick-select)
  if (mode === 'quick') {
    // On mobile, show a smaller subset of feelings in quick mode
    const quickFeelings = isMobile ? FEELING_OPTIONS.slice(0, 8) : FEELING_OPTIONS;
    
    return (
      <>
        <div
          ref={pickerRef}
          onMouseEnter={() => {}} // Keep picker open when hovering over it
          style={{
            position: 'absolute',
            bottom: 'calc(100% - 52px)', // Reduced gap - closer to button (was 100% + 10px)
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#ffffff',
            borderRadius: isMobile ? '20px' : '30px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            padding: isMobile ? '6px 8px' : '8px 12px',
            display: 'flex',
            gap: isMobile ? '4px' : '8px',
            alignItems: 'center',
            zIndex: 1000,
            animation: 'slideUp 0.2s ease-out forwards',
            whiteSpace: 'nowrap',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            maxWidth: isMobile ? '280px' : 'none',
            justifyContent: isMobile ? 'center' : 'flex-start',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {hoveredFeeling && !isMobile && (
            <div
              style={{
                position: 'absolute',
                bottom: 'calc(100% + 8px)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#333',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                opacity: 0.9,
                pointerEvents: 'none',
              }}
            >
              {getLabel(hoveredFeeling)}
            </div>
          )}
          {quickFeelings.map((feeling) => (
            <button
              key={feeling.type}
              onClick={() => {
                onSelect(feeling.type);
                onClose();
              }}
              onMouseEnter={() => !isMobile && setHoveredFeeling(feeling.type)}
              onMouseLeave={() => setHoveredFeeling(null)}
              style={{
                background: 'none',
                border: currentReaction === feeling.type ? '2px solid #388896' : 'none',
                borderRadius: '50%',
                width: isMobile ? '32px' : '40px',
                height: isMobile ? '32px' : '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.1s ease-out, border-color 0.1s ease-out',
                transform: !isMobile && hoveredFeeling === feeling.type ? 'scale(1.2)' : 'scale(1)',
                flexShrink: 0,
                fontSize: isMobile ? '18px' : '24px',
              }}
            >
              {feeling.emoji}
            </button>
          ))}
          <style>{`
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translate(-50%, 20px);
              }
              to {
                opacity: 1;
                transform: translate(-50%, 0);
              }
            }
          `}</style>
        </div>
      </>
    );
  }

  // Full modal mode (matching Figma design exactly)
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
        padding: isMobile ? '16px' : '0',
      }}
      onClick={onClose}
    >
      <div
        ref={pickerRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: isMobile ? '20px' : '15px',
          width: isMobile ? '100%' : '448px',
          maxWidth: isMobile ? '350px' : '448px',
          maxHeight: isMobile ? '80vh' : '600px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Heading */}
        <div
          style={{
            borderBottom: '0.8px solid #e5e7eb',
            padding: isMobile ? '12px' : '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <p
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: isMobile ? '18px' : '22px',
              fontWeight: 400,
              lineHeight: isMobile ? '26px' : '32px',
              color: '#192126',
              margin: 0,
            }}
          >
            {t.community.howAreYouFeeling || 'How are you feeling?'}
          </p>
          <button
            onClick={onClose}
            style={{
              background: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              width: isMobile ? '36px' : '48px',
              height: isMobile ? '36px' : '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0px 0px 10px 0px #ddd',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.background = '#388896';
                e.currentTarget.style.boxShadow = '0px 0px 15px rgba(56, 136, 150, 0.5)';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) {
                  icon.setAttribute('stroke', '#ffffff');
                  icon.setAttribute('color', '#ffffff');
                }
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.boxShadow = '0px 0px 10px 0px #ddd';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) {
                  icon.setAttribute('stroke', '#505050');
                  icon.setAttribute('color', '#505050');
                }
              }
            }}
          >
            <X size={isMobile ? 20 : 24} color="#505050" />
          </button>
        </div>

        {/* Search */}
        <div style={{ borderBottom: '0.8px solid #e5e7eb', padding: isMobile ? '8px 12px' : '10px 16px' }}>
          <div
            style={{
              background: '#ffffff',
              border: '0.5px solid #c7c8d5',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              padding: isMobile ? '10px 12px' : '14px 16px',
              gap: isMobile ? '8px' : '12px',
              boxShadow: '0px 1px 2px 0px rgba(228, 229, 231, 0.24)',
            }}
          >
            <Search size={isMobile ? 20 : 24} color="#c7c8d5" />
            <input
              type="text"
              placeholder={t.community.searchFeelings || 'Search feelings'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: 400,
                lineHeight: '22px',
                color: '#192126',
                border: 'none',
                outline: 'none',
                flex: 1,
                background: 'transparent',
              }}
            />
          </div>
        </div>

        {/* Feelings Grid */}
        <div style={{ padding: isMobile ? '12px' : '16px', overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'flex', gap: isMobile ? '8px' : '83px', flexDirection: isMobile ? 'column' : 'row' }}>
            {/* On mobile, show all feelings in a single column */}
            {isMobile ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {filteredFeelings.map((feeling) => (
                  <button
                    key={feeling.type}
                    onClick={() => {
                      onSelect(feeling.type);
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '6px',
                      borderRadius: '8px',
                      transition: 'background 0.2s',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                      }}
                    >
                      {feeling.emoji}
                    </div>
                    <p
                      style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '13px',
                        fontWeight: 400,
                        lineHeight: '20px',
                        color: '#192126',
                        margin: 0,
                        textAlign: 'left',
                      }}
                    >
                      {getLabel(feeling.type)}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <>
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                  {leftColumn.map((feeling) => (
                    <button
                      key={feeling.type}
                      onClick={() => {
                        onSelect(feeling.type);
                        onClose();
                      }}
                      onMouseEnter={() => setHoveredFeeling(feeling.type)}
                      onMouseLeave={() => setHoveredFeeling(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        background: hoveredFeeling === feeling.type ? '#f9f9f9' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '8px',
                        transition: 'background 0.2s',
                      }}
                    >
                      <div
                        style={{
                          width: '45px',
                          height: '44px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px',
                        }}
                      >
                        {feeling.emoji}
                      </div>
                      <p
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '22px',
                          color: '#192126',
                          margin: 0,
                          textAlign: 'left',
                        }}
                      >
                        {getLabel(feeling.type)}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                  {rightColumn.map((feeling) => (
                    <button
                      key={feeling.type}
                      onClick={() => {
                        onSelect(feeling.type);
                        onClose();
                      }}
                      onMouseEnter={() => setHoveredFeeling(feeling.type)}
                      onMouseLeave={() => setHoveredFeeling(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        background: hoveredFeeling === feeling.type ? '#f9f9f9' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '8px',
                        transition: 'background 0.2s',
                      }}
                    >
                      <div
                        style={{
                          width: '45px',
                          height: '44px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px',
                        }}
                      >
                        {feeling.emoji}
                      </div>
                      <p
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '22px',
                          color: '#192126',
                          margin: 0,
                          textAlign: 'left',
                        }}
                      >
                        {getLabel(feeling.type)}
                      </p>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* CTA (Cancel button) */}
        <div
          style={{
            borderTop: '0.8px solid #e5e7eb',
            padding: isMobile ? '12px' : '16.8px 16px 16px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: '#ffffff',
              border: 'none',
              borderRadius: '24px',
              padding: isMobile ? '8px 16px' : '8px 24px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: isMobile ? '13px' : '14px',
              fontWeight: 500,
              color: '#388896',
              cursor: 'pointer',
              boxShadow: '0px 0px 10px 0px #ddd',
              height: isMobile ? '32px' : '36px',
            }}
          >
            {t.community.cancel || 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to get emoji for a reaction type
export const getReactionEmoji = (type: ReactionType): string => {
  const option = FEELING_OPTIONS.find(o => o.type === type);
  return option?.emoji || '😊';
};

// Helper function to get label for a reaction type
export const getReactionLabel = (type: ReactionType, t: any): string => {
  return t.community[`reaction${type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}`] || type;
};
