import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';
import backgroundImage from '../assets/images/Background_login.png';
import sarathiLogo from '../assets/svg/sarathi_login.svg';

interface ProfileOnboardingPageProps {
  onNavigate: (page: string) => void;
}

export function ProfileOnboardingPage({ onNavigate }: ProfileOnboardingPageProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Form data
  const [formData, setFormData] = useState({
    userType: '' as UserRole | '',
    prosthesisType: '' as 'above_knee' | 'below_knee' | '',
    lengthUsage: '' as 'less_than_6_month' | 'more_than_1_year' | 'more_than_5_years' | '',
    mainChallenge: [] as string[],
    activities: [] as string[],
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleArrayItem = (field: 'mainChallenge' | 'activities', item: string) => {
    const currentArray = formData[field];
    if (currentArray.includes(item)) {
      handleInputChange(field, currentArray.filter((i) => i !== item));
    } else {
      handleInputChange(field, [...currentArray, item]);
    }
  };

  const handleNext = () => {
    // Validation for each step
    if (currentStep === 1 && !formData.userType) {
      toast.error('Please select your profile type');
      return;
    }
    if (currentStep === 2 && formData.userType === 'amputee' && !formData.prosthesisType) {
      toast.error('Please select your prosthesis type');
      return;
    }
    if (currentStep === 3 && formData.userType === 'amputee' && !formData.lengthUsage) {
      toast.error('Please select how long you have been using a prosthesis');
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please log in first');
      return;
    }

    setLoading(true);

    try {
      const updateData: any = {
        user_type: formData.userType,
      };

      // Only add prosthesis-related fields if user is an amputee
      if (formData.userType === 'amputee') {
        updateData.prosthesis_type = formData.prosthesisType || null;
        updateData.length_usage = formData.lengthUsage || null;
      }

      // Add challenges and activities if they exist
      if (formData.mainChallenge.length > 0) {
        updateData.main_challenge = formData.mainChallenge;
      }
      if (formData.activities.length > 0) {
        updateData.activities = formData.activities;
      }

      const { error } = await supabase
        .from('sarathi_user')
        .update(updateData)
        .eq('uuid', user.id);

      if (error) {
        throw error;
      }

      toast.success('Profile completed successfully!');
      
      // Navigate to home page
      onNavigate('home');
    } catch (error: any) {
      console.error('❌ Error updating profile:', error);
      toast.error(`Failed to complete profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Step 1: User Type Selection
  const renderStep1 = () => {
    const userTypes = [
      { id: 'amputee', label: t.onboarding?.iAmAmputee || 'I am an amputee', icon: '🦿' },
      { id: 'caregiver', label: t.onboarding?.iAmCaregiver || 'I am a caregiver', icon: '👨‍⚕️' },
      { id: 'volunteer', label: t.onboarding?.iAmVolunteer || 'I am a volunteer', icon: '🤝' },
      { id: 'doctor', label: t.onboarding?.iAmDoctor || 'I am a doctor', icon: '⚕️' },
      { id: 'practitioner', label: t.onboarding?.iAmPractitioner || 'I am a practitioner', icon: '🩺' },
    ];

    return (
      <div>
        <h2 style={{
          fontSize: isMobile ? '22px' : '28px',
          fontWeight: 600,
          color: '#192126',
          marginBottom: isMobile ? '8px' : '12px',
          textAlign: 'center'
        }}>
          {t.onboarding?.whoAreYou || 'Who are you?'}
        </h2>
        <p style={{
          fontSize: isMobile ? '13px' : '14px',
          color: '#979797',
          marginBottom: isMobile ? '20px' : '32px',
          textAlign: 'center'
        }}>
          {t.onboarding?.whoAreYouDescription || 'Select the option that best describes you'}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: isMobile ? '10px' : '16px',
          marginBottom: isMobile ? '20px' : '32px'
        }}>
          {userTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => handleInputChange('userType', type.id)}
              style={{
                padding: isMobile ? '14px' : '24px',
                border: `2px solid ${formData.userType === type.id ? '#388896' : '#E8E8E8'}`,
                borderRadius: isMobile ? '12px' : '16px',
                background: formData.userType === type.id ? '#F0F9FF' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: isMobile ? '28px' : '40px', marginBottom: isMobile ? '8px' : '12px' }}>{type.icon}</div>
              <div style={{
                fontSize: isMobile ? '12px' : '16px',
                fontWeight: 500,
                color: '#192126',
                whiteSpace: 'pre-line'
              }}>
                {type.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Step 2: Prosthesis Type (only for amputees)
  const renderStep2 = () => {
    if (formData.userType !== 'amputee') {
      // Skip this step for non-amputees
      return renderStep3();
    }

    const prosthesisTypes = [
      { id: 'above_knee', label: t.onboarding?.aboveKnee || 'Above Knee', icon: '🦿' },
      { id: 'below_knee', label: t.onboarding?.belowKnee || 'Below Knee', icon: '🦴' },
    ];

    return (
      <div>
        <h2 style={{
          fontSize: isMobile ? '22px' : '28px',
          fontWeight: 600,
          color: '#192126',
          marginBottom: isMobile ? '8px' : '12px',
          textAlign: 'center'
        }}>
          {t.onboarding?.prosthesisType || 'Prosthesis Type'}
        </h2>
        <p style={{
          fontSize: isMobile ? '13px' : '14px',
          color: '#979797',
          marginBottom: isMobile ? '20px' : '32px',
          textAlign: 'center'
        }}>
          {t.onboarding?.whatTypeOfProsthesis || 'What type of prosthesis do you use?'}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: isMobile ? '10px' : '16px',
          marginBottom: isMobile ? '20px' : '32px'
        }}>
          {prosthesisTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => handleInputChange('prosthesisType', type.id)}
              style={{
                padding: isMobile ? '16px' : '24px',
                border: `2px solid ${formData.prosthesisType === type.id ? '#388896' : '#E8E8E8'}`,
                borderRadius: isMobile ? '12px' : '16px',
                background: formData.prosthesisType === type.id ? '#F0F9FF' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: isMobile ? '28px' : '40px', marginBottom: isMobile ? '8px' : '12px' }}>{type.icon}</div>
              <div style={{
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: 500,
                color: '#192126'
              }}>
                {type.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Step 3: Length of Usage (only for amputees)
  const renderStep3 = () => {
    if (formData.userType !== 'amputee') {
      // Skip this step for non-amputees
      return renderStep4();
    }

    const lengthOptions = [
      { id: 'less_than_6_month', label: t.onboarding?.lessThan6Months || 'Less than 6 months', icon: '📅' },
      { id: 'more_than_1_year', label: t.onboarding?.moreThan1Year || 'More than 1 year', icon: '📆' },
      { id: 'more_than_5_years', label: t.onboarding?.moreThan5Years || 'More than 5 years', icon: '🗓️' },
    ];

    return (
      <div>
        <h2 style={{
          fontSize: isMobile ? '22px' : '28px',
          fontWeight: 600,
          color: '#192126',
          marginBottom: isMobile ? '8px' : '12px',
          textAlign: 'center'
        }}>
          {t.onboarding?.usageDuration || 'Usage Duration'}
        </h2>
        <p style={{
          fontSize: isMobile ? '13px' : '14px',
          color: '#979797',
          marginBottom: isMobile ? '20px' : '32px',
          textAlign: 'center'
        }}>
          {t.onboarding?.howLongHaveYouBeenUsing || 'How long have you been using a prosthesis?'}
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '12px' : '16px',
          marginBottom: isMobile ? '20px' : '32px'
        }}>
          {lengthOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleInputChange('lengthUsage', option.id)}
              style={{
                padding: isMobile ? '14px' : '20px',
                border: `2px solid ${formData.lengthUsage === option.id ? '#388896' : '#E8E8E8'}`,
                borderRadius: isMobile ? '12px' : '16px',
                background: formData.lengthUsage === option.id ? '#F0F9FF' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '12px' : '16px'
              }}
            >
              <div style={{ fontSize: isMobile ? '24px' : '32px' }}>{option.icon}</div>
              <div style={{
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: 500,
                color: '#192126',
                textAlign: 'left'
              }}>
                {option.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Step 4: Challenges & Activities
  const renderStep4 = () => {
    const challenges = [
      { id: 'fit_comfort', label: t.onboarding?.fitAndComfort || 'Fit & Comfort' },
      { id: 'mobility', label: t.onboarding?.mobility || 'Mobility' },
      { id: 'community', label: t.onboarding?.community || 'Community Support' },
      { id: 'cost_access', label: t.onboarding?.costAndAccess || 'Cost & Access' },
      { id: 'training', label: t.onboarding?.training || 'Training' },
      { id: 'emotional', label: t.onboarding?.emotionalWellbeing || 'Emotional Support' },
    ];

    const activities = [
      { id: 'rehabilitation', label: t.onboarding?.rehabilitation || 'Rehabilitation' },
      { id: 'social_life', label: t.onboarding?.socialLife || 'Social Life' },
      { id: 'emotions', label: t.onboarding?.emotions || 'Emotional Wellbeing' },
      { id: 'pain_relief', label: t.onboarding?.painRelief || 'Pain Relief' },
      { id: 'work', label: t.onboarding?.work || 'Work/Career' },
      { id: 'independence', label: t.onboarding?.independence || 'Independence' },
      { id: 'education', label: t.onboarding?.education || 'Education' },
      { id: 'confidence', label: t.onboarding?.confidence || 'Confidence' },
      { id: 'sports', label: t.onboarding?.sports || 'Sports & Fitness' },
      { id: 'community', label: t.onboarding?.community || 'Community' },
    ];

    return (
      <div>
        <h2 style={{
          fontSize: isMobile ? '20px' : '24px',
          fontWeight: 600,
          color: '#192126',
          marginBottom: isMobile ? '6px' : '8px',
          textAlign: 'center'
        }}>
          {t.onboarding?.challengesAndInterests || 'Your Challenges & Interests'}
        </h2>
        <p style={{
          fontSize: isMobile ? '12px' : '14px',
          color: '#979797',
          marginBottom: isMobile ? '16px' : '24px',
          textAlign: 'center'
        }}>
          {t.onboarding?.selectAllThatApply || 'Select all that apply (optional)'}
        </p>

        {/* Challenges */}
        <div style={{ marginBottom: isMobile ? '16px' : '24px' }}>
          <h3 style={{
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: 600,
            color: '#192126',
            marginBottom: isMobile ? '8px' : '12px'
          }}>
            {t.onboarding?.mainChallenges || 'Main Challenges'}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: isMobile ? '8px' : '12px'
          }}>
            {challenges.map((challenge) => (
              <button
                key={challenge.id}
                type="button"
                onClick={() => handleToggleArrayItem('mainChallenge', challenge.id)}
                style={{
                  padding: isMobile ? '10px' : '12px',
                  border: `2px solid ${formData.mainChallenge.includes(challenge.id) ? '#388896' : '#E8E8E8'}`,
                  borderRadius: isMobile ? '10px' : '12px',
                  background: formData.mainChallenge.includes(challenge.id) ? '#F0F9FF' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: isMobile ? '12px' : '14px',
                  fontWeight: 500,
                  color: '#192126'
                }}
              >
                {challenge.label}
              </button>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div>
          <h3 style={{
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: 600,
            color: '#192126',
            marginBottom: isMobile ? '8px' : '12px'
          }}>
            {t.onboarding?.activitiesAndInterests || 'Activities & Interests'}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: isMobile ? '8px' : '12px'
          }}>
            {activities.map((activity) => (
              <button
                key={activity.id}
                type="button"
                onClick={() => handleToggleArrayItem('activities', activity.id)}
                style={{
                  padding: isMobile ? '10px' : '12px',
                  border: `2px solid ${formData.activities.includes(activity.id) ? '#388896' : '#E8E8E8'}`,
                  borderRadius: isMobile ? '10px' : '12px',
                  background: formData.activities.includes(activity.id) ? '#F0F9FF' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: isMobile ? '12px' : '14px',
                  fontWeight: 500,
                  color: '#192126'
                }}
              >
                {activity.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  // Determine which step to show based on user type
  const getEffectiveStep = () => {
    if (formData.userType !== 'amputee') {
      // For non-amputees, skip steps 2 and 3
      if (currentStep === 2 || currentStep === 3) {
        return 4;
      }
    }
    return currentStep;
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
      {/* Onboarding Card */}
      <div style={{
        width: '100%',
        maxWidth: isMobile ? '400px' : '895px',
        backgroundColor: 'white',
        borderRadius: isMobile ? '20px' : '30px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        minHeight: isMobile ? 'auto' : '600px'
      }}>
        {/* LEFT: Logo Section (Top on mobile) */}
        <div style={{
          width: isMobile ? '100%' : '287px',
          background: 'linear-gradient(180deg, #8AC0AD 0%, #388896 100%)',
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: isMobile ? 'space-between' : 'center',
          flexShrink: 0,
          padding: isMobile ? '20px 24px' : '40px 20px'
        }}>
          <img 
            src={sarathiLogo} 
            alt="Sarathi" 
            style={{ 
              width: isMobile ? '60px' : '100px', 
              height: 'auto', 
              marginBottom: isMobile ? '0' : '32px' 
            }}
          />
          
          {/* Progress Indicator */}
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: isMobile ? '12px' : '14px', marginBottom: '8px' }}>
              {t.common?.step || 'Step'} {currentStep} {t.common?.of || 'of'} 4
            </div>
            <div style={{
              width: isMobile ? '120px' : '200px',
              height: '4px',
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(currentStep / 4) * 100}%`,
                height: '100%',
                background: 'white',
                transition: 'width 0.3s'
              }} />
            </div>
          </div>
        </div>

        {/* RIGHT: Form Section (Below on mobile) */}
        <div style={{
          flex: 1,
          padding: isMobile ? '24px 20px' : '60px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ width: '100%', maxWidth: isMobile ? '100%' : '500px' }}>
            {renderCurrentStep()}

            {/* Navigation Buttons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: isMobile ? '24px' : '32px'
            }}>
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  style={{
                    flex: 1,
                    height: isMobile ? '48px' : '52px',
                    background: 'transparent',
                    color: '#388896',
                    border: '2px solid #388896',
                    borderRadius: '26px',
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {t.common?.back || 'Back'}
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={loading}
                style={{
                  flex: 1,
                  height: isMobile ? '48px' : '52px',
                  background: '#388896',
                  color: 'white',
                  border: 'none',
                  borderRadius: '26px',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  opacity: loading ? 0.5 : 1
                }}
              >
                {loading ? (t.common?.saving || 'Saving...') : currentStep === 4 ? (t.common?.complete || 'Complete') : (t.common?.next || 'Next')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

