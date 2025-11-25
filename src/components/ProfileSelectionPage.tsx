import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import backgroundImage from '../assets/images/Background_login.png';
import sarathiLogo from '../assets/svg/sarathi_login.svg';

interface ProfileSelectionPageProps {
  onNavigate: (page: string) => void;
  userName?: string;
}

export function ProfileSelectionPage({ onNavigate, userName = 'User' }: ProfileSelectionPageProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const profiles = [
    { id: 'amputee', label: 'I am an\namputee', icon: '🦿' },
    { id: 'caregiver', label: 'I am a\ncaregiver', icon: '👨‍⚕️' },
    { id: 'volunteer', label: 'I am a\nvolunteer', icon: '🤝' },
    { id: 'healthcare', label: 'I am a\nhealthcare\nprofessional', icon: '⚕️' },
  ];

  const handleNext = async () => {
    if (!selectedProfile) {
      console.error('❌ No profile selected');
      return;
    }
    
    if (!user) {
      console.error('❌ User not logged in');
      toast.error('Please log in first');
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('📝 Updating user_type to:', selectedProfile);
      console.log('👤 User ID:', user.id);
      
      // Update user_type in sarathi_user table
      const { data, error } = await supabase
        .from('sarathi_user')
        .update({ user_type: selectedProfile })
        .eq('uuid', user.id)
        .select();
      
      console.log('📊 Update result:', { data, error });
      
      if (error) {
        console.error('❌ Error updating user_type:', error);
        toast.error(`Failed to save profile type: ${error.message}`);
        setLoading(false);
        return;
      }
      
      console.log('✅ User type updated successfully');
      toast.success('Profile type saved!');
      
      // Navigate to complete page
      onNavigate('profile-complete');
    } catch (error: any) {
      console.error('❌ Exception updating profile:', error);
      toast.error(`Error: ${error.message || 'Failed to save'}`);
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
      <div style={{
        width: '100%',
        maxWidth: '800px',
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

        {/* RIGHT: Profile Selection */}
        <div style={{
          flex: 1,
          padding: '72px 32px 75px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          minWidth: '500px'
        }}>

          {/* Header */}
          <div style={{ padding: '0 8px', textAlign: 'left' }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#192126',
              marginBottom: '4px',
              lineHeight: '24px'
            }}>
              Welcome to the community!
            </h2>
            <p style={{
              fontSize: '18px',
              fontWeight: 500,
              color: '#979797',
              lineHeight: '28px',
              margin: 0
            }}>
              {userName}
            </p>
          </div>

          {/* Main Content */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '55px',
            alignItems: 'center',
            flex: 1
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '34px',
              alignItems: 'center',
              width: '100%'
            }}>
              {/* Title */}
              <div style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <h1 style={{
                  fontSize: '32px',
                  fontWeight: 500,
                  color: '#192126',
                  lineHeight: '40px',
                  margin: 0
                }}>
                  Choose your Profile
                </h1>
                <p style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  color: '#979797',
                  lineHeight: '28px',
                  maxWidth: '250px',
                  margin: '0 auto'
                }}>
                  Choose a profile to help us understand you better
                </p>
              </div>

              {/* Profile Options */}
              <div style={{
                display: 'flex',
                gap: '12px',
                padding: '12px 0',
                width: '100%',
                justifyContent: 'center',
                flexWrap: 'nowrap'
              }}>
                {profiles.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedProfile(profile.id)}
                    style={{
                      width: '110px',
                      height: '115px',
                      borderRadius: '15px',
                      backgroundColor: selectedProfile === profile.id ? '#8AC0AD' : '#FFFFFF',
                      border: 'none',
                      boxShadow: selectedProfile === profile.id 
                        ? '0 0 10px rgba(20,20,20,0.35)'
                        : '0 0 10px rgba(221,221,221,1)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      padding: '6px 4px',
                      gap: '4px',
                      transition: 'all 0.2s',
                      flexShrink: 0
                    }}
                  >
                    <span style={{
                      fontSize: '36px',
                      lineHeight: '1'
                    }}>
                      {profile.icon}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      color: '#505050',
                      lineHeight: '14px',
                      whiteSpace: 'pre-line',
                      textAlign: 'center',
                      fontFamily: 'Roboto, sans-serif',
                      width: '100%',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '44px'
                    }}>
                      {profile.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={!selectedProfile || loading}
                style={{
                  width: '200px',
                  height: '52px',
                  backgroundColor: selectedProfile && !loading ? '#388896' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '28px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: selectedProfile && !loading ? 'pointer' : 'not-allowed',
                  boxShadow: '0 0 10px rgba(221,221,221,1)',
                  opacity: selectedProfile && !loading ? 1 : 0.6
                }}
              >
                {loading ? 'Saving...' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

