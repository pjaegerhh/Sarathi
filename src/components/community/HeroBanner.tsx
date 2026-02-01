import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import heartIcon from '../../assets/svg/heart-community.svg';
import peopleIcon from '../../assets/svg/people_community.svg';

interface HeroBannerProps {
  isMobile?: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ isMobile = false }) => {
  const { t } = useLanguage();

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: isMobile ? '20px' : '30px',
        width: '100%',
        minHeight: isMobile ? 'auto' : '280px',
        background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(180deg, rgba(105, 181, 124, 1) 0%, rgba(56, 136, 150, 1) 100%)',
        overflow: 'hidden',
        padding: isMobile ? '16px' : '25px 32px',
      }}
    >
      {/* Decorative background icons - Hidden on mobile */}
      {!isMobile && (
        <>
          {/* Top-right decorative heart */}
          <div
            style={{
              position: 'absolute',
              right: '32px',
              top: '25px',
              width: '80px',
              height: '80px',
              opacity: 0.2,
              zIndex: 0,
            }}
          >
            <img src={heartIcon} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>

          {/* Bottom-right decorative people icon */}
          <div
            style={{
              position: 'absolute',
              right: '32px',
              bottom: '25px',
              width: '128px',
              height: '128px',
              opacity: 0.1,
              zIndex: 0,
            }}
          >
            <img src={peopleIcon} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>
        </>
      )}

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: isMobile ? '10px' : '16px' }}>
        {/* Header with icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px', position: 'relative' }}>
            <MessageCircle size={isMobile ? 20 : 24} color="#ffffff" strokeWidth={2} />
          </div>
          <p
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: isMobile ? '16px' : '22px',
              lineHeight: isMobile ? '24px' : '32px',
              color: '#ffffff',
              margin: 0,
            }}
          >
            {t.community.communityStories}
          </p>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            fontSize: isMobile ? '16px' : '22px',
            lineHeight: isMobile ? '24px' : '32px',
            color: '#ffffff',
            margin: 0,
          }}
        >
          {t.community.everyJourneyInspires}
        </p>

        {/* Description - Hidden on mobile */}
        {!isMobile && (
          <p
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '22px',
              color: '#ffffff',
              margin: 0,
              maxWidth: '847px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {t.community.communityDescription}
          </p>
        )}

        {/* Stats Container */}
        <div style={{ display: 'flex', gap: isMobile ? '12px' : '24px', alignItems: 'flex-start', marginTop: isMobile ? '4px' : '8px', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
          {/* Active Members */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px', padding: isMobile ? '4px' : '6px' }}>
            <img src={peopleIcon} alt="Active Members" style={{ width: isMobile ? '28px' : '40px', height: isMobile ? '28px' : '40px' }} />
            <div>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 400,
                  fontSize: isMobile ? '11px' : '14px',
                  lineHeight: isMobile ? '16px' : '22px',
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                {t.community.activeMembers}
              </p>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 500,
                  fontSize: isMobile ? '14px' : '18px',
                  lineHeight: isMobile ? '20px' : '28px',
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                12,500+
              </p>
            </div>
          </div>

          {/* Stories Shared */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px', padding: isMobile ? '4px' : '6px' }}>
            <div style={{ width: isMobile ? '28px' : '40px', height: isMobile ? '28px' : '40px', position: 'relative' }}>
              <MessageCircle size={isMobile ? 28 : 40} color="#ffffff" strokeWidth={1.5} />
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 400,
                  fontSize: isMobile ? '11px' : '14px',
                  lineHeight: isMobile ? '16px' : '22px',
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                {t.community.storiesShared}
              </p>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 700,
                  fontSize: isMobile ? '14px' : '16px',
                  lineHeight: isMobile ? '20px' : '24px',
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                8,700+
              </p>
            </div>
          </div>

          {/* Support Given */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px', padding: isMobile ? '4px' : '6px' }}>
            <img src={heartIcon} alt="Support Given" style={{ width: isMobile ? '28px' : '40px', height: isMobile ? '28px' : '40px' }} />
            <div>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 400,
                  fontSize: isMobile ? '11px' : '14px',
                  lineHeight: isMobile ? '16px' : '22px',
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                {t.community.supportGiven}
              </p>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 700,
                  fontSize: isMobile ? '14px' : '16px',
                  lineHeight: isMobile ? '20px' : '24px',
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                45,000+
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
