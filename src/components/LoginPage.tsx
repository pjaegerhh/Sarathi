import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';
import backgroundImage from '../assets/images/Background_login.png';
import sarathiLogo from '../assets/svg/sarathi_login.svg';
import lockIcon from '../assets/svg/lock_pwd.svg';
import googleIcon from '../assets/svg/google.svg';
import facebookIcon from '../assets/svg/facebook.svg';
import appleIcon from '../assets/svg/apple.svg';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { t } = useLanguage();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUnverifiedScreen, setShowUnverifiedScreen] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // First attempt to login to check if user exists and password is correct
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Check if the error is due to email not confirmed
        if (error.message.includes('Email not confirmed') || error.message.includes('not confirmed')) {
          setUnverifiedEmail(email);
          setShowUnverifiedScreen(true);
          setLoading(false);
          return;
        }
        throw error;
      }

      // Check if user's email is confirmed
      if (data.user && !data.user.email_confirmed_at) {
        setUnverifiedEmail(email);
        setShowUnverifiedScreen(true);
        // Sign out the user since they're not verified
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      // User is verified, proceed with login
      await login(email, password);
      toast.success(t.auth.loginSuccess);
      
      // Check if this is the test user - always show onboarding
      const TEST_USER_EMAIL = 'peter@compusys.cc';
      if (email.toLowerCase() === TEST_USER_EMAIL.toLowerCase()) {
        onNavigate('onboarding-flow');
        return;
      }

      // For other users, check if onboarding has been completed
      if (data.user) {
        try {
          const { data: userData, error: userError } = await supabase
            .from('sarathi_user')
            .select('user_type')
            .eq('uuid', data.user.id)
            .single();

          // Check if user has not set a user_type yet (first-time login after verification)
          if (!userError && userData) {
            if (!userData.user_type || userData.user_type === 'amputee') {
              // Check if user_type is the default - might need onboarding
              // For now, we'll only trigger onboarding for the test user
            }
          }
        } catch (err) {
          // Could not check onboarding status
        }
      }

      // User has completed onboarding, go to home
      onNavigate('home');
    } catch (error: any) {
      // Handle specific error types with helpful messages
      let errorMessage = error.message || t.auth.invalidCredentials;
      
      // Check for CORS errors
      if (error.message?.includes('CORS') || error.message?.includes('Failed to fetch')) {
        errorMessage = t.auth.connectionError;
        console.error('❌ CORS Error Detected');
        console.error('To fix this issue:');
        console.error('1. Go to Supabase Dashboard → Authentication → Settings');
        console.error('2. Find "Site URL" and "Redirect URLs" fields');
        console.error('3. Add to Redirect URLs: https://testing.sarathiapp.co.in/**');
        console.error('4. Set Site URL to: https://testing.sarathiapp.co.in');
        console.error('5. Save and wait a few minutes for changes to propagate');
        console.error('');
        console.error('Note: If you don\'t see these fields, try Project Settings → API or Authentication sections');
      }
      
      // Check for 521 error (Supabase service temporarily unavailable)
      if (error.message?.includes('521') || error.status === 521) {
        errorMessage = t.auth.serviceUnavailable;
        console.error('❌ 521 Error: Supabase service is temporarily unavailable');
        console.error('This usually happens when:');
        console.error('1. The Supabase project was just resumed from pause');
        console.error('2. Services are still initializing (can take 2-5 minutes)');
        console.error('3. Please wait and try again in a few minutes');
      }
      
      // Check for network errors
      if (error.message?.includes('network') || error.message?.includes('NetworkError')) {
        errorMessage = t.auth.networkError;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: unverifiedEmail,
      });

      if (error) {
        toast.error(t.auth.failedToResendVerification);
      } else {
        toast.success(t.auth.verificationEmailResent);
      }
    } catch (error) {
      toast.error(t.auth.failedToResendVerification);
    }
  };

  // Show unverified screen if user's email is not confirmed
  if (showUnverifiedScreen) {
    return (
      <div style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '16px' : '20px',
        position: 'relative',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Unverified Email Warning Card */}
        <div style={{
          width: '100%',
          maxWidth: isMobile ? '100%' : '895px',
          backgroundColor: 'white',
          borderRadius: isMobile ? '20px' : '30px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          minHeight: isMobile ? 'auto' : '600px'
        }}>
          {/* LEFT: Logo Section - Hidden on mobile */}
          {!isMobile && (
            <div style={{
              width: '287px',
              background: 'linear-gradient(180deg, #8AC0AD 0%, #388896 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <img 
                src={sarathiLogo} 
                alt="Sarathi" 
                style={{ width: '100px', height: 'auto' }}
              />
            </div>
          )}

          {/* RIGHT: Warning Message */}
          <div style={{
            flex: 1,
            padding: isMobile ? '32px 24px' : '60px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ width: '100%', maxWidth: '450px', textAlign: 'center' }}>
              {/* Warning Icon */}
              <div style={{
                width: '100px',
                height: '100px',
                margin: '0 auto 24px',
                background: 'linear-gradient(135deg, #FFA500 0%, #FF6B00 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>

              <h1 style={{
                fontSize: '28px',
                fontWeight: 600,
                color: '#192126',
                marginBottom: '16px'
              }}>
                {t.auth.emailNotVerified}
              </h1>

              <p style={{
                fontSize: '15px',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>
                {t.auth.yourEmailNotVerified.replace('{email}', unverifiedEmail)}
                <br /><br />
                {t.auth.checkInboxForVerification}
              </p>

              {/* Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={handleResendVerification}
                  style={{
                    width: '100%',
                    height: '52px',
                    background: '#388896',
                    color: 'white',
                    border: 'none',
                    borderRadius: '26px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {t.auth.resendVerificationEmail}
                </button>

                <button
                  onClick={() => setShowUnverifiedScreen(false)}
                  style={{
                    width: '100%',
                    height: '52px',
                    background: 'transparent',
                    color: '#388896',
                    border: '2px solid #388896',
                    borderRadius: '26px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {t.auth.backToLogin}
                </button>
              </div>

              <p style={{
                fontSize: '13px',
                color: '#979797',
                marginTop: '24px',
                lineHeight: '1.5'
              }}>
                💡 {t.auth.tipCheckSpam}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '16px' : '20px',
      position: 'relative',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>

      {/* Login Card Container */}
      <div style={{
        width: '100%',
        maxWidth: isMobile ? '100%' : '895px',
        backgroundColor: 'white',
        borderRadius: isMobile ? '20px' : '30px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        minHeight: isMobile ? 'auto' : '600px'
      }}>
        
        {/* LEFT: Logo Section - Hidden on mobile */}
        {!isMobile && (
          <div style={{
            width: '287px',
            background: 'linear-gradient(180deg, #8AC0AD 0%, #388896 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <img 
              src={sarathiLogo} 
              alt="Sarathi" 
              style={{ width: '100px', height: 'auto' }}
            />
          </div>
        )}

        {/* RIGHT: Form Section */}
        <div style={{
          flex: 1,
          padding: isMobile ? '32px 24px' : '60px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ width: '100%', maxWidth: isMobile ? '100%' : '380px' }}>
            
            {/* Mobile Logo */}
            {isMobile && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginBottom: '24px' 
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(180deg, #8AC0AD 0%, #388896 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img 
                    src={sarathiLogo} 
                    alt="Sarathi" 
                    style={{ width: '50px', height: 'auto' }}
                  />
                </div>
              </div>
            )}

            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: isMobile ? '24px' : '30px' }}>
              <h1 style={{ 
                fontSize: isMobile ? '24px' : '32px', 
                fontWeight: 500, 
                color: '#192126', 
                marginBottom: '8px' 
              }}>
                {t.auth.login}
              </h1>
              <p style={{ fontSize: isMobile ? '14px' : '16px', color: '#979797' }}>
                {t.auth.loginSubtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>

              {/* Phone - Greyed out/disabled */}
              <div style={{ marginBottom: '16px', opacity: 0.5, pointerEvents: 'none' }}>
                <div style={{
                  display: 'flex',
                  border: '1px solid #d0d0d0',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  height: '52px',
                  backgroundColor: '#f5f5f5'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    borderRight: '1px solid #d0d0d0',
                    background: '#f5f5f5'
                  }}>
                    <span style={{ fontSize: '16px', fontWeight: 500, color: '#999' }}>+91</span>
                  </div>
                  <input
                    type="tel"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    placeholder={t.auth.enterPhoneNumber}
                    disabled
                    style={{
                      flex: 1,
                      padding: '0 16px',
                      border: 'none',
                      outline: 'none',
                      fontSize: '14px',
                      backgroundColor: '#f5f5f5',
                      color: '#999',
                      cursor: 'not-allowed'
                    }}
                  />
                </div>
              </div>

              {/* Email - Always visible */}
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.auth.enterEmail}
                  required
                  style={{
                    width: '100%',
                    height: '52px',
                    padding: '0 16px',
                    border: '1px solid #d0d0d0',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: '16px', position: 'relative' }}>
                <img 
                  src={lockIcon} 
                  alt="" 
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '20px',
                    opacity: 0.6,
                    pointerEvents: 'none'
                  }}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.auth.password}
                  required
                  style={{
                    width: '100%',
                    height: '52px',
                    paddingLeft: '48px',
                    paddingRight: '16px',
                    border: '1px solid #d0d0d0',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                fontSize: '14px'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ width: '16px', height: '16px' }}
                  />
                  <span style={{ color: '#666' }}>{t.auth.rememberMe}</span>
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate('forgot-password')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#8AC0AD',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  {t.auth.forgotPassword}
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  height: '52px',
                  background: '#388896',
                  color: 'white',
                  border: 'none',
                  borderRadius: '26px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginBottom: '24px',
                  opacity: loading ? 0.5 : 1
                }}
              >
                {loading ? t.common.loading : t.auth.loginButton}
              </button>

              {/* Divider */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
                <span style={{ fontSize: '14px', color: '#979797' }}>{t.auth.orLoginWith}</span>
                <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
              </div>

              {/* Social Buttons - Greyed out/disabled */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '24px',
                opacity: 0.4,
                pointerEvents: 'none'
              }}>
                <button type="button" disabled style={{
                  width: '60px',
                  height: '48px',
                  background: '#f5f5f5',
                  border: '1px solid #e0e0e0',
                  borderRadius: '10px',
                  cursor: 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img src={googleIcon} alt="Google" style={{ width: '20px', height: '20px', opacity: 0.6 }} />
                </button>
                <button type="button" disabled style={{
                  width: '60px',
                  height: '48px',
                  background: '#f5f5f5',
                  border: '1px solid #e0e0e0',
                  borderRadius: '10px',
                  cursor: 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img src={facebookIcon} alt="Facebook" style={{ width: '20px', height: '20px', opacity: 0.6 }} />
                </button>
                <button type="button" disabled style={{
                  width: '60px',
                  height: '48px',
                  background: '#f5f5f5',
                  border: '1px solid #e0e0e0',
                  borderRadius: '10px',
                  cursor: 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img src={appleIcon} alt="Apple" style={{ width: '20px', height: '20px', opacity: 0.6 }} />
                </button>
              </div>

              {/* Register Link */}
              <div style={{ textAlign: 'center', fontSize: '14px' }}>
                <span style={{ color: '#979797' }}>
                  {t.auth.dontHaveAccount}
                </span>
                {' '}
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#8AC0AD',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  {t.auth.registerNow}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
