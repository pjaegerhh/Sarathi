import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password);
      toast.success(t.auth.loginSuccess);
      onNavigate('home');
    } catch (error: any) {
      toast.error(error.message || t.auth.invalidCredentials);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>

      {/* Login Card Container */}
      <div style={{
        width: '100%',
        maxWidth: '895px',
        backgroundColor: 'white',
        borderRadius: '30px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        minHeight: '600px'
      }}>
        
        {/* LEFT: Logo Section */}
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

        {/* RIGHT: Form Section */}
        <div style={{
          flex: 1,
          padding: '60px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ width: '100%', maxWidth: '380px' }}>
            
            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h1 style={{ 
                fontSize: '32px', 
                fontWeight: 500, 
                color: '#192126', 
                marginBottom: '8px' 
              }}>
                {t.auth.login}
              </h1>
              <p style={{ fontSize: '16px', color: '#979797' }}>
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
                    placeholder="Enter your phone number"
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
                  placeholder="Enter your email"
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
                  placeholder="Password"
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
                  <span style={{ color: '#666' }}>Remember me</span>
                </label>
                <button type="button" style={{
                  background: 'none',
                  border: 'none',
                  color: '#8AC0AD',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  Forgot password ?
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
                {loading ? 'Loading...' : t.auth.loginButton}
              </button>

              {/* Divider */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
                <span style={{ fontSize: '14px', color: '#979797' }}>Or login with</span>
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
