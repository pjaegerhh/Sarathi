import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import backgroundImage from '../assets/images/Background_login.png';
import screen1Image from '../assets/images/onboarding_screen1.png';
import screen2Image from '../assets/images/onboarding-2.png';
import screen3Image from '../assets/images/onboarding-3.png';
import screen4Image from '../assets/images/onboarding-4.png';
import screen5Image from '../assets/images/onboarding-5.png';
import closeIcon from '../assets/svg/close_icon.svg';
import readyIcon from '../assets/svg/onboarding-6-icon.svg';

interface OnboardingPageProps {
  onNavigate: (page: string) => void;
}

export function OnboardingPage({ onNavigate }: OnboardingPageProps) {
  const { t } = useLanguage();
  const [currentScreen, setCurrentScreen] = useState(1);
  const totalScreens = 6;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClose = () => {
    onNavigate('home');
  };

  const handleNext = () => {
    if (currentScreen < totalScreens) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handlePrevious = () => {
    if (currentScreen > 1) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  // Screen 1: Welcome screen with full-height image
  const renderScreen1 = () => {
    return (
      <div style={{ position: 'relative', width: isMobile ? '100%' : 'auto' }}>
        <div style={{
          width: isMobile ? '100%' : '695px',
          height: isMobile ? 'auto' : '600px',
          minHeight: isMobile ? '500px' : 'auto',
          backgroundColor: 'white',
          borderRadius: isMobile ? '20px' : '30px',
          boxShadow: '0px 0px 10px 0px rgba(20,20,20,0.35)',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '24px' : '40px',
          overflow: 'hidden',
        }}>
        {/* Image and Close Button Container */}
        <div style={{
          height: isMobile ? '250px' : '401px',
          width: '100%',
          position: 'relative',
          borderTopLeftRadius: isMobile ? '20px' : '30px',
          borderTopRightRadius: isMobile ? '20px' : '30px',
        }}>
          {/* Image Container */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            borderTopLeftRadius: isMobile ? '20px' : '30px',
            borderTopRightRadius: isMobile ? '20px' : '30px',
            overflow: 'hidden',
          }}>
            <img
              src={screen1Image}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
            {/* Overlay gradient */}
            <div style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              height: '50%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #ffffff 100%)',
            }} />
          </div>
          
          {/* Header with Dots and Close Button */}
          <div style={{
            position: 'absolute',
            top: isMobile ? '16px' : '26px',
            left: isMobile ? '16px' : '26px',
            right: isMobile ? '16px' : '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            {/* Dot Indicators */}
            <div style={{
              display: 'flex',
              gap: isMobile ? '6px' : '8px',
              alignItems: 'center',
            }}>
              {Array.from({ length: totalScreens }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentScreen(index + 1)}
                  style={{
                    width: index + 1 === currentScreen ? (isMobile ? '24px' : '32px') : (isMobile ? '6px' : '8px'),
                    height: isMobile ? '6px' : '8px',
                    borderRadius: '4px',
                    backgroundColor: index + 1 === currentScreen ? '#388896' : 'rgba(255, 255, 255, 0.5)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>

            {/* Close Button */}
            <div style={{
              width: isMobile ? '40px' : '48px',
              height: isMobile ? '40px' : '48px',
              backgroundColor: '#F2F2F7',
              borderRadius: '50px',
              boxShadow: '0px 0px 10px 0px #dddddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={handleClose}>
              <img src={closeIcon} alt="Close" style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px' }} />
            </div>
          </div>
        </div>

        {/* Text Container */}
        <div style={{
          width: isMobile ? '100%' : '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '8px' : '12px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '8px 16px 24px' : '12px 24px',
        }}>
          {/* Title Container */}
          <div style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <div style={{
              position: 'relative',
              display: 'inline-block',
            }}>
              {/* Highlight shape behind "path" */}
              <div style={{
                position: 'absolute',
                right: '0px',
                top: isMobile ? '4px' : '6px',
                width: isMobile ? '60px' : '79px',
                height: isMobile ? '24px' : '30px',
                background: 'linear-gradient(180deg, #69b57c 0%, #388896 100%)',
                filter: 'blur(5px)',
              }} />
              
              {/* Title text */}
              <p style={{
                position: 'relative',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 500,
                fontSize: isMobile ? '22px' : '32px',
                lineHeight: isMobile ? '28px' : '40px',
                color: '#192126',
                textAlign: 'center',
                margin: 0,
                whiteSpace: isMobile ? 'normal' : 'nowrap',
              }}>
                {t.onboarding.screen1Title}
              </p>
            </div>
          </div>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            fontSize: isMobile ? '13px' : '14px',
            lineHeight: isMobile ? '20px' : '22px',
            color: '#979797',
            textAlign: 'center',
            margin: 0,
            width: '100%',
          }}>
            {t.onboarding.screen1Description}
          </p>
        </div>
      </div>

      {/* Navigation Chevrons - Outside the card */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? '16px' : '26px',
        left: isMobile ? '16px' : '26px',
        right: isMobile ? '16px' : '26px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pointerEvents: 'none',
      }}>
        {/* Previous Chevron */}
        {currentScreen > 1 ? (
          <button
            onClick={handlePrevious}
            style={{
              width: isMobile ? '40px' : '48px',
              height: isMobile ? '40px' : '48px',
              backgroundColor: '#F2F2F7',
              border: 'none',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
              transition: 'background-color 0.3s ease',
              pointerEvents: 'auto',
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.backgroundColor = '#388896';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', 'white');
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F2F2F7';
              const svg = e.currentTarget.querySelector('path');
              if (svg) svg.setAttribute('stroke', '#388896');
            }}
          >
            <svg width={isMobile ? '20' : '24'} height={isMobile ? '20' : '24'} viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#388896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          <div style={{ width: isMobile ? '40px' : '48px' }} />
        )}

        {/* Next Chevron */}
        {currentScreen < totalScreens ? (
          <button
            onClick={handleNext}
            style={{
              width: isMobile ? '40px' : '48px',
              height: isMobile ? '40px' : '48px',
              backgroundColor: '#F2F2F7',
              border: 'none',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
              transition: 'background-color 0.3s ease',
              pointerEvents: 'auto',
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.backgroundColor = '#388896';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', 'white');
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F2F2F7';
              const svg = e.currentTarget.querySelector('path');
              if (svg) svg.setAttribute('stroke', '#388896');
            }}
          >
            <svg width={isMobile ? '20' : '24'} height={isMobile ? '20' : '24'} viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#388896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          <div style={{ width: isMobile ? '40px' : '48px' }} />
        )}
        </div>
      </div>
    );
  };

  // Shared component for screens 2-5
  const renderImageScreen = (screenImage: string, titleKey: string, descriptionKey: string) => {
    return (
      <div style={{ position: 'relative', width: isMobile ? '100%' : 'auto' }}>
        <div style={{
          width: isMobile ? '100%' : '695px',
          height: isMobile ? 'auto' : '600px',
          minHeight: isMobile ? '450px' : 'auto',
          backgroundColor: 'white',
          borderRadius: isMobile ? '20px' : '30px',
          boxShadow: '0px 0px 10px 0px rgba(20,20,20,0.35)',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '8px' : '10px',
          overflow: 'hidden',
          padding: isMobile ? '12px 12px 24px' : '10px 10px 24px',
        }}>
          {/* Header with Dots and Close Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: isMobile ? '8px' : '16px',
            paddingRight: isMobile ? '8px' : '14px',
          }}>
            {/* Dot Indicators */}
            <div style={{
              display: 'flex',
              gap: isMobile ? '6px' : '8px',
              alignItems: 'center',
            }}>
              {Array.from({ length: totalScreens }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentScreen(index + 1)}
                  style={{
                    width: index + 1 === currentScreen ? (isMobile ? '24px' : '32px') : (isMobile ? '6px' : '8px'),
                    height: isMobile ? '6px' : '8px',
                    borderRadius: '4px',
                    backgroundColor: index + 1 === currentScreen ? '#388896' : 'rgba(56, 136, 150, 0.3)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>

            {/* Close Button */}
            <div style={{
              width: isMobile ? '40px' : '48px',
              height: isMobile ? '40px' : '48px',
              backgroundColor: '#F2F2F7',
              borderRadius: '50px',
              boxShadow: '0px 0px 10px 0px #dddddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={handleClose}>
              <img src={closeIcon} alt="Close" style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px' }} />
            </div>
          </div>

          {/* Image Container */}
          <div style={{
            width: isMobile ? '100%' : '459px',
            height: isMobile ? '220px' : '335px',
            margin: '0 auto',
            borderRadius: isMobile ? '16px' : '20px',
            overflow: 'hidden',
          }}>
            <img
              src={screenImage}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Text Container */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '8px' : '12px',
            alignItems: 'center',
            textAlign: 'center',
            padding: isMobile ? '0 16px' : '0 24px 0 0',
          }}>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
              fontSize: isMobile ? '22px' : '32px',
              lineHeight: isMobile ? '28px' : '40px',
              color: '#192126',
              margin: 0,
              whiteSpace: isMobile ? 'normal' : 'nowrap',
            }}>
              {titleKey}
            </p>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: isMobile ? '13px' : '14px',
              lineHeight: isMobile ? '20px' : '22px',
              color: '#979797',
              margin: 0,
              whiteSpace: isMobile ? 'normal' : 'nowrap',
            }}>
              {descriptionKey}
            </p>
          </div>
        </div>

        {/* Navigation Chevrons - Outside the card */}
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '16px' : '26px',
          left: isMobile ? '16px' : '26px',
          right: isMobile ? '16px' : '26px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
        }}>
          {/* Previous Chevron */}
          {currentScreen > 1 ? (
            <button
              onClick={handlePrevious}
              style={{
                width: isMobile ? '40px' : '48px',
                height: isMobile ? '40px' : '48px',
                backgroundColor: '#F2F2F7',
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                transition: 'background-color 0.3s ease',
                pointerEvents: 'auto',
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.backgroundColor = '#388896';
                  const svg = e.currentTarget.querySelector('path');
                  if (svg) svg.setAttribute('stroke', 'white');
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F2F2F7';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', '#388896');
              }}
            >
              <svg width={isMobile ? '20' : '24'} height={isMobile ? '20' : '24'} viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#388896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <div style={{ width: isMobile ? '40px' : '48px' }} />
          )}

          {/* Next Chevron */}
          {currentScreen < totalScreens ? (
            <button
              onClick={handleNext}
              style={{
                width: isMobile ? '40px' : '48px',
                height: isMobile ? '40px' : '48px',
                backgroundColor: '#F2F2F7',
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                transition: 'background-color 0.3s ease',
                pointerEvents: 'auto',
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.backgroundColor = '#388896';
                  const svg = e.currentTarget.querySelector('path');
                  if (svg) svg.setAttribute('stroke', 'white');
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F2F2F7';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', '#388896');
              }}
            >
              <svg width={isMobile ? '20' : '24'} height={isMobile ? '20' : '24'} viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#388896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <div style={{ width: isMobile ? '40px' : '48px' }} />
          )}
        </div>
      </div>
    );
  };

  // Screen 2: Different layout with smaller image
  const renderScreen2 = () => {
    return renderImageScreen(screen2Image, t.onboarding.screen2Title, t.onboarding.screen2Description);
  };

  // Screen 3: Different layout with smaller image
  const renderScreen3 = () => {
    return renderImageScreen(screen3Image, t.onboarding.screen3Title, t.onboarding.screen3Description);
  };

  // Screen 4: Different layout with smaller image
  const renderScreen4 = () => {
    return renderImageScreen(screen4Image, t.onboarding.screen4Title, t.onboarding.screen4Description);
  };

  // Screen 5: Different layout with smaller image and different text
  const renderScreen5 = () => {
    return renderImageScreen(screen5Image, t.onboarding.screen5Title, t.onboarding.screen5Description);
  };

  // Screen 6: Final "You are Ready!" screen
  const renderScreen6 = () => {
    return (
      <div style={{ 
        position: 'relative',
        width: isMobile ? '100%' : '400px',
        height: isMobile ? 'auto' : '339px',
        minHeight: isMobile ? '300px' : 'auto',
      }}>
        {/* Pop-Up Background */}
        <div style={{
          position: isMobile ? 'relative' : 'absolute',
          backgroundColor: 'white',
          height: isMobile ? 'auto' : '270px',
          left: 0,
          borderRadius: isMobile ? '20px' : '30px',
          boxShadow: '0px 0px 10px 0px #dddddd',
          top: isMobile ? '0' : '69px',
          width: isMobile ? '100%' : '400px',
          paddingTop: isMobile ? '80px' : '0',
          paddingBottom: isMobile ? '24px' : '0',
        }}>
          {/* Pop-Up Content */}
          <div style={{
            position: isMobile ? 'relative' : 'absolute',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
            justifyContent: 'center',
            left: isMobile ? '0' : '6px',
            top: isMobile ? '0' : '95px',
            width: isMobile ? '100%' : '388px',
            padding: isMobile ? '0 16px' : '0',
          }}>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
              fontSize: isMobile ? '24px' : '32px',
              lineHeight: isMobile ? '32px' : '40px',
              color: '#192126',
              textAlign: 'center',
              whiteSpace: isMobile ? 'normal' : 'nowrap',
              margin: 0,
            }}>
              {t.onboarding.screen6Title}
            </p>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
              fontSize: isMobile ? '14px' : '18px',
              lineHeight: isMobile ? '22px' : '28px',
              color: '#505050',
              textAlign: 'center',
              whiteSpace: isMobile ? 'normal' : 'nowrap',
              margin: 0,
            }}>
              {t.onboarding.screen6Description}
            </p>
            {/* Explore Sarathi Button */}
            <button
              onClick={() => onNavigate('home')}
              style={{
                backgroundColor: '#388896',
                height: isMobile ? '44px' : '48px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 24px',
                borderRadius: '26px',
                boxShadow: '0px 0px 10px 0px #dddddd',
                width: isMobile ? '140px' : '160px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                fontSize: isMobile ? '14px' : '16px',
                lineHeight: '24px',
                color: 'white',
                transition: 'background-color 0.3s ease',
                marginTop: isMobile ? '12px' : '4px',
              }}
              onMouseEnter={(e) => {
                if (!isMobile) e.currentTarget.style.backgroundColor = '#2a6b77';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#388896';
              }}
            >
              {t.onboarding.screen6Button}
            </button>
          </div>
        </div>

        {/* Icon Container */}
        <div style={{
          position: 'absolute',
          backgroundColor: 'white',
          left: '50%',
          borderRadius: '78px',
          boxShadow: '0px 0px 10px 0px #dddddd',
          width: isMobile ? '100px' : '141px',
          height: isMobile ? '100px' : '141px',
          top: isMobile ? '-50px' : '0.5px',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}>
          {/* Decorative Elements */}
          <img 
            alt="" 
            src={readyIcon} 
            style={{ 
              width: isMobile ? '80px' : '110.061px',
              height: isMobile ? '78px' : '107.409px',
            }} 
          />
        </div>

        {/* Previous Chevron - Only in bottom left */}
        <button
          onClick={handlePrevious}
          style={{
            position: 'absolute',
            bottom: isMobile ? '-60px' : '26px',
            left: isMobile ? '16px' : '26px',
            width: isMobile ? '40px' : '48px',
            height: isMobile ? '40px' : '48px',
            backgroundColor: '#F2F2F7',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.backgroundColor = '#388896';
              const svg = e.currentTarget.querySelector('path');
              if (svg) svg.setAttribute('stroke', 'white');
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#F2F2F7';
            const svg = e.currentTarget.querySelector('path');
            if (svg) svg.setAttribute('stroke', '#388896');
          }}
        >
          <svg width={isMobile ? '20' : '24'} height={isMobile ? '20' : '24'} viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#388896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    );
  };

  const renderCurrentScreen = () => {
    if (currentScreen === 1) {
      return renderScreen1();
    } else if (currentScreen === 2) {
      return renderScreen2();
    } else if (currentScreen === 3) {
      return renderScreen3();
    } else if (currentScreen === 4) {
      return renderScreen4();
    } else if (currentScreen === 5) {
      return renderScreen5();
    } else if (currentScreen === 6) {
      return renderScreen6();
    }
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: isMobile ? '80px' : '120px',
      paddingBottom: isMobile ? '100px' : '0',
    }}>
      {/* Background Image with blur */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        filter: 'blur(20px)',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          <img
            src={backgroundImage}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </div>
      </div>

      {/* Background Shape - frosted glass effect */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(6px)',
      }} />

      {/* Container - centered card */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: isMobile ? 'calc(100% - 32px)' : 'auto',
        maxWidth: isMobile ? '400px' : 'none',
        margin: isMobile ? '0 auto' : '0',
      }}>
        {renderCurrentScreen()}
      </div>
    </div>
  );
}
