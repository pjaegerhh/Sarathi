import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import paulineImage from '../assets/images/pauline.png';
import peterImage from '../assets/images/peter.png';
import sharikaImage from '../assets/images/sharika.png';
import sarveshImage from '../assets/images/sarvesh.png';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const TEAM = [
  { key: 'pauline' as const, image: paulineImage },
  { key: 'peter' as const, image: peterImage },
  { key: 'sharika' as const, image: sharikaImage },
  { key: 'sarvesh' as const, image: sarveshImage },
] as const;

export function AboutPage({ onNavigate }: AboutPageProps) {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getName = (key: typeof TEAM[number]['key']) => {
    switch (key) {
      case 'pauline': return t.aboutPage.paulineName;
      case 'peter': return t.aboutPage.peterName;
      case 'sharika': return t.aboutPage.sharikaName;
      case 'sarvesh': return t.aboutPage.sarveshName;
      default: return '';
    }
  };

  const getRole = (key: typeof TEAM[number]['key']) => {
    switch (key) {
      case 'pauline': return t.aboutPage.paulineRole;
      case 'peter': return t.aboutPage.peterRole;
      case 'sharika': return t.aboutPage.sharikaRole;
      case 'sarvesh': return t.aboutPage.sarveshRole;
      default: return '';
    }
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 20px' : '0 80px' }}>
        {/* Heading */}
        <h1
          style={{
            color: '#388896',
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: 500,
            lineHeight: '40px',
            paddingTop: isMobile ? '24px' : '40px',
            marginBottom: '12px',
          }}
        >
          {t.aboutPage.meetTheBrains}
        </h1>

        {/* Back arrow button */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            padding: 0,
            color: '#388896',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '22px',
            cursor: 'pointer',
            fontFamily: 'Roboto, sans-serif',
            marginBottom: isMobile ? '24px' : '38px',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#388896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {t.aboutPage.backToHome}
        </button>

        {/* Team photos */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '32px' : '24px',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'flex-start',
            marginBottom: '12px',
          }}
        >
          {TEAM.map(({ key, image }) => (
            <div
              key={key}
              style={{
                flex: isMobile ? 'none' : '1',
                maxWidth: '265px',
                width: isMobile ? '265px' : undefined,
              }}
            >
              {/* Photo */}
              <div
                style={{
                  width: '100%',
                  height: '300px',
                  borderRadius: '30px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={image}
                  alt={getName(key)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
              </div>
              {/* Name + Role */}
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <p
                  style={{
                    color: '#192126',
                    fontSize: '18px',
                    fontWeight: 500,
                    lineHeight: '28px',
                    margin: '0 0 4px 0',
                  }}
                >
                  {getName(key)}
                </p>
                <p
                  style={{
                    color: '#979797',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    margin: 0,
                  }}
                >
                  {getRole(key)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Paragraphs */}
        <div
          style={{
            maxWidth: '1120px',
            marginTop: '40px',
            color: '#000',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '22px',
          }}
        >
          <p style={{ margin: '0 0 22px 0' }}>{t.aboutPage.paragraph1}</p>
          <p style={{ margin: '0 0 22px 0' }}>{t.aboutPage.paragraph2}</p>
          <p style={{ margin: 0 }}>{t.aboutPage.paragraph3}</p>
        </div>

        {/* Bottom spacing */}
        <div style={{ paddingBottom: '60px' }} />
      </div>
    </div>
  );
}
