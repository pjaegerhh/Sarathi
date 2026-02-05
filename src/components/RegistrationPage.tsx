import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { UserRole } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';
import backgroundImage from '../assets/images/Background_login.png';
import sarathiLogo from '../assets/svg/sarathi_login.svg';

interface RegistrationPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function RegistrationPage({ onNavigate }: RegistrationPageProps) {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password match state
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Form data
  const [formData, setFormData] = useState({
    // Step 1: Credentials
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    telephone: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Personal Info (if needed)
    
    // Step 3: User Type
    userType: '' as UserRole | '',
    
    // Step 4: Prosthesis Info
    prosthesisType: '' as 'above_knee' | 'below_knee' | '',
    lengthUsage: '' as 'less_than_6_month' | 'more_than_1_year' | 'more_than_5_years' | '',
    
    // Step 5: Challenges & Activities
    mainChallenge: [] as string[],
    activities: [] as string[],
  });

  // Loading state
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Check password match in real-time
  useEffect(() => {
    if (formData.confirmPassword === '') {
      setPasswordsMatch(null);
    } else if (formData.password === formData.confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [formData.password, formData.confirmPassword]);

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('sarathi_user')
        .select('uuid')
        .eq('email', email)
        .maybeSingle();
      
      if (error) {
        console.error('Error checking email:', error);
        return false; // If we can't check, allow registration to proceed
      }
      
      return !!data;
    } catch (error) {
      console.error('Exception checking email:', error);
      return false; // If we can't check, allow registration to proceed
    }
  };

  const checkPhoneExists = async (phone: string): Promise<boolean> => {
    if (!phone) return false;
    try {
      const { data, error } = await supabase
        .from('sarathi_user')
        .select('uuid')
        .eq('telephone', phone)
        .maybeSingle();
      
      if (error) {
        console.error('Error checking phone:', error);
        return false; // If we can't check, allow registration to proceed
      }
      
      return !!data;
    } catch (error) {
      console.error('Exception checking phone:', error);
      return false; // If we can't check, allow registration to proceed
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation checks
    if (!passwordsMatch) {
      toast.error(t.registration.passwordsDoNotMatch);
      return;
    }

    if (formData.password.length < 6) {
      toast.error(t.registration.passwordMinLength);
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error(t.registration.fillAllFields);
      return;
    }

    setLoading(true);
    
    try {
      // Check if email already exists
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        toast.error(t.registration.emailAlreadyRegistered);
        setLoading(false);
        return;
      }

      // Check if phone already exists
      if (formData.telephone) {
        const phoneExists = await checkPhoneExists(formData.telephone);
        if (phoneExists) {
          toast.error(t.registration.phoneAlreadyRegistered);
          setLoading(false);
          return;
        }
      }

      // Create user with Supabase Auth - WITH EMAIL CONFIRMATION REQUIRED
      // Use window.location.origin to get the current domain (works for localhost and production)
      const redirectUrl = `${window.location.origin}/profile-verified`;
      
      const { data: authData, error: signupError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            full_name: `${formData.firstName} ${formData.lastName}`.trim(),
            telephone: formData.telephone,
            date_of_birth: formData.dateOfBirth,
          }
        }
      });

      if (signupError) {
        throw signupError;
      }

      if (!authData.user) {
        throw new Error(t.registration.failedToCreateUser);
      }
      
      // Wait a moment for the trigger to create the user profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the user profile with additional data that might not be in the trigger
      try {
        const { error: updateError } = await supabase
          .from('sarathi_user')
          .update({
            first_name: formData.firstName,
            name: formData.lastName, // name should be last name only
            telephone: formData.telephone || null,
            date_of_birth: formData.dateOfBirth || null,
          })
          .eq('uuid', authData.user.id);

        if (updateError) {
          console.warn('⚠️ Could not update additional profile data:', updateError);
        }
      } catch (error) {
        console.warn('⚠️ Exception updating profile data:', error);
      }

      // Show success screen - user will verify email before proceeding
      setShowSuccessScreen(true);
      
      toast.success(t.registration.accountCreatedSuccess);
      
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || t.registration.registrationFailed);
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
      padding: isMobile ? '16px' : '20px',
      position: 'relative',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>

      {/* Registration Card Container */}
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

        {/* RIGHT: Form or Success Section */}
        {showSuccessScreen ? (
          // Success Screen
          <div style={{
            flex: 1,
            padding: isMobile ? '32px 24px' : '60px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ 
              width: '100%', 
              maxWidth: isMobile ? '100%' : '450px',
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: isMobile ? '24px 16px' : '48px',
              textAlign: 'center',
              boxShadow: isMobile ? 'none' : '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              {/* Success Icon with Animation */}
              <div style={{
                width: '120px',
                height: '120px',
                margin: '0 auto 32px',
                background: 'linear-gradient(135deg, #8AC0AD 0%, #388896 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                {/* Decorative dots */}
                <div style={{ position: 'absolute', top: '-10px', right: '20px', width: '8px', height: '8px', borderRadius: '50%', background: '#8AC0AD' }} />
                <div style={{ position: 'absolute', top: '10px', right: '-10px', width: '6px', height: '6px', borderRadius: '50%', background: '#8AC0AD' }} />
                <div style={{ position: 'absolute', bottom: '20px', right: '-5px', width: '10px', height: '10px', borderRadius: '50%', background: '#8AC0AD' }} />
                <div style={{ position: 'absolute', top: '30px', left: '-8px', width: '7px', height: '7px', borderRadius: '50%', background: '#8AC0AD' }} />
                <div style={{ position: 'absolute', bottom: '-8px', left: '25px', width: '9px', height: '9px', borderRadius: '50%', background: '#8AC0AD' }} />
                
                {/* User Icon */}
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>

              <h1 style={{
                fontSize: '28px',
                fontWeight: 600,
                color: '#192126',
                marginBottom: '16px'
              }}>
                {t.registration.checkYourEmail}
              </h1>

              <p style={{
                fontSize: '15px',
                color: '#979797',
                lineHeight: '1.6',
                marginBottom: '32px'
              }}>
                {t.registration.verificationEmailSentPrefix}
                <strong>{formData.email}</strong>
                {t.registration.verificationEmailSentSuffix}
              </p>

              <button
                onClick={() => onNavigate('auth')}
                style={{
                  width: '100%',
                  maxWidth: '200px',
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
                {t.registration.goToLogin}
              </button>

              <p style={{
                fontSize: '13px',
                color: '#979797',
                marginTop: '24px',
                lineHeight: '1.5'
              }}>
                {t.registration.afterVerifyingEmailToComplete}
              </p>
            </div>
          </div>
        ) : (
          // Registration Form
          <div style={{
          flex: 1,
          padding: isMobile ? '32px 24px' : '60px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ width: '100%', maxWidth: isMobile ? '100%' : '380px', position: isMobile ? 'relative' : undefined }}>
            
            {/* Mobile: Back chevron */}
            {isMobile && (
              <button
                type="button"
                onClick={() => onNavigate('auth')}
                aria-label="Back"
                style={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  padding: 0,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#192126',
                }}
              >
                <ChevronLeft size={28} strokeWidth={2} />
              </button>
            )}

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
            <div style={{ marginBottom: isMobile ? '24px' : '32px', textAlign: 'center' }}>
              <h1 style={{ 
                fontSize: isMobile ? '24px' : '32px', 
                fontWeight: 500, 
                color: '#192126', 
                marginBottom: '8px' 
              }}>
                Register
              </h1>
              <p style={{ fontSize: '14px', color: '#979797' }}>
                {t.registration.title}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              
              {/* First Name */}
              <div style={{ marginBottom: '16px', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#8AC0AD'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder={t.registration.firstName}
                  required
                  style={{
                    width: '100%',
                    height: '52px',
                    padding: '0 16px 0 48px',
                    border: '1px solid #E8E8E8',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: '#FAFAFA'
                  }}
                />
              </div>

              {/* Last Name */}
              <div style={{ marginBottom: '16px', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#8AC0AD'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder={t.registration.lastName}
                  required
                  style={{
                    width: '100%',
                    height: '52px',
                    padding: '0 16px 0 48px',
                    border: '1px solid #E8E8E8',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: '#FAFAFA'
                  }}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: '16px', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#8AC0AD'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
                    <polyline points="3,7 12,13 21,7"></polyline>
                  </svg>
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={t.registration.emailAddress}
                  required
                  style={{
                    width: '100%',
                    height: '52px',
                    padding: '0 16px 0 48px',
                    border: '1px solid #E8E8E8',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: '#FAFAFA'
                  }}
                />
              </div>

              {/* Date of Birth */}
              <div style={{ marginBottom: '16px', position: 'relative' }}>
                <div 
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#8AC0AD',
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                  onClick={() => {
                    const input = document.getElementById('dateOfBirthInput') as HTMLInputElement;
                    if (input) input.showPicker?.();
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <input
                  id="dateOfBirthInput"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  placeholder={t.registration.enterDateOfBirth}
                  style={{
                    width: '100%',
                    height: '52px',
                    padding: '0 16px 0 48px',
                    border: '1px solid #E8E8E8',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: '#FAFAFA',
                    colorScheme: 'light'
                  }}
                />
              </div>

              {/* Phone Number */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  display: 'flex',
                  border: '1px solid #E8E8E8',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  height: '52px',
                  backgroundColor: '#FAFAFA'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    borderRight: '1px solid #E8E8E8',
                    background: '#FAFAFA'
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#192126' }}>+91</span>
                  </div>
                  <input
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => handleInputChange('telephone', e.target.value)}
                    placeholder={t.registration.phoneNumber}
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      padding: '0 16px',
                      fontSize: '14px',
                      backgroundColor: '#FAFAFA'
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: '16px', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#8AC0AD'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder={t.auth.placeholderPassword}
                  required
                  autoComplete="new-password"
                  onPaste={(e) => e.stopPropagation()}
                  onCopy={(e) => e.stopPropagation()}
                  style={{
                    width: '100%',
                    height: '52px',
                    padding: '0 48px 0 48px',
                    border: '1px solid #E8E8E8',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: '#FAFAFA'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    color: '#979797'
                  }}
                >
                  {showPassword ? (
                    // Eye icon (visible)
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    // Eye-off icon (hidden)
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </button>
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: '8px', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#8AC0AD'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder={t.auth.placeholderPassword}
                  required
                  autoComplete="new-password"
                  onPaste={(e) => e.stopPropagation()}
                  onCopy={(e) => e.stopPropagation()}
                  style={{
                    width: '100%',
                    height: '52px',
                    padding: '0 48px 0 48px',
                    border: `1px solid ${passwordsMatch === false ? '#EF4444' : passwordsMatch === true ? '#10B981' : '#E8E8E8'}`,
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: '#FAFAFA'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    color: '#979797'
                  }}
                >
                  {showConfirmPassword ? (
                    // Eye icon (visible)
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    // Eye-off icon (hidden)
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </button>
              </div>

              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div style={{ 
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: passwordsMatch ? '#10B981' : '#EF4444'
                }}>
                  {passwordsMatch ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Passwords match</span>
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <span>Passwords do not match</span>
                    </>
                  )}
                </div>
              )}

              {/* Create Account Button */}
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
                {loading ? t.common.loading : t.registration.createAccount}
              </button>

              {/* Login Link */}
              <div style={{ textAlign: 'center', fontSize: '14px', marginBottom: '16px' }}>
                <span style={{ color: '#979797' }}>
                  {t.registration.alreadyHaveAccount}
                </span>
                {' '}
                <button
                  type="button"
                  onClick={() => onNavigate('auth')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#8AC0AD',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  {t.registration.loginHere}
                </button>
              </div>

              {/* Terms */}
              <div style={{ 
                textAlign: 'center', 
                fontSize: '12px', 
                color: '#979797',
                lineHeight: '1.5'
              }}>
                By continuing , you agree to our{' '}
                <span style={{ color: '#8AC0AD' }}>Terms of service</span>
                {' '}and{' '}
                <span style={{ color: '#8AC0AD' }}>Privacy Policy</span>
              </div>

            </form>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
