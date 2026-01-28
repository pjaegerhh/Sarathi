import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';
import backgroundImage from '../assets/images/Background_login.png';
import screen1Image from '../assets/images/onboarding_screen1.png';
import screen2Image from '../assets/images/onboarding-2.png';
import screen3Image from '../assets/images/onboarding-3.png';
import screen4Image from '../assets/images/onboarding-4.png';
import screen5Image from '../assets/images/onboarding-5.png';
import ageScreenImage from '../assets/images/onboarding_age_screen.png';
import ageIcon from '../assets/svg/age-icon.svg';
import readyIcon from '../assets/svg/onboarding-6-icon.svg';
import fitComfortIcon from '../assets/svg/fit_comfort.svg';
import mobilityIcon from '../assets/svg/mobility.svg';
import communityIcon from '../assets/svg/age-icon.svg';
import costAccessIcon from '../assets/svg/cost_access.svg';
import trainingIcon from '../assets/svg/training.svg';
import emotionalIcon from '../assets/svg/emotional.svg';
import medicalIcon from '../assets/svg/medical.svg';
import rehabIcon from '../assets/svg/rehab.svg';
import sociallifeIcon from '../assets/svg/sociallife.svg';
import emotionsIcon from '../assets/svg/emotions.svg';
import painreliefIcon from '../assets/svg/painrelief.svg';
import workIcon from '../assets/svg/work.svg';
import independenceIcon from '../assets/svg/independence.svg';
import educationIcon from '../assets/svg/education.svg';
import confidenceIcon from '../assets/svg/confidence.svg';
import trainingFocusIcon from '../assets/svg/training_focus.svg';
import sportsIcon from '../assets/svg/sports.svg';
import guidanceIcon from '../assets/svg/guidance.svg';
import communityActivityIcon from '../assets/svg/community.svg';
import maintenanceIcon from '../assets/svg/maintenance.svg';
import aboveKneeIcon from '../assets/svg/aboveknee_icon.svg';
import belowKneeIcon from '../assets/svg/belowknee_icon.svg';

interface OnboardingFlowPageProps {
  onNavigate: (page: string) => void;
}

// The combined onboarding flow:
// Step 1: Tutorial screen 1 (Welcome)
// Step 2: Age selection (get_design_context)
// Step 3: Tutorial screen 2
// Step 4: Tutorial screen 3
// Step 5: Tutorial screen 4
// Step 6: Tutorial screen 5
// Step 7: User type selection
// Step 8: Prosthesis type (for amputees only)
// Step 9: Length usage (for amputees only)
// Step 10: Challenges & Activities
// Step 11: "You are Ready!"

export function OnboardingFlowPage({ onNavigate }: OnboardingFlowPageProps) {
  const { t } = useLanguage();
  const { user, updateProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [hoverClose, setHoverClose] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    ageInput: '', // Direct age input from user
    userType: '' as UserRole | '',
    prosthesisType: '' as 'above_knee' | 'below_knee' | '',
    lengthUsage: '' as 'less_than_6_month' | 'more_than_1_year' | 'more_than_5_years' | '',
    mainChallenge: [] as string[],
    activities: [] as string[],
  });

  // Load existing user data when component mounts
  useEffect(() => {
    const loadUserData = async () => {
      if (!user || dataLoaded) return;

      try {
        const { data: userData, error } = await supabase
          .from('sarathi_user')
          .select('age, user_type, prosthesis_type, length_usage, main_challenge, activities')
          .eq('uuid', user.id)
          .single();

        if (error) {
          console.error('Error loading user data:', error);
          return;
        }

        if (userData) {
          setFormData({
            ageInput: userData.age ? userData.age.toString() : '',
            userType: userData.user_type || '',
            prosthesisType: userData.prosthesis_type || '',
            lengthUsage: userData.length_usage || '',
            mainChallenge: userData.main_challenge || [],
            activities: userData.activities || [],
          });
          setDataLoaded(true);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, [user, dataLoaded]);

  // Calculate total steps based on user type
  const getTotalSteps = () => {
    if (formData.userType === 'amputee') {
      return 12; // All steps including prosthesis info
    }
    return 8; // Non-amputees: 7 intro pages + 1 final page (skip 8,9,10,11)
  };

  // Get age from input - returns 0 for empty/negative values
  const getAgeFromInput = (): number => {
    const age = parseInt(formData.ageInput, 10);
    if (isNaN(age) || age < 0) {
      return 0;
    }
    return age;
  };

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

  const handleClose = () => {
    onNavigate('home');
  };

  const handleNext = () => {
    // Validation for specific steps
    if (currentStep === 2) {
      const age = getAgeFromInput();
      // If invalid age, set to 0 and continue
      if (age <= 0 || age > 120) {
        handleInputChange('ageInput', '0');
      }
    }
    if (currentStep === 7 && !formData.userType) {
      toast.error(t.onboarding.pleaseSelectProfileType);
      return;
    }
    if (currentStep === 8 && formData.userType === 'amputee' && !formData.prosthesisType) {
      toast.error(t.onboarding.pleaseSelectProsthesisType);
      return;
    }
    if (currentStep === 9 && formData.userType === 'amputee' && !formData.lengthUsage) {
      toast.error(t.onboarding.pleaseSelectLengthUsage);
      return;
    }

    const totalSteps = getTotalSteps();
    
    // Handle step navigation with skipping for non-amputees
    if (currentStep === 7 && formData.userType !== 'amputee') {
      // Skip to step 12 (final page) for non-amputees
      setCurrentStep(12);
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
    
    // Final step - submit (step 12 is always the final screen)
    if (currentStep === 12) {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    // Handle back navigation with skipping for non-amputees
    if (currentStep === 12 && formData.userType !== 'amputee') {
      // Go back to step 7 for non-amputees
      setCurrentStep(7);
    } else if (currentStep === 10 && formData.userType !== 'amputee') {
      // Go back to step 7 for non-amputees (shouldn't happen now, but keeping for safety)
      setCurrentStep(7);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error(t.onboarding.pleaseLoginFirst);
      return;
    }

    setLoading(true);

    try {
      const updateData: any = {
        age: getAgeFromInput(),
        user_type: formData.userType,
        onboarding_completed: true,
      };

      // Only add prosthesis-related fields if user is an amputee
      if (formData.userType === 'amputee') {
        updateData.prosthesis_type = formData.prosthesisType || null;
        updateData.length_usage = formData.lengthUsage || null;
        updateData.main_challenge = formData.mainChallenge;
        updateData.activities = formData.activities;
      } else {
        // Set to null for non-amputees
        updateData.prosthesis_type = null;
        updateData.length_usage = null;
        updateData.main_challenge = null;
        updateData.activities = null;
      }

      // Use updateProfile to automatically refresh user context
      await updateProfile(updateData);

      toast.success(t.onboarding.profileCompletedSuccess);
      
      // Navigate to home page
      onNavigate('home');
    } catch (error: any) {
      console.error('❌ Error saving onboarding data:', error);
      toast.error(`Failed to complete profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle dot click to navigate to specific step
  const handleDotClick = (stepIndex: number) => {
    const targetStep = stepIndex + 1;
    // Allow navigation to any previous step or next step
    if (targetStep <= getTotalSteps()) {
      setCurrentStep(targetStep);
    }
  };

  // Render dot indicators (clickable)
  const renderDotIndicators = (overBackground: boolean = false) => {
    const totalSteps = getTotalSteps();
    // For non-amputees on step 12, show it as step 8
    const displayStep = (formData.userType !== 'amputee' && currentStep === 12) ? 8 : currentStep;
    
    return (
      <div style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 20,
        pointerEvents: 'auto',
      }}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            style={{
              width: index + 1 === displayStep ? '32px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: index + 1 === displayStep 
                ? '#388896' 
                : overBackground ? 'rgba(255, 255, 255, 0.5)' : 'rgba(56, 136, 150, 0.3)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              pointerEvents: 'auto',
            }}
          />
        ))}
      </div>
    );
  };

  // Render close button
  const renderCloseButton = () => (
    <div 
      style={{
        width: '48px',
        height: '48px',
        backgroundColor: hoverClose ? '#388896' : '#F2F2F7',
        borderRadius: '50px',
        boxShadow: '0px 0px 10px 0px #dddddd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        zIndex: 20,
        pointerEvents: 'auto',
        transition: 'all 0.3s ease',
      }}
      onClick={handleClose}
      onMouseEnter={() => setHoverClose(true)}
      onMouseLeave={() => setHoverClose(false)}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ pointerEvents: 'none' }}>
        <path 
          d="M18 6L6 18M6 6L18 18" 
          stroke={hoverClose ? '#F2F2F7' : '#388896'} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  // Render navigation chevrons
  const renderNavChevrons = (showPrev: boolean, showNext: boolean) => (
    <div style={{
      position: 'absolute',
      bottom: '26px',
      left: '26px',
      right: '26px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 30,
      pointerEvents: 'none',
    }}>
      {/* Previous Chevron */}
      {showPrev ? (
        <button
          onClick={handlePrevious}
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: hoverPrev ? '#388896' : '#F2F2F7',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            pointerEvents: 'auto',
          }}
          onMouseEnter={() => setHoverPrev(true)}
          onMouseLeave={() => setHoverPrev(false)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ pointerEvents: 'none' }}>
            <path 
              d="M15 18L9 12L15 6" 
              stroke={hoverPrev ? 'white' : '#388896'} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : (
        <div style={{ width: '48px' }} />
      )}

      {/* Next Chevron */}
      {showNext ? (
        <button
          onClick={handleNext}
          disabled={loading}
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: hoverNext && !loading ? '#388896' : '#F2F2F7',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            opacity: loading ? 0.5 : 1,
            pointerEvents: 'auto',
          }}
          onMouseEnter={() => !loading && setHoverNext(true)}
          onMouseLeave={() => setHoverNext(false)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ pointerEvents: 'none' }}>
            <path 
              d="M9 18L15 12L9 6" 
              stroke={hoverNext && !loading ? 'white' : '#388896'} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : (
        <div style={{ width: '48px' }} />
      )}
    </div>
  );

  // Step 1: Tutorial Welcome Screen (from OnboardingPage screen1)
  const renderStep1 = () => {
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
              zIndex: 1,
              pointerEvents: 'none',
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
                pointerEvents: 'none',
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
              zIndex: 20,
              pointerEvents: 'auto',
            }}>
              {renderDotIndicators(true)}
              {renderCloseButton()}
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

        {renderNavChevrons(false, true)}
      </div>
    );
  };

  // Step 2: Age Input Screen (matching Figma design)
  const renderStep2 = () => {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{
          width: '695px',
          height: '600px',
          backgroundColor: 'white',
          borderRadius: '30px',
          boxShadow: '0px 0px 10px 0px rgba(221,221,221,1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Header with Dots and Close Button */}
          <div style={{
            position: 'absolute',
            top: '26px',
            left: '26px',
            right: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 20,
            pointerEvents: 'auto',
          }}>
            {renderDotIndicators(true)}
            {renderCloseButton()}
          </div>

          {/* Header Container - Image Section */}
          <div style={{
            height: '390px',
            width: '100%',
            position: 'relative',
            pointerEvents: 'none',
          }}>
            {/* Image Container - Background Image */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '695px',
              height: '408px',
              borderTopLeftRadius: '30px',
              borderTopRightRadius: '30px',
              overflow: 'hidden',
              zIndex: 1,
              pointerEvents: 'none',
            }}>
              <img
                src={ageScreenImage}
                alt=""
                style={{
                  position: 'absolute',
                  left: '-2.16%',
                  top: '-19.3%',
                  width: '104.6%',
                  height: '138.6%',
                  maxWidth: 'none',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                }}
              />
              {/* Gradient Overlay - matching Figma */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '168px',
                width: '695px',
                height: '262px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #69b57c 100%)',
                pointerEvents: 'none',
              }} />
            </div>
          </div>

          {/* Form Container - Gradient Bottom Section */}
          <div style={{
            height: '210px',
            width: '100%',
            background: 'linear-gradient(180deg, #69b57c 0%, #388896 100%)',
            borderBottomLeftRadius: '30px',
            borderBottomRightRadius: '30px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '24px',
          }}>
            {/* Form Content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'center',
              paddingBottom: '24px',
            }}>
              {/* Title */}
              <p style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 500,
                fontSize: '32px',
                lineHeight: '40px',
                color: 'white',
                textAlign: 'center',
                margin: 0,
                whiteSpace: 'nowrap',
              }}>
                {t.onboarding.welcomeToSarathi || 'Welcome to '}<span style={{ fontFamily: 'Nehana, cursive', letterSpacing: '-0.64px' }}>Sarathi</span> !
              </p>
              
              {/* Subtitle */}
              <p style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '22px',
                color: 'white',
                textAlign: 'center',
                margin: 0,
                whiteSpace: 'nowrap',
              }}>
                {t.onboarding.letsGetToKnowYou || "Let's start by getting to know you better."}
              </p>
              
              {/* Age Input Field */}
              <div style={{
                width: '327px',
                height: '52px',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'white',
                  border: '0.5px solid #C7C8D5',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 16px',
                  gap: '12px',
                }}>
                  {/* Age Icon from SVG */}
                  <img src={ageIcon} alt="" style={{ width: '24px', height: '24px' }} />
                  
                  {/* Age Input */}
                  <input
                    type="number"
                    value={formData.ageInput || ''}
                    onChange={(e) => handleInputChange('ageInput', e.target.value)}
                    placeholder={t.onboarding.tellUsYourAge || "Tell us your age"}
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '22px',
                      color: '#192126',
                      backgroundColor: 'transparent',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chevron Navigation - Outside the card */}
        {renderNavChevrons(true, true)}
      </div>
    );
  };

  // Helper function to render tutorial screens 2-5
  const renderTutorialScreen = (
    screenNumber: number,
    image: string,
    title: string,
    description: string
  ) => {
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
          paddingTop: '84px',
        }}>
          {/* Header with Dots and Close Button */}
          <div style={{
            position: 'absolute',
            top: '26px',
            left: '26px',
            right: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 20,
            pointerEvents: 'auto',
          }}>
            {renderDotIndicators()}
            {renderCloseButton()}
          </div>

          {/* Image Container */}
          <div style={{
            width: '459px',
            height: '335px',
            margin: '0 auto',
            borderRadius: '20px',
            overflow: 'hidden',
          }}>
            <img
              src={image}
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
            }}>
              {title}
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
              {description}
            </p>
          </div>
        </div>

        {renderNavChevrons(true, true)}
      </div>
    );
  };

  // Step 3-6: Tutorial screens 2-5
  const renderStep3 = () => renderTutorialScreen(2, screen2Image, t.onboarding.screen2Title, t.onboarding.screen2Description);
  const renderStep4 = () => renderTutorialScreen(3, screen3Image, t.onboarding.screen3Title, t.onboarding.screen3Description);
  const renderStep5 = () => renderTutorialScreen(4, screen4Image, t.onboarding.screen4Title, t.onboarding.screen4Description);
  const renderStep6 = () => renderTutorialScreen(5, screen5Image, t.onboarding.screen5Title, t.onboarding.screen5Description);

  // Step 7: User Type Selection
  const renderStep7 = () => {
    const userTypes = [
      { id: 'amputee', label: t.onboarding.iAmAmputee, icon: '🦿' },
      { id: 'caregiver', label: t.onboarding.iAmCaregiver, icon: '👨‍⚕️' },
      { id: 'volunteer', label: t.onboarding.iAmVolunteer, icon: '🤝' },
      { id: 'doctor', label: t.onboarding.iAmDoctor, icon: '⚕️' },
      { id: 'practitioner', label: t.onboarding.iAmPractitioner, icon: '🩺' },
    ];

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
          overflow: 'hidden',
        }}>
          {/* Header with Dots and Close Button */}
          <div style={{
            position: 'absolute',
            top: '26px',
            left: '26px',
            right: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 20,
            pointerEvents: 'auto',
          }}>
            {renderDotIndicators(true)}
            {renderCloseButton()}
          </div>

          {/* Gradient Header */}
          <div style={{
            height: '160px',
            width: '100%',
            background: 'linear-gradient(180deg, #69b57c 0%, #388896 100%)',
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 40px 20px',
          }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 600,
                color: 'white',
                marginBottom: '12px',
                textAlign: 'center',
              }}>
                {t.onboarding.whoAreYou}
              </h2>
              <p style={{
                fontSize: '14px',
                color: 'white',
                marginBottom: 0,
                textAlign: 'center',
              }}>
                {t.onboarding.whoAreYouDescription}
              </p>
          </div>

          {/* Content */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 40px 40px',
          }}>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginBottom: '12px',
              width: '100%',
            }}>
              {userTypes.slice(0, 3).map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleInputChange('userType', type.id)}
                  style={{
                    padding: '16px',
                    border: `2px solid ${formData.userType === type.id ? '#388896' : '#E8E8E8'}`,
                    borderRadius: '16px',
                    background: formData.userType === type.id ? '#F0F9FF' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{type.icon}</div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#192126',
                    whiteSpace: 'pre-line',
                  }}>
                    {type.label}
                  </div>
                </button>
              ))}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              width: '66.66%',
            }}>
              {userTypes.slice(3).map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleInputChange('userType', type.id)}
                  style={{
                    padding: '16px',
                    border: `2px solid ${formData.userType === type.id ? '#388896' : '#E8E8E8'}`,
                    borderRadius: '16px',
                    background: formData.userType === type.id ? '#F0F9FF' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{type.icon}</div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#192126',
                    whiteSpace: 'pre-line',
                  }}>
                    {type.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {renderNavChevrons(true, true)}
      </div>
    );
  };

  // Step 8: Prosthesis Type (amputees only)
  const renderStep8 = () => {
    const prosthesisTypes = [
      { id: 'above_knee', label: t.onboarding.aboveKnee, icon: aboveKneeIcon },
      { id: 'below_knee', label: t.onboarding.belowKnee, icon: belowKneeIcon },
    ];

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
          overflow: 'hidden',
        }}>
          {/* Header with Dots and Close Button */}
          <div style={{
            position: 'absolute',
            top: '26px',
            left: '26px',
            right: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 20,
            pointerEvents: 'auto',
          }}>
            {renderDotIndicators(true)}
            {renderCloseButton()}
          </div>

          {/* Gradient Header */}
          <div style={{
            height: '200px',
            width: '100%',
            background: 'linear-gradient(180deg, #69b57c 0%, #388896 100%)',
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 40px',
            gap: '12px',
          }}>
            {/* Medical Icon */}
            <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
            }}>
              <img 
                src={medicalIcon} 
                alt=""
                style={{
                  width: '24px',
                  height: '24px',
                }}
              />
            </div>

            {/* Text Container */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 500,
                color: 'white',
                margin: 0,
                textAlign: 'center',
                lineHeight: '40px',
              }}>
                {t.onboarding.medicalInformation}
              </h2>
              <p style={{
                fontSize: '18px',
                fontWeight: 500,
                color: 'white',
                margin: 0,
                textAlign: 'center',
                lineHeight: '28px',
                maxWidth: '375px',
              }}>
                {t.onboarding.medicalInformationDescription}
              </p>
            </div>
          </div>

          {/* Content */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 40px',
          }}>

            {/* Question Text */}
            <h3 style={{
              fontSize: '18px',
              fontWeight: 500,
              color: '#505050',
              margin: '0 0 24px 0',
              textAlign: 'center',
              lineHeight: '28px',
            }}>
              {t.onboarding.whatTypeOfProsthesis}
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginBottom: '32px',
              width: '100%',
              maxWidth: '400px',
            }}>
              {prosthesisTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleInputChange('prosthesisType', type.id)}
                  style={{
                    padding: '24px',
                    border: `2px solid ${formData.prosthesisType === type.id ? '#388896' : '#E8E8E8'}`,
                    borderRadius: '16px',
                    background: formData.prosthesisType === type.id ? '#F0F9FF' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                    <img 
                      src={type.icon} 
                      alt=""
                      style={{
                        width: '58px',
                        height: '58px',
                      }}
                    />
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#192126',
                  }}>
                    {type.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {renderNavChevrons(true, true)}
      </div>
    );
  };

  // Step 9: Length of Usage (amputees only)
  const renderStep9 = () => {
    const lengthOptions = [
      { id: 'less_than_6_month', label: t.onboarding.lessThan6Months, icon: '📅' },
      { id: 'more_than_1_year', label: t.onboarding.moreThan1Year, icon: '📆' },
      { id: 'more_than_5_years', label: t.onboarding.moreThan5Years, icon: '🗓️' },
    ];

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
          overflow: 'hidden',
        }}>
          {/* Header with Dots and Close Button */}
          <div style={{
            position: 'absolute',
            top: '26px',
            left: '26px',
            right: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 20,
            pointerEvents: 'auto',
          }}>
            {renderDotIndicators(true)}
            {renderCloseButton()}
          </div>

          {/* Gradient Header */}
          <div style={{
            height: '200px',
            width: '100%',
            background: 'linear-gradient(180deg, #69b57c 0%, #388896 100%)',
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 40px',
            gap: '12px',
          }}>
            {/* Medical Icon */}
            <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
            }}>
              <img 
                src={medicalIcon} 
                alt=""
                style={{
                  width: '24px',
                  height: '24px',
                }}
              />
            </div>

            {/* Text Container */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 500,
                color: 'white',
                margin: 0,
                textAlign: 'center',
                lineHeight: '40px',
              }}>
                {t.onboarding.medicalInformation}
              </h2>
              <p style={{
                fontSize: '18px',
                fontWeight: 500,
                color: 'white',
                margin: 0,
                textAlign: 'center',
                lineHeight: '28px',
                maxWidth: '375px',
              }}>
                {t.onboarding.medicalInformationDescription}
              </p>
            </div>
          </div>

          {/* Content */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 40px',
          }}>

            {/* Question Text */}
            <h3 style={{
              fontSize: '18px',
              fontWeight: 500,
              color: '#505050',
              margin: '0 0 24px 0',
              textAlign: 'center',
              lineHeight: '28px',
            }}>
              {t.onboarding.howLongHaveYouBeenUsing}
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '24px',
              width: '100%',
              maxWidth: '400px',
            }}>
              {lengthOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleInputChange('lengthUsage', option.id)}
                  style={{
                    padding: '16px',
                    border: `2px solid ${formData.lengthUsage === option.id ? '#388896' : '#E8E8E8'}`,
                    borderRadius: '16px',
                    background: formData.lengthUsage === option.id ? '#F0F9FF' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <div style={{ fontSize: '28px' }}>{option.icon}</div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#192126',
                    textAlign: 'left',
                  }}>
                    {option.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {renderNavChevrons(true, true)}
      </div>
    );
  };

  // Step 10: Main Challenges
  const renderStep10 = () => {
    const challenges = [
      { id: 'fit_comfort', label: t.onboarding.fitAndComfort, icon: fitComfortIcon },
      { id: 'mobility', label: t.onboarding.mobility, icon: mobilityIcon },
      { id: 'community', label: t.onboarding.community, icon: communityIcon },
      { id: 'cost_access', label: t.onboarding.costAndAccess, icon: costAccessIcon },
      { id: 'training', label: t.onboarding.training, icon: trainingIcon },
      { id: 'emotional', label: t.onboarding.emotionalWellbeing, icon: emotionalIcon },
    ];

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
          overflow: 'hidden',
        }}>
          {/* Header with Dots and Close Button */}
          <div style={{
            position: 'absolute',
            top: '26px',
            left: '26px',
            right: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 20,
            pointerEvents: 'auto',
          }}>
            {renderDotIndicators(true)}
            {renderCloseButton()}
          </div>

          {/* Gradient Header */}
          <div style={{
            height: '200px',
            width: '100%',
            background: 'linear-gradient(180deg, #69b57c 0%, #388896 100%)',
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 40px',
            gap: '12px',
          }}>
            {/* Medical Icon */}
            <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
            }}>
              <img 
                src={medicalIcon} 
                alt=""
                style={{
                  width: '24px',
                  height: '24px',
                }}
              />
            </div>

            {/* Text Container */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 500,
                color: 'white',
                margin: 0,
                textAlign: 'center',
                lineHeight: '40px',
              }}>
                {t.onboarding.medicalInformation}
              </h2>
              <p style={{
                fontSize: '18px',
                fontWeight: 500,
                color: 'white',
                margin: 0,
                textAlign: 'center',
                lineHeight: '28px',
                maxWidth: '375px',
              }}>
                {t.onboarding.medicalInformationDescription}
              </p>
            </div>
          </div>

          {/* Content */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '24px 60px 60px',
          }}>

            {/* Question Text */}
            <h3 style={{
              fontSize: '18px',
              fontWeight: 500,
              color: '#505050',
              margin: '0 0 16px 0',
              textAlign: 'center',
              lineHeight: '28px',
            }}>
              {t.onboarding.whatIsYourMainChallenge}
            </h3>

            {/* First row - 3 items */}
            <div style={{
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
              marginBottom: '16px',
            }}>
              {challenges.slice(0, 3).map((challenge) => (
                <button
                  key={challenge.id}
                  type="button"
                  onClick={() => handleToggleArrayItem('mainChallenge', challenge.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    width: '100px',
                  }}
                >
                  <div style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '36px',
                    backgroundColor: formData.mainChallenge.includes(challenge.id) ? '#388896' : '#E0EBE3',
                    boxShadow: '0px 0px 10px 0px #DDDDDD',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px',
                    transition: 'all 0.2s',
                  }}>
                    <img 
                      src={challenge.icon} 
                      alt=""
                      style={{
                        width: '24px',
                        height: '24px',
                        filter: formData.mainChallenge.includes(challenge.id) ? 'brightness(0) invert(1)' : 'none',
                      }}
                    />
                  </div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#505050',
                    margin: 0,
                    textAlign: 'center',
                    lineHeight: '22px',
                  }}>
                    {challenge.label}
                  </p>
                </button>
              ))}
            </div>

            {/* Second row - 3 items */}
            <div style={{
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
            }}>
              {challenges.slice(3, 6).map((challenge) => (
                <button
                  key={challenge.id}
                  type="button"
                  onClick={() => handleToggleArrayItem('mainChallenge', challenge.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    width: '100px',
                  }}
                >
                  <div style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '36px',
                    backgroundColor: formData.mainChallenge.includes(challenge.id) ? '#388896' : '#E0EBE3',
                    boxShadow: '0px 0px 10px 0px #DDDDDD',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px',
                    transition: 'all 0.2s',
                  }}>
                    <img 
                      src={challenge.icon} 
                      alt=""
                      style={{
                        width: '24px',
                        height: '24px',
                        filter: formData.mainChallenge.includes(challenge.id) ? 'brightness(0) invert(1)' : 'none',
                      }}
                    />
                  </div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#505050',
                    margin: 0,
                    textAlign: 'center',
                    lineHeight: '22px',
                  }}>
                    {challenge.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {renderNavChevrons(true, true)}
      </div>
    );
  };

  // Step 11: Activities & Interests
  const renderStep11 = () => {
    const activities = [
      { id: 'rehabilitation', label: t.onboarding.rehabilitation, icon: rehabIcon },
      { id: 'social_life', label: t.onboarding.socialLife, icon: sociallifeIcon },
      { id: 'emotions', label: t.onboarding.emotions, icon: emotionsIcon },
      { id: 'pain_relief', label: t.onboarding.painRelief, icon: painreliefIcon },
      { id: 'work', label: t.onboarding.work, icon: workIcon },
      { id: 'independence', label: t.onboarding.independence, icon: independenceIcon },
      { id: 'education', label: t.onboarding.education, icon: educationIcon },
      { id: 'confidence', label: t.onboarding.confidence, icon: confidenceIcon },
      { id: 'training', label: t.onboarding.training, icon: trainingFocusIcon },
      { id: 'sports', label: t.onboarding.sports, icon: sportsIcon },
      { id: 'guidance', label: t.onboarding.guidance, icon: guidanceIcon },
      { id: 'community', label: t.onboarding.community, icon: communityActivityIcon },
      { id: 'maintenance', label: t.onboarding.maintenance, icon: maintenanceIcon },
    ];

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
          overflow: 'hidden',
        }}>
          {/* Header with Dots and Close Button */}
          <div style={{
            position: 'absolute',
            top: '26px',
            left: '26px',
            right: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 20,
            pointerEvents: 'auto',
          }}>
            {renderDotIndicators(true)}
            {renderCloseButton()}
          </div>

          {/* Gradient Header */}
          <div style={{
            height: '200px',
            width: '100%',
            background: 'linear-gradient(180deg, #69b57c 0%, #388896 100%)',
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 40px',
            gap: '12px',
          }}>
            {/* Medical Icon */}
            <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
            }}>
              <img 
                src={medicalIcon} 
                alt=""
                style={{
                  width: '24px',
                  height: '24px',
                }}
              />
            </div>

            {/* Text Container */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 500,
                color: 'white',
                margin: 0,
                textAlign: 'center',
                lineHeight: '40px',
              }}>
                {t.onboarding.medicalInformation}
              </h2>
              <p style={{
                fontSize: '18px',
                fontWeight: 500,
                color: 'white',
                margin: 0,
                textAlign: 'center',
                lineHeight: '28px',
                maxWidth: '375px',
              }}>
                {t.onboarding.medicalInformationDescription}
              </p>
            </div>
          </div>

          {/* Content */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '24px 50px 60px',
            overflow: 'auto',
          }}>

            {/* Question Text */}
            <h3 style={{
              fontSize: '18px',
              fontWeight: 500,
              color: '#505050',
              margin: '0 0 24px 0',
              textAlign: 'center',
              lineHeight: '28px',
            }}>
              {t.onboarding.whichActivitiesMatter}
            </h3>

            {/* Pills Container */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center',
            }}>
              {/* Row 1: 3 items */}
              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
              }}>
                {activities.slice(0, 3).map((activity) => (
                  <button
                    key={activity.id}
                    type="button"
                    onClick={() => handleToggleArrayItem('activities', activity.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px',
                      backgroundColor: formData.activities.includes(activity.id) ? '#388896' : 'white',
                      border: 'none',
                      borderRadius: '15px',
                      boxShadow: '0px 0px 10px 0px #DDDDDD',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <img 
                      src={activity.icon} 
                      alt=""
                      style={{
                        width: '24px',
                        height: '24px',
                        filter: formData.activities.includes(activity.id) ? 'brightness(0) invert(1)' : 'none',
                      }}
                    />
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: formData.activities.includes(activity.id) ? 'white' : '#192126',
                      lineHeight: '20px',
                    }}>
                      {activity.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Row 2: 4 items */}
              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
              }}>
                {activities.slice(3, 7).map((activity) => (
                  <button
                    key={activity.id}
                    type="button"
                    onClick={() => handleToggleArrayItem('activities', activity.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px',
                      backgroundColor: formData.activities.includes(activity.id) ? '#388896' : 'white',
                      border: 'none',
                      borderRadius: '15px',
                      boxShadow: '0px 0px 10px 0px #DDDDDD',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <img 
                      src={activity.icon} 
                      alt=""
                      style={{
                        width: '24px',
                        height: '24px',
                        filter: formData.activities.includes(activity.id) ? 'brightness(0) invert(1)' : 'none',
                      }}
                    />
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: formData.activities.includes(activity.id) ? 'white' : '#192126',
                      lineHeight: '20px',
                    }}>
                      {activity.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Row 3: 3 items */}
              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
              }}>
                {activities.slice(7, 10).map((activity) => (
                  <button
                    key={activity.id}
                    type="button"
                    onClick={() => handleToggleArrayItem('activities', activity.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px',
                      backgroundColor: formData.activities.includes(activity.id) ? '#388896' : 'white',
                      border: 'none',
                      borderRadius: '15px',
                      boxShadow: '0px 0px 10px 0px #DDDDDD',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <img 
                      src={activity.icon} 
                      alt=""
                      style={{
                        width: '24px',
                        height: '24px',
                        filter: formData.activities.includes(activity.id) ? 'brightness(0) invert(1)' : 'none',
                      }}
                    />
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: formData.activities.includes(activity.id) ? 'white' : '#192126',
                      lineHeight: '20px',
                    }}>
                      {activity.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Row 4: 3 items */}
              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
              }}>
                {activities.slice(10, 13).map((activity) => (
                  <button
                    key={activity.id}
                    type="button"
                    onClick={() => handleToggleArrayItem('activities', activity.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px',
                      backgroundColor: formData.activities.includes(activity.id) ? '#388896' : 'white',
                      border: 'none',
                      borderRadius: '15px',
                      boxShadow: '0px 0px 10px 0px #DDDDDD',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <img 
                      src={activity.icon} 
                      alt=""
                      style={{
                        width: '24px',
                        height: '24px',
                        filter: formData.activities.includes(activity.id) ? 'brightness(0) invert(1)' : 'none',
                      }}
                    />
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: formData.activities.includes(activity.id) ? 'white' : '#192126',
                      lineHeight: '20px',
                    }}>
                      {activity.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {renderNavChevrons(true, true)}
      </div>
    );
  };

  // Step 12: Final "You are Ready!" Screen
  const renderStep12 = () => {
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
              onClick={handleSubmit}
              disabled={loading}
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
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '24px',
                color: 'white',
                transition: 'background-color 0.3s ease',
                marginTop: '4px',
                opacity: loading ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#2a6b77';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#388896';
              }}
            >
              {loading ? t.common.saving : t.onboarding.screen6Button}
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

  const renderCurrentStep = () => {
    // Map current step to the correct render function
    // For amputees: 1-12 (all steps)
    // For non-amputees: 1-7, then skip to 10, 11, then 12 (displayed as steps 1-10)
    
    if (currentStep === 1) return renderStep1();
    if (currentStep === 2) return renderStep2();
    if (currentStep === 3) return renderStep3();
    if (currentStep === 4) return renderStep4();
    if (currentStep === 5) return renderStep5();
    if (currentStep === 6) return renderStep6();
    if (currentStep === 7) return renderStep7();
    if (currentStep === 8) return renderStep8();
    if (currentStep === 9) return renderStep9();
    if (currentStep === 10) return renderStep10();
    if (currentStep === 11) return renderStep11();
    if (currentStep === 12) return renderStep12();
    
    return renderStep1();
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
      padding: '40px 0',
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
        {renderCurrentStep()}
      </div>
    </div>
  );
}

