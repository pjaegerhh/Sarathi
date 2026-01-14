import React from 'react';
import { MessageCircle, Users, Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

// Image assets from Figma (valid for 7 days)
const imgVector = "https://www.figma.com/api/mcp/asset/4474db40-14a4-4046-892c-8d07502caa08";
const imgVector1 = "https://www.figma.com/api/mcp/asset/692ff669-082f-4aed-b0c7-1bbc7ba55697";
const imgVector2 = "https://www.figma.com/api/mcp/asset/160d4a44-90f3-48e9-ab9c-b25ff8199aea";
const imgVector3 = "https://www.figma.com/api/mcp/asset/bd44b90d-5c7a-4f5b-b763-3182c60d4d0e";
const imgVector4 = "https://www.figma.com/api/mcp/asset/0942baef-ce2f-4af7-99b5-eb2ab48af30f";
const img = "https://www.figma.com/api/mcp/asset/4940a694-4818-40be-81f9-a959ca840a9a";
const img1 = "https://www.figma.com/api/mcp/asset/d1a6e6a8-79c7-4d0a-bd83-8370cad921bd";
const img2 = "https://www.figma.com/api/mcp/asset/9f545991-6632-4a53-8338-44e9ad4dd14c";
const img3 = "https://www.figma.com/api/mcp/asset/73e36e18-d6de-4d83-bdd8-8cbbeb07942a";

export const HeroBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '30px',
        width: '100%',
        minHeight: '280px',
        background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(180deg, rgba(105, 181, 124, 1) 0%, rgba(56, 136, 150, 1) 100%)',
        overflow: 'hidden',
        padding: '25px 32px',
      }}
    >
      {/* Decorative background icons */}
      <div
        style={{
          position: 'absolute',
          left: '918px',
          top: '25.4px',
          width: '80px',
          height: '80px',
          opacity: 0.2,
        }}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '16.6% 8.33% 12.5% 8.33%' }}>
            <div style={{ position: 'absolute', inset: '-5.88% -5%' }}>
              <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={imgVector} />
            </div>
          </div>
        </div>
      </div>
      
      <div
        style={{
          position: 'absolute',
          left: '805px',
          top: '161.4px',
          width: '128px',
          height: '128px',
          opacity: 0.1,
        }}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '62.5% 33.33% 12.5% 8.33%' }}>
            <div style={{ position: 'absolute', inset: '-16.67% -7.14%' }}>
              <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={imgVector1} />
            </div>
          </div>
          <div style={{ position: 'absolute', inset: '13.03% 20.85% 54.7% 66.67%' }}>
            <div style={{ position: 'absolute', inset: '-12.92% -33.38%' }}>
              <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={imgVector2} />
            </div>
          </div>
          <div style={{ position: 'absolute', inset: '63.04% 8.33% 12.5% 79.17%' }}>
            <div style={{ position: 'absolute', inset: '-17.04% -33.33% -17.04% -33.34%' }}>
              <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={imgVector3} />
            </div>
          </div>
          <div style={{ position: 'absolute', inset: '12.5% 45.83% 54.17% 20.83%' }}>
            <div style={{ position: 'absolute', inset: '-12.5%' }}>
              <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={imgVector4} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Header with icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '24px', position: 'relative' }}>
            <MessageCircle size={24} color="#ffffff" strokeWidth={2} />
          </div>
          <p
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: '22px',
              lineHeight: '32px',
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
            fontSize: '22px',
            lineHeight: '32px',
            color: '#ffffff',
            margin: 0,
          }}
        >
          {t.community.everyJourneyInspires}
        </p>

        {/* Description */}
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

        {/* Stats Container */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginTop: '8px' }}>
          {/* Active Members */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px' }}>
            <div style={{ width: '40px', height: '40px', position: 'relative' }}>
              <Users size={40} color="#ffffff" strokeWidth={1.5} />
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '22px',
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
                  fontSize: '18px',
                  lineHeight: '28px',
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                12,500+
              </p>
            </div>
          </div>

          {/* Stories Shared */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px' }}>
            <div style={{ width: '40px', height: '40px', position: 'relative' }}>
              <MessageCircle size={40} color="#ffffff" strokeWidth={1.5} />
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '22px',
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
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                8,700+
              </p>
            </div>
          </div>

          {/* Support Given */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px' }}>
            <div style={{ width: '40px', height: '40px', position: 'relative' }}>
              <Heart size={40} color="#ffffff" strokeWidth={1.5} />
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '22px',
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
                  fontSize: '16px',
                  lineHeight: '24px',
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
