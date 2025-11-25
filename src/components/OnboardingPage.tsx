import { useState } from 'react';
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
      <div style={{ position: 'relative' }}>
        <div style={{
          width: '695px',
          height: '600px',
          backgroundColor: 'white',
          borderRadius: '30px',
          boxShadow: '0px 0px 10px 0px rgba(20,20,20,0.35)',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          overflow: 'hidden',
        }}>
        {/* Image and Close Button Container */}
        <div style={{
          height: '401px',
          width: '100%',
          position: 'relative',
          borderTopLeftRadius: '30px',
          borderTopRightRadius: '30px',
        }}>
          {/* Image Container */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '694.518px',
            height: '396.867px',
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '30px',
            overflow: 'hidden',
          }}>
            <img
              src={screen1Image}
              alt=""
              style={{
                position: 'absolute',
                left: '-1.73%',
                top: '-47.58%',
                width: '102.45%',
                height: '179.28%',
                maxWidth: 'none',
              }}
            />
            {/* Overlay gradient */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: '173.21px',
              width: '694.518px',
              height: '227.787px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #ffffff 100%)',
              borderTopLeftRadius: '30px',
              borderTopRightRadius: '30px',
            }} />
          </div>
          
          {/* Header with Dots and Close Button */}
          <div style={{
            position: 'absolute',
            top: '26px',
            left: '26px',
            right: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            {/* Dot Indicators */}
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}>
              {Array.from({ length: totalScreens }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentScreen(index + 1)}
                  style={{
                    width: index + 1 === currentScreen ? '32px' : '8px',
                    height: '8px',
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
              width: '48px',
              height: '48px',
              backgroundColor: '#F2F2F7',
              borderRadius: '50px',
              boxShadow: '0px 0px 10px 0px #dddddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={handleClose}>
              <img src={closeIcon} alt="Close" style={{ width: '24px', height: '24px' }} />
            </div>
          </div>
        </div>

        {/* Text Container */}
        <div style={{
          width: '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px 24px',
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
                top: '6px',
                width: '79px',
                height: '30px',
                background: 'linear-gradient(180deg, #69b57c 0%, #388896 100%)',
                filter: 'blur(5px)',
              }} />
              
              {/* Title text */}
              <p style={{
                position: 'relative',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 500,
                fontSize: '32px',
                lineHeight: '40px',
                color: '#192126',
                textAlign: 'center',
                margin: 0,
                whiteSpace: 'nowrap',
              }}>
                {t.onboarding.screen1Title}
              </p>
            </div>
          </div>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '22px',
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
        bottom: '26px',
        left: '26px',
        right: '26px',
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
              width: '48px',
              height: '48px',
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
              e.currentTarget.style.backgroundColor = '#388896';
              const svg = e.currentTarget.querySelector('path');
              if (svg) svg.setAttribute('stroke', 'white');
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F2F2F7';
              const svg = e.currentTarget.querySelector('path');
              if (svg) svg.setAttribute('stroke', '#388896');
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#388896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          <div style={{ width: '48px' }} />
        )}

        {/* Next Chevron */}
        {currentScreen < totalScreens ? (
          <button
            onClick={handleNext}
            style={{
              width: '48px',
              height: '48px',
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
              e.currentTarget.style.backgroundColor = '#388896';
              const svg = e.currentTarget.querySelector('path');
              if (svg) svg.setAttribute('stroke', 'white');
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F2F2F7';
              const svg = e.currentTarget.querySelector('path');
              if (svg) svg.setAttribute('stroke', '#388896');
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#388896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          <div style={{ width: '48px' }} />
        )}
        </div>
      </div>
    );
  };

  // Screen 2: Different layout with smaller image
  const renderScreen2 = () => {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{
          width: '695px',
          height: '600px',
          backgroundColor: 'white',
          borderRadius: '30px',
          boxShadow: '0px 0px 10px 0px rgba(20,20,20,0.35)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          overflow: 'hidden',
          padding: '10px 10px 24px',
        }}>
          {/* Header with Dots and Close Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: '16px',
            paddingRight: '14px',
          }}>
            {/* Dot Indicators */}
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}>
              {Array.from({ length: totalScreens }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentScreen(index + 1)}
                  style={{
                    width: index + 1 === currentScreen ? '32px' : '8px',
                    height: '8px',
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
              width: '48px',
              height: '48px',
              backgroundColor: '#F2F2F7',
              borderRadius: '50px',
              boxShadow: '0px 0px 10px 0px #dddddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={handleClose}>
              <img src={closeIcon} alt="Close" style={{ width: '24px', height: '24px' }} />
            </div>
          </div>

          {/* Image Container - 459x335 */}
          <div style={{
            width: '459px',
            height: '335px',
            margin: '0 auto',
            borderRadius: '20px',
            overflow: 'hidden',
          }}>
            <img
              src={screen2Image}
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
            gap: '12px',
            alignItems: 'center',
            textAlign: 'center',
            paddingRight: '24px',
          }}>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
              fontSize: '32px',
              lineHeight: '40px',
              color: '#192126',
              margin: 0,
              whiteSpace: 'nowrap',
            }}>
              {t.onboarding.screen2Title}
            </p>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '22px',
              color: '#979797',
              margin: 0,
              whiteSpace: 'nowrap',
            }}>
              {t.onboarding.screen2Description}
            </p>
          </div>
        </div>

        {/* Navigation Chevrons - Outside the card */}
        <div style={{
          position: 'absolute',
          bottom: '26px',
          left: '26px',
          right: '26px',
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
                width: '48px',
                height: '48px',
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
                e.currentTarget.style.backgroundColor = '#388896';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', 'white');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F2F2F7';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', '#388896');
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#388896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <div style={{ width: '48px' }} />
          )}

          {/* Next Chevron */}
          {currentScreen < totalScreens ? (
            <button
              onClick={handleNext}
              style={{
                width: '48px',
                height: '48px',
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
                e.currentTarget.style.backgroundColor = '#388896';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', 'white');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F2F2F7';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', '#388896');
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#388896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <div style={{ width: '48px' }} />
          )}
        </div>
      </div>
    );
  };

  // Screen 3: Different layout with smaller image
  const renderScreen3 = () => {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{
          width: '695px',
          height: '600px',
          backgroundColor: 'white',
          borderRadius: '30px',
          boxShadow: '0px 0px 10px 0px rgba(20,20,20,0.35)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          overflow: 'hidden',
          padding: '10px 10px 24px',
        }}>
          {/* Header with Dots and Close Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: '16px',
            paddingRight: '14px',
          }}>
            {/* Dot Indicators */}
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}>
              {Array.from({ length: totalScreens }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentScreen(index + 1)}
                  style={{
                    width: index + 1 === currentScreen ? '32px' : '8px',
                    height: '8px',
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
              width: '48px',
              height: '48px',
              backgroundColor: '#F2F2F7',
              borderRadius: '50px',
              boxShadow: '0px 0px 10px 0px #dddddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={handleClose}>
              <img src={closeIcon} alt="Close" style={{ width: '24px', height: '24px' }} />
            </div>
          </div>

          {/* Image Container - 459x335 */}
          <div style={{
            width: '459px',
            height: '335px',
            margin: '0 auto',
            borderRadius: '20px',
            overflow: 'hidden',
          }}>
            <img
              src={screen3Image}
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
            gap: '12px',
            alignItems: 'center',
            textAlign: 'center',
            paddingRight: '24px',
          }}>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
              fontSize: '32px',
              lineHeight: '40px',
              color: '#192126',
              margin: 0,
              whiteSpace: 'nowrap',
            }}>
              {t.onboarding.screen3Title}
            </p>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '22px',
              color: '#979797',
              margin: 0,
              textAlign: 'center',
            }}>
              {t.onboarding.screen3Description}
            </p>
          </div>
        </div>

        {/* Navigation Chevrons - Outside the card */}
        <div style={{
          position: 'absolute',
          bottom: '26px',
          left: '26px',
          right: '26px',
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
                width: '48px',
                height: '48px',
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
                e.currentTarget.style.backgroundColor = '#388896';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', 'white');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F2F2F7';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', '#388896');
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#388896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <div style={{ width: '48px' }} />
          )}

          {/* Next Chevron */}
          {currentScreen < totalScreens ? (
            <button
              onClick={handleNext}
              style={{
                width: '48px',
                height: '48px',
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
                e.currentTarget.style.backgroundColor = '#388896';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', 'white');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F2F2F7';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', '#388896');
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#388896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <div style={{ width: '48px' }} />
          )}
        </div>
      </div>
    );
  };

  // Screen 4: Different layout with smaller image
  const renderScreen4 = () => {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{
          width: '695px',
          height: '600px',
          backgroundColor: 'white',
          borderRadius: '30px',
          boxShadow: '0px 0px 10px 0px rgba(20,20,20,0.35)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          overflow: 'hidden',
          padding: '10px 10px 24px',
        }}>
          {/* Header with Dots and Close Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: '16px',
            paddingRight: '14px',
          }}>
            {/* Dot Indicators */}
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}>
              {Array.from({ length: totalScreens }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentScreen(index + 1)}
                  style={{
                    width: index + 1 === currentScreen ? '32px' : '8px',
                    height: '8px',
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
              width: '48px',
              height: '48px',
              backgroundColor: '#F2F2F7',
              borderRadius: '50px',
              boxShadow: '0px 0px 10px 0px #dddddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={handleClose}>
              <img src={closeIcon} alt="Close" style={{ width: '24px', height: '24px' }} />
            </div>
          </div>

          {/* Image Container - 459x335 */}
          <div style={{
            width: '459px',
            height: '335px',
            margin: '0 auto',
            borderRadius: '20px',
            overflow: 'hidden',
          }}>
            <img
              src={screen4Image}
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
            gap: '12px',
            alignItems: 'center',
            textAlign: 'center',
            paddingRight: '24px',
          }}>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
              fontSize: '32px',
              lineHeight: '40px',
              color: '#192126',
              margin: 0,
              whiteSpace: 'nowrap',
            }}>
              {t.onboarding.screen4Title}
            </p>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '22px',
              color: '#979797',
              margin: 0,
              whiteSpace: 'nowrap',
            }}>
              {t.onboarding.screen4Description}
            </p>
          </div>
        </div>

        {/* Navigation Chevrons - Outside the card */}
        <div style={{
          position: 'absolute',
          bottom: '26px',
          left: '26px',
          right: '26px',
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
                width: '48px',
                height: '48px',
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
                e.currentTarget.style.backgroundColor = '#388896';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', 'white');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F2F2F7';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', '#388896');
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#388896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <div style={{ width: '48px' }} />
          )}

          {/* Next Chevron */}
          {currentScreen < totalScreens ? (
            <button
              onClick={handleNext}
              style={{
                width: '48px',
                height: '48px',
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
                e.currentTarget.style.backgroundColor = '#388896';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', 'white');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F2F2F7';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', '#388896');
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#388896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <div style={{ width: '48px' }} />
          )}
        </div>
      </div>
    );
  };

  // Screen 5: Different layout with smaller image and different text
  const renderScreen5 = () => {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{
          width: '695px',
          height: '600px',
          backgroundColor: 'white',
          borderRadius: '30px',
          boxShadow: '0px 0px 10px 0px rgba(20,20,20,0.35)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          overflow: 'hidden',
          padding: '10px 10px 24px',
        }}>
          {/* Header with Dots and Close Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: '16px',
            paddingRight: '14px',
          }}>
            {/* Dot Indicators */}
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}>
              {Array.from({ length: totalScreens }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentScreen(index + 1)}
                  style={{
                    width: index + 1 === currentScreen ? '32px' : '8px',
                    height: '8px',
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
              width: '48px',
              height: '48px',
              backgroundColor: '#F2F2F7',
              borderRadius: '50px',
              boxShadow: '0px 0px 10px 0px #dddddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={handleClose}>
              <img src={closeIcon} alt="Close" style={{ width: '24px', height: '24px' }} />
            </div>
          </div>

          {/* Image Container - 459x335 */}
          <div style={{
            width: '459px',
            height: '335px',
            margin: '0 auto',
            borderRadius: '20px',
            overflow: 'hidden',
          }}>
            <img
              src={screen5Image}
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
            gap: '12px',
            alignItems: 'center',
            textAlign: 'center',
            paddingRight: '24px',
          }}>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
              fontSize: '32px',
              lineHeight: '40px',
              color: '#192126',
              margin: 0,
              whiteSpace: 'nowrap',
            }}>
              {t.onboarding.screen5Title}
            </p>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '22px',
              color: '#979797',
              margin: 0,
              whiteSpace: 'nowrap',
            }}>
              {t.onboarding.screen5Description}
            </p>
          </div>
        </div>

        {/* Navigation Chevrons - Outside the card */}
        <div style={{
          position: 'absolute',
          bottom: '26px',
          left: '26px',
          right: '26px',
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
                width: '48px',
                height: '48px',
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
                e.currentTarget.style.backgroundColor = '#388896';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', 'white');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F2F2F7';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', '#388896');
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#388896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <div style={{ width: '48px' }} />
          )}

          {/* Next Chevron */}
          {currentScreen < totalScreens ? (
            <button
              onClick={handleNext}
              style={{
                width: '48px',
                height: '48px',
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
                e.currentTarget.style.backgroundColor = '#388896';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', 'white');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F2F2F7';
                const svg = e.currentTarget.querySelector('path');
                if (svg) svg.setAttribute('stroke', '#388896');
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#388896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <div style={{ width: '48px' }} />
          )}
        </div>
      </div>
    );
  };

  // Screen 6: Final "You are Ready!" screen
  const renderScreen6 = () => {
    return (
      <div style={{ 
        position: 'relative',
        width: '400px',
        height: '339px',
      }}>
        {/* Pop-Up Background */}
        <div style={{
          position: 'absolute',
          backgroundColor: 'white',
          height: '270px',
          left: 0,
          borderRadius: '30px',
          boxShadow: '0px 0px 10px 0px #dddddd',
          top: '69px',
          width: '400px',
        }}>
          {/* Pop-Up Content */}
          <div style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
            justifyContent: 'center',
            left: '6px',
            top: '95px',
            width: '388px',
          }}>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
              fontSize: '32px',
              lineHeight: '40px',
              color: '#192126',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              margin: 0,
            }}>
              {t.onboarding.screen6Title}
            </p>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '28px',
              color: '#505050',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              margin: 0,
            }}>
              {t.onboarding.screen6Description}
            </p>
            {/* Explore Sarathi Button */}
            <button
              onClick={() => onNavigate('home')}
              style={{
                backgroundColor: '#388896',
                height: '48px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 24px',
                borderRadius: '26px',
                boxShadow: '0px 0px 10px 0px #dddddd',
                width: '160px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '24px',
                color: 'white',
                transition: 'background-color 0.3s ease',
                marginTop: '4px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2a6b77';
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
          width: '141px',
          height: '141px',
          top: '0.5px',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Decorative Elements */}
          <img 
            alt="" 
            src={readyIcon} 
            style={{ 
              width: '110.061px',
              height: '107.409px',
            }} 
          />
        </div>

        {/* Previous Chevron - Only in bottom left */}
        <button
          onClick={handlePrevious}
          style={{
            position: 'absolute',
            bottom: '26px',
            left: '26px',
            width: '48px',
            height: '48px',
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
            e.currentTarget.style.backgroundColor = '#388896';
            const svg = e.currentTarget.querySelector('path');
            if (svg) svg.setAttribute('stroke', 'white');
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#F2F2F7';
            const svg = e.currentTarget.querySelector('path');
            if (svg) svg.setAttribute('stroke', '#388896');
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
      paddingTop: '120px',
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
      }}>
        {renderCurrentScreen()}
      </div>
    </div>
  );
}
