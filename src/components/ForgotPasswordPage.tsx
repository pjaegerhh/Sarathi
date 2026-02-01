import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import backgroundImage from '../assets/images/Background_login.png';
import sarathiLogo from '../assets/svg/sarathi_login.svg';

const CODE_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

interface ForgotPasswordPageProps {
  onNavigate: (page: string) => void;
}

function maskEmail(email: string): string {
  const at = email.indexOf('@');
  if (at <= 0) return email;
  const local = email.slice(0, at);
  const domain = email.slice(at);
  if (local.length <= 2) return local[0] + '***' + domain;
  return local.slice(0, 2) + '***' + domain;
}

const MIN_PASSWORD_LENGTH = 6;
const TEST_USER_EMAIL = 'peter@compusys.cc';

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const { t } = useLanguage();
  const { sendPasswordResetCode, verifyPasswordResetCode, updatePassword } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetCode(email);
      toast.success(t.auth.codeSent);
      setStep(2);
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
      setCode(Array(CODE_LENGTH).fill(''));
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (error: any) {
      const message =
        error?.message === 'RATE_LIMIT_OTP' ? t.auth.rateLimitOtp : error?.message || t.common.error;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = useCallback(async () => {
    if (resendCooldown > 0) return;
    setLoading(true);
    try {
      await sendPasswordResetCode(email);
      toast.success(t.auth.codeSent);
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (error: any) {
      const message =
        error?.message === 'RATE_LIMIT_OTP' ? t.auth.rateLimitOtp : error?.message || t.common.error;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [email, resendCooldown, sendPasswordResetCode, t.auth.codeSent, t.auth.rateLimitOtp, t.common.error]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, CODE_LENGTH).split('');
      const newCode = [...code];
      digits.forEach((d, i) => {
        if (index + i < CODE_LENGTH) newCode[index + i] = d;
      });
      setCode(newCode);
      const next = Math.min(index + digits.length, CODE_LENGTH - 1);
      inputRefs.current[next]?.focus();
      return;
    }
    const digit = value.replace(/\D/g, '');
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    if (digit && index < CODE_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = code.join('');
    if (token.length !== CODE_LENGTH) {
      toast.error(t.auth.invalidCode);
      return;
    }
    setLoading(true);
    try {
      await verifyPasswordResetCode(email, token);
      setStep(3);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast.error(error.message || t.auth.invalidCode);
    } finally {
      setLoading(false);
    }
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      toast.error(t.registration.passwordMinLength);
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(t.registration.passwordsDoNotMatch);
      return;
    }
    setLoading(true);
    try {
      await updatePassword(newPassword);
      toast.success(t.auth.passwordUpdated);
      if (email.toLowerCase() === TEST_USER_EMAIL.toLowerCase()) {
        onNavigate('onboarding-flow');
      } else {
        onNavigate('home');
      }
    } catch (error: any) {
      const message =
        error?.message === 'PASSWORD_SAME_AS_OLD' ? t.auth.passwordSameAsOld : error?.message || t.common.error;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const codeValue = code.join('');
  const canVerify = codeValue.length === CODE_LENGTH;

  const cardLayout = {
    minHeight: isMobile ? '100dvh' : '100vh',
    width: '100%',
    maxWidth: '100vw',
    boxSizing: 'border-box' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isMobile ? '16px 16px 24px' : '20px',
    paddingLeft: isMobile ? 'max(16px, env(safe-area-inset-left))' : undefined,
    paddingRight: isMobile ? 'max(16px, env(safe-area-inset-right))' : undefined,
    paddingBottom: isMobile ? 'max(24px, env(safe-area-inset-bottom))' : undefined,
    position: 'relative' as const,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    overflowX: 'hidden' as const,
    overflowY: 'auto' as const,
  };

  const cardBox = {
    width: '100%',
    maxWidth: isMobile ? '100%' : 895,
    backgroundColor: 'white',
    borderRadius: (isMobile ? 20 : 30) as number,
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    overflow: 'hidden' as const,
    display: 'flex',
    flexDirection: (isMobile ? 'column' : 'row') as const,
    minHeight: isMobile ? undefined : 600,
    flexShrink: 0,
    boxSizing: 'border-box' as const,
  };

  const leftPanel = {
    width: 287,
    background: 'linear-gradient(180deg, #8AC0AD 0%, #388896 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const rightPanel = {
    flex: 1,
    padding: (isMobile ? '24px 20px 32px' : '60px 40px') as string,
    paddingLeft: isMobile ? 'max(20px, env(safe-area-inset-left))' : undefined,
    paddingRight: isMobile ? 'max(20px, env(safe-area-inset-right))' : undefined,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
    boxSizing: 'border-box' as const,
  };

  const formMaxWidth = { width: '100%', maxWidth: isMobile ? '100%' : 380, boxSizing: 'border-box' as const };

  return (
    <div style={cardLayout}>
      <div style={cardBox}>
        {!isMobile && (
          <div style={leftPanel}>
            <img src={sarathiLogo} alt="Sarathi" style={{ width: '100px', height: 'auto' }} />
          </div>
        )}

        <div style={rightPanel}>
          <div style={formMaxWidth}>
            {isMobile && (
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(180deg, #8AC0AD 0%, #388896 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img src={sarathiLogo} alt="Sarathi" style={{ width: 50, height: 'auto' }} />
                </div>
              </div>
            )}

            {step === 1 && (
              <>
                <div style={{ textAlign: 'center', marginBottom: isMobile ? 24 : 30 }}>
                  <h1
                    style={{
                      fontSize: isMobile ? 24 : 32,
                      fontWeight: 500,
                      color: '#192126',
                      marginBottom: 8,
                    }}
                  >
                    {t.auth.resetPasswordTitle}
                  </h1>
                  <p style={{ fontSize: isMobile ? 14 : 16, color: '#979797' }}>
                    {t.auth.resetPasswordSubtitle}
                  </p>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#192126',
                      marginBottom: 8,
                    }}
                  >
                    {t.auth.resetByEmail}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.auth.enterEmail}
                    required
                    style={{
                      width: '100%',
                      height: 52,
                      padding: '0 16px',
                      border: '1px solid #d0d0d0',
                      borderRadius: 10,
                      fontSize: isMobile ? 16 : 14,
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: 24, opacity: 0.5, pointerEvents: 'none' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#999',
                      marginBottom: 8,
                    }}
                  >
                    {t.auth.resetByPhone}{' '}
                    <span style={{ fontSize: 12, color: '#999' }}>
                      ({t.auth.resetByPhoneComingSoon})
                    </span>
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      border: '1px solid #d0d0d0',
                      borderRadius: 10,
                      overflow: 'hidden',
                      height: 52,
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 16px',
                        borderRight: '1px solid #d0d0d0',
                        background: '#f5f5f5',
                      }}
                    >
                      <span style={{ fontSize: 16, fontWeight: 500, color: '#999' }}>+91</span>
                    </div>
                    <input
                      type="tel"
                      disabled
                      placeholder={t.auth.enterPhoneNumber}
                      style={{
                        flex: 1,
                        padding: '0 16px',
                        border: 'none',
                        outline: 'none',
                        fontSize: 14,
                        backgroundColor: '#f5f5f5',
                        color: '#999',
                        cursor: 'not-allowed',
                      }}
                    />
                  </div>
                </div>

                <form onSubmit={handleSendCode} style={{ width: '100%' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      height: 52,
                      background: '#388896',
                      color: 'white',
                      border: 'none',
                      borderRadius: 26,
                      fontSize: 16,
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      marginBottom: 24,
                      opacity: loading ? 0.5 : 1,
                    }}
                  >
                    {loading ? t.common.loading : t.auth.sendCode}
                  </button>
                </form>
              </>
            )}

            {step === 2 && (
              <>
                <div style={{ textAlign: 'center', marginBottom: isMobile ? 24 : 30 }}>
                  <h1
                    style={{
                      fontSize: isMobile ? 24 : 32,
                      fontWeight: 500,
                      color: '#192126',
                      marginBottom: 8,
                    }}
                  >
                    {t.auth.enterVerificationCode}
                  </h1>
                  <p style={{ fontSize: isMobile ? 14 : 16, color: '#979797' }}>
                    {t.auth.codeSentToEmail.replace('{email}', maskEmail(email))}
                  </p>
                </div>

                <form onSubmit={handleVerify} style={{ width: '100%' }}>
                  <div
                    style={{
                      display: 'flex',
                      gap: isMobile ? 6 : 8,
                      justifyContent: 'center',
                      marginBottom: 24,
                      width: '100%',
                      minWidth: 0,
                    }}
                  >
                    {code.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { inputRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={digit}
                        onChange={(e) => handleCodeChange(i, e.target.value)}
                        onKeyDown={(e) => handleCodeKeyDown(i, e)}
                        style={{
                          flex: isMobile ? '1 1 0' : undefined,
                          width: isMobile ? undefined : 44,
                          minWidth: isMobile ? 36 : 44,
                          maxWidth: isMobile ? 52 : 44,
                          height: 52,
                          border: '1px solid #d0d0d0',
                          borderRadius: 10,
                          fontSize: isMobile ? 18 : 20,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !canVerify}
                    style={{
                      width: '100%',
                      height: 52,
                      background: canVerify ? '#388896' : '#ccc',
                      color: 'white',
                      border: 'none',
                      borderRadius: 26,
                      fontSize: 16,
                      fontWeight: 'bold',
                      cursor: canVerify && !loading ? 'pointer' : 'not-allowed',
                      marginBottom: 16,
                      opacity: loading ? 0.5 : 1,
                    }}
                  >
                    {loading ? t.common.loading : t.auth.verifyCode}
                  </button>
                </form>

                <div
                  style={{
                    textAlign: 'center',
                    marginBottom: 24,
                    fontSize: 14,
                    color: '#979797',
                  }}
                >
                  {resendCooldown > 0 ? (
                    <span>
                      {t.auth.resendCodeIn.replace('{seconds}', String(resendCooldown))}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={loading}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#8AC0AD',
                        cursor: 'pointer',
                        fontSize: 14,
                        fontWeight: 500,
                        minHeight: 44,
                        padding: '12px 16px',
                      }}
                    >
                      {t.auth.resendCode}
                    </button>
                  )}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div style={{ textAlign: 'center', marginBottom: isMobile ? 24 : 30 }}>
                  <h1
                    style={{
                      fontSize: isMobile ? 24 : 32,
                      fontWeight: 500,
                      color: '#192126',
                      marginBottom: 8,
                    }}
                  >
                    {t.auth.setNewPasswordTitle}
                  </h1>
                  <p style={{ fontSize: isMobile ? 14 : 16, color: '#979797' }}>
                    {t.auth.setNewPasswordSubtitle}
                  </p>
                </div>

                <form onSubmit={handleSetPassword} style={{ width: '100%' }}>
                  {/* New password */}
                  <div style={{ marginBottom: 16, position: 'relative' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#192126',
                        marginBottom: 8,
                      }}
                    >
                      {t.profile.newPassword}
                    </label>
                    <div
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #d0d0d0',
                        borderRadius: 10,
                        height: 52,
                        backgroundColor: '#fff',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          left: 16,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          display: 'flex',
                          alignItems: 'center',
                          color: '#979797',
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder={t.auth.placeholderPassword}
                        required
                        minLength={MIN_PASSWORD_LENGTH}
                        autoComplete="new-password"
                        style={{
                          flex: 1,
                          height: '100%',
                          padding: '0 48px 0 48px',
                          border: 'none',
                          borderRadius: 10,
                          fontSize: isMobile ? 16 : 14,
                          outline: 'none',
                          backgroundColor: 'transparent',
                          boxSizing: 'border-box',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        aria-label={showNewPassword ? t.auth.hidePassword : t.auth.showPassword}
                        title={showNewPassword ? t.auth.hidePassword : t.auth.showPassword}
                        style={{
                          position: 'absolute',
                          right: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 12,
                          minWidth: 44,
                          minHeight: 44,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#979797',
                        }}
                      >
                        {showNewPassword ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm password */}
                  <div style={{ marginBottom: 24, position: 'relative' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#192126',
                        marginBottom: 8,
                      }}
                    >
                      {t.auth.confirmPassword}
                    </label>
                    <div
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #d0d0d0',
                        borderRadius: 10,
                        height: 52,
                        backgroundColor: '#fff',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          left: 16,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          display: 'flex',
                          alignItems: 'center',
                          color: '#979797',
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={t.auth.placeholderPassword}
                        required
                        minLength={MIN_PASSWORD_LENGTH}
                        autoComplete="new-password"
                        style={{
                          flex: 1,
                          height: '100%',
                          padding: '0 48px 0 48px',
                          border: 'none',
                          borderRadius: 10,
                          fontSize: isMobile ? 16 : 14,
                          outline: 'none',
                          backgroundColor: 'transparent',
                          boxSizing: 'border-box',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? t.auth.hidePassword : t.auth.showPassword}
                        title={showConfirmPassword ? t.auth.hidePassword : t.auth.showPassword}
                        style={{
                          position: 'absolute',
                          right: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 12,
                          minWidth: 44,
                          minHeight: 44,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#979797',
                        }}
                      >
                        {showConfirmPassword ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !newPassword || !confirmPassword || newPassword.length < MIN_PASSWORD_LENGTH}
                    style={{
                      width: '100%',
                      height: 52,
                      background:
                        newPassword && confirmPassword && newPassword.length >= MIN_PASSWORD_LENGTH
                          ? '#388896'
                          : '#ccc',
                      color: 'white',
                      border: 'none',
                      borderRadius: 26,
                      fontSize: 16,
                      fontWeight: 'bold',
                      cursor:
                        newPassword && confirmPassword && newPassword.length >= MIN_PASSWORD_LENGTH && !loading
                          ? 'pointer'
                          : 'not-allowed',
                      marginBottom: 24,
                      opacity: loading ? 0.5 : 1,
                    }}
                  >
                    {loading ? t.common.loading : t.auth.setPasswordButton}
                  </button>
                </form>
              </>
            )}

                <div style={{ textAlign: 'center', fontSize: 14 }}>
              <button
                type="button"
                onClick={() => onNavigate('auth')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#8AC0AD',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  minHeight: 44,
                  padding: '12px 16px',
                }}
              >
                {t.auth.backToLogin}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
