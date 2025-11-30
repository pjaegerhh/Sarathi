import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import backgroundImage from '../assets/images/Background_login.png';
import sarathiLogo from '../assets/svg/sarathi_login.svg';

interface ProfileVerifiedPageProps {
  onNavigate: (page: string) => void;
}

export const ProfileVerifiedPage: React.FC<ProfileVerifiedPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [verificationError, setVerificationError] = useState(false);

  useEffect(() => {
    const handleEmailVerification = async () => {
      console.log('🔍 ProfileVerifiedPage: Starting email verification check');
      
      // Check if there's a hash in the URL (email verification)
      const hash = window.location.hash;
      if (hash && (hash.includes('access_token') || hash.includes('type=signup'))) {
        console.log('📧 Email verification detected in URL');
        
        try {
          // Wait a moment for Supabase to process the URL
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Check if session was established
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('❌ Error getting session after verification:', error);
            setVerificationError(true);
            setIsReady(true);
            return;
          }
          
          if (session && session.user) {
            console.log('✅ User session established after email verification:', session.user.email);
            toast.success('Email verified successfully! You are now logged in.');
            
            // Force a refresh of the auth state by triggering the context manually
            // The AuthContext should pick this up via onAuthStateChange
          } else {
            console.warn('⚠️ No session found after verification, trying to refresh...');
            
            // Try to refresh the session
            const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
            
            if (refreshError || !refreshData.session) {
              console.error('❌ Failed to establish session:', refreshError);
              setVerificationError(true);
              setIsReady(true);
              return;
            }
            
            console.log('✅ Session established after refresh:', refreshData.session.user.email);
            toast.success('Email verified successfully! You are now logged in.');
          }
        } catch (error) {
          console.error('❌ Exception during email verification:', error);
          setVerificationError(true);
          setIsReady(true);
        }
      } else {
        console.log('ℹ️ No verification token in URL');
      }
    };

    handleEmailVerification();
  }, []);

  useEffect(() => {
    // Wait for either user to be available or loading to complete
    console.log('🔍 ProfileVerifiedPage: Auth state:', { hasUser: !!user, loading });
    
    if (!loading) {
      if (user) {
        console.log('✅ ProfileVerifiedPage: User is logged in');
        setIsReady(true);
      } else {
        // No user after loading completed - show ready anyway
        // The verification check above will handle showing error if needed
        console.log('⚠️ No user found after auth loading completed');
        setIsReady(true);
      }
    }
  }, [user, loading]);

  // Show loading state while auth is initializing
  if (!isReady) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              border: '4px solid #E0F2FE',
              borderTop: '4px solid #388896',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          <p style={{ color: '#388896', fontSize: '16px' }}>Verifying your account and logging you in...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Show error state if verification failed
  if (verificationError) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
          padding: '20px',
        }}
      >
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '48px',
          maxWidth: '500px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 24px',
            background: '#EF4444',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#192126', marginBottom: '16px' }}>
            Verification Failed
          </h2>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px', lineHeight: '1.6' }}>
            We couldn't verify your email. The link may have expired or is invalid.
          </p>
          <button
            onClick={() => onNavigate('auth')}
            style={{
              width: '100%',
              height: '52px',
              background: '#388896',
              color: 'white',
              border: 'none',
              borderRadius: '26px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Blurred Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)',
          transform: 'scale(1.1)',
          zIndex: 0,
        }}
      />

      {/* Background overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)',
          backdropFilter: 'blur(6px)',
          zIndex: 1,
        }}
      />

      {/* Main Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1139px',
          height: '827px',
          display: 'flex',
          margin: '0 auto',
        }}
      >
        {/* Left Side - Gradient with Logo */}
        <div
          style={{
            width: '479px',
            height: '827px',
            borderTopLeftRadius: '30px',
            borderBottomLeftRadius: '30px',
            background: 'linear-gradient(180deg, #8AC0AD 0%, #388896 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Logo */}
          <img
            src={sarathiLogo}
            alt="Sarathi"
            style={{
              width: '120px',
              height: 'auto',
              filter: 'brightness(0) invert(1)',
            }}
          />
        </div>

        {/* Right Side - White Background with Success Content */}
        <div
          style={{
            flex: 1,
            background: 'white',
            borderTopRightRadius: '30px',
            borderBottomRightRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px',
          }}
        >
          {/* Success Card */}
          <div
            style={{
              background: 'white',
              borderRadius: '30px',
              padding: '46px 140px',
              boxShadow: '0px 0px 9.1px 0px rgba(20, 20, 20, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '598px',
            }}
          >
            {/* Icon Container with decorative dots */}
            <div
              style={{
                position: 'relative',
                width: '160px',
                height: '160px',
                marginBottom: '24px',
              }}
            >
              {/* Main gradient circle */}
              <div
                style={{
                  position: 'absolute',
                  left: '11.01px',
                  top: '6.77px',
                  width: '131.22px',
                  height: '131.22px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8AC0AD 0%, #388896 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* User Icon */}
                <svg
                  width="58"
                  height="58"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>

              {/* Decorative dots - large circles */}
              <div
                style={{
                  position: 'absolute',
                  left: '73.65px',
                  top: '142.23px',
                  width: '6.77px',
                  height: '6.77px',
                  borderRadius: '50%',
                  background: '#388896',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '1.69px',
                  top: '94.82px',
                  width: '6.77px',
                  height: '6.77px',
                  borderRadius: '50%',
                  background: '#388896',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '130.37px',
                  top: '16.09px',
                  width: '6.77px',
                  height: '6.77px',
                  borderRadius: '50%',
                  background: '#388896',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '121.06px',
                  top: '125.3px',
                  width: '6.77px',
                  height: '6.77px',
                  borderRadius: '50%',
                  background: '#388896',
                }}
              />

              {/* Decorative dots - small circles */}
              <div
                style={{
                  position: 'absolute',
                  left: '29.63px',
                  top: '133.76px',
                  width: '2.54px',
                  height: '2.54px',
                  borderRadius: '50%',
                  background: '#8AC0AD',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '158.31px',
                  top: '92.28px',
                  width: '2.54px',
                  height: '2.54px',
                  borderRadius: '50%',
                  background: '#8AC0AD',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '11.01px',
                  top: '103.28px',
                  width: '2.54px',
                  height: '2.54px',
                  borderRadius: '50%',
                  background: '#8AC0AD',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '0px',
                  top: '58.41px',
                  width: '2.54px',
                  height: '2.54px',
                  borderRadius: '50%',
                  background: '#8AC0AD',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '131.22px',
                  top: '128.68px',
                  width: '2.54px',
                  height: '2.54px',
                  borderRadius: '50%',
                  background: '#8AC0AD',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '142.23px',
                  top: '50.37px',
                  width: '2.54px',
                  height: '2.54px',
                  borderRadius: '50%',
                  background: '#8AC0AD',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '26.24px',
                  top: '0px',
                  width: '2.54px',
                  height: '2.54px',
                  borderRadius: '50%',
                  background: '#8AC0AD',
                }}
              />

              {/* Decorative dots - medium circles */}
              <div
                style={{
                  position: 'absolute',
                  left: '149px',
                  top: '77.04px',
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  background: '#8AC0AD',
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '38.1px',
                  top: '136.3px',
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  background: '#8AC0AD',
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '34.71px',
                  top: '2.54px',
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  background: '#8AC0AD',
                  opacity: 0.5,
                }}
              />
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '32px',
                fontWeight: 500,
                color: '#192126',
                marginBottom: '8px',
                lineHeight: '40px',
                whiteSpace: 'pre',
              }}
            >
              {t.auth.profileVerifiedSuccessfully}
            </h1>

            {/* Description */}
            <p
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                color: '#979797',
                marginBottom: '12px',
                lineHeight: '28px',
                maxWidth: '100%',
              }}
            >
              {t.auth.profileVerifiedDescription}
            </p>

            {/* Explore Sarathi Button */}
            <button
              onClick={() => onNavigate('profile-onboarding')}
              style={{
                background: '#388896',
                color: 'white',
                border: 'none',
                borderRadius: '28px',
                padding: '8px 24px',
                fontSize: '16px',
                fontWeight: 700,
                fontFamily: 'Roboto, sans-serif',
                cursor: 'pointer',
                height: '52px',
                width: '200px',
                boxShadow: '0px 0px 10px 0px #dddddd',
                transition: 'all 0.2s ease',
                lineHeight: '24px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0px 4px 14px 0px rgba(56, 136, 150, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0px 0px 10px 0px #dddddd';
              }}
            >
              {t.auth.exploreSarathi}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
