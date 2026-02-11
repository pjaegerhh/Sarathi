import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import backgroundImage from '../assets/images/Background_login.png';
import sarathiLogo from '../assets/svg/sarathi_login.svg';

interface ProfileVerifiedPageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

export const ProfileVerifiedPage: React.FC<ProfileVerifiedPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const handleEmailVerification = async () => {
      // Check if there's a hash in the URL (email verification)
      const hash = window.location.hash;
      if (hash && (hash.includes('access_token') || hash.includes('type=signup'))) {
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
            toast.success('Email verified successfully! You are now logged in.');
            
            // Force a refresh of the auth state by triggering the context manually
            // The AuthContext should pick this up via onAuthStateChange
          } else {
            // Try to refresh the session
            const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
            
            if (refreshError || !refreshData.session) {
              console.error('❌ Failed to establish session:', refreshError);
              setVerificationError(true);
              setIsReady(true);
              return;
            }
            
            toast.success('Email verified successfully! You are now logged in.');
          }
        } catch (error) {
          console.error('❌ Exception during email verification:', error);
          setVerificationError(true);
          setIsReady(true);
        }
      }
    };

    handleEmailVerification();
  }, []);

  useEffect(() => {
    // Wait for either user to be available or loading to complete
    if (!loading) {
      if (user) {
        setIsReady(true);
      } else {
        // No user after loading completed - show ready anyway
        // The verification check above will handle showing error if needed
        setIsReady(true);
      }
    }
  }, [user, loading]);

  // Show loading state while auth is initializing
  if (!isReady) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
          padding: isMobile ? 20 : 40,
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 320 }}>
          <div
            style={{
              width: isMobile ? 40 : 48,
              height: isMobile ? 40 : 48,
              border: '4px solid #E0F2FE',
              borderTop: '4px solid #388896',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          <p style={{ color: '#388896', fontSize: isMobile ? 14 : 16 }}>{t.auth.verifyingAccount}</p>
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
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
          padding: isMobile ? '20px 16px' : 20,
        }}
      >
        <div style={{
          backgroundColor: 'white',
          borderRadius: isMobile ? 20 : 24,
          padding: isMobile ? '28px 20px' : 48,
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        }}>
          <div style={{
            width: isMobile ? 64 : 80,
            height: isMobile ? 64 : 80,
            margin: '0 auto 24px',
            background: '#EF4444',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width={isMobile ? 32 : 40} height={isMobile ? 32 : 40} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h2 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, color: '#192126', marginBottom: 12 }}>
            {t.auth.verificationFailed}
          </h2>
          <p style={{ fontSize: isMobile ? 14 : 16, color: '#666', marginBottom: isMobile ? 24 : 32, lineHeight: 1.6 }}>
            {t.auth.verificationFailedDescription}
          </p>
          <button
            onClick={() => {
              try {
                sessionStorage.setItem('postLoginRedirect', 'profile');
              } catch { /* ignore */ }
              onNavigate('auth', { returnTo: 'profile' });
            }}
            style={{
              width: '100%',
              height: isMobile ? 48 : 52,
              background: '#388896',
              color: 'white',
              border: 'none',
              borderRadius: 26,
              fontSize: isMobile ? 15 : 16,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {t.auth.goToLogin}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'auto',
        padding: isMobile ? 16 : 24,
        boxSizing: 'border-box',
      }}
    >
      {/* Blurred Background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)',
          transform: 'scale(1.1)',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)',
          backdropFilter: 'blur(6px)',
          zIndex: 1,
        }}
      />

      {/* Single card: fits one screen on mobile, two columns on desktop with all text visible */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: isMobile ? 400 : 900,
          background: 'white',
          borderRadius: isMobile ? 20 : 24,
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        {/* Left: gradient + logo */}
        <div
          style={{
            width: isMobile ? '100%' : 340,
            flexShrink: 0,
            minHeight: isMobile ? 100 : 360,
            background: 'linear-gradient(180deg, #8AC0AD 0%, #388896 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? 24 : 40,
          }}
        >
          <img
            src={sarathiLogo}
            alt="Sarathi"
            style={{
              width: isMobile ? 64 : 100,
              height: 'auto',
              filter: 'brightness(0) invert(1)',
            }}
          />
        </div>

        {/* Right: content - explicit width and overflow visible so text always shows */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: isMobile ? 20 : 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {/* Check icon */}
          <div
            style={{
              width: isMobile ? 56 : 72,
              height: isMobile ? 56 : 72,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8AC0AD 0%, #388896 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: isMobile ? 12 : 20,
            }}
          >
            <svg width={isMobile ? 28 : 36} height={isMobile ? 28 : 36} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <h1
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: isMobile ? 20 : 26,
              fontWeight: 600,
              color: '#192126',
              margin: 0,
              marginBottom: 8,
              lineHeight: 1.3,
            }}
          >
            {t.auth.profileVerifiedSuccessfully}
          </h1>

          <p
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: isMobile ? 14 : 16,
              fontWeight: 500,
              color: '#505050',
              margin: 0,
              marginBottom: isMobile ? 20 : 24,
              lineHeight: 1.5,
            }}
          >
            {t.auth.profileVerifiedDescription}
          </p>

          <button
            onClick={() => onNavigate('onboarding-flow')}
            style={{
              background: '#388896',
              color: 'white',
              border: 'none',
              borderRadius: 24,
              padding: isMobile ? '12px 24px' : '14px 28px',
              fontSize: isMobile ? 15 : 16,
              fontWeight: 700,
              fontFamily: 'Roboto, sans-serif',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(56, 136, 150, 0.3)',
            }}
          >
            {t.auth.exploreSarathi}
          </button>
        </div>
      </div>
    </div>
  );
};
