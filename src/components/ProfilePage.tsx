import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { ImageCropDialog } from './ImageCropDialog';
import locationIcon from '../assets/svg/location.svg';
import locationPrimaryIcon from '../assets/svg/location_primary.svg';
import achievementIcon from '../assets/svg/achievement.svg';
import workIcon from '../assets/svg/work.svg';
import videoIcon from '../assets/svg/video.svg';
import imageIcon from '../assets/svg/image.svg';
import rehabIcon from '../assets/svg/rehab.svg';
import emotionsIcon from '../assets/svg/emotions.svg';
import sociallifeIcon from '../assets/svg/sociallife.svg';
import fitComfortIcon from '../assets/svg/fit_comfort.svg';
import mobilityIcon from '../assets/svg/mobility.svg';
import emotionalIcon from '../assets/svg/emotional.svg';
import heartIcon from '../assets/svg/heart.svg';
import communityIcon from '../assets/svg/community.svg';
import costAccessIcon from '../assets/svg/cost_access.svg';
import trainingIcon from '../assets/svg/training.svg';
import painreliefIcon from '../assets/svg/painrelief.svg';
import independenceIcon from '../assets/svg/independence.svg';
import educationIcon from '../assets/svg/education.svg';
import confidenceIcon from '../assets/svg/confidence.svg';
import trainingFocusIcon from '../assets/svg/training_focus.svg';
import sportsIcon from '../assets/svg/sports.svg';
import guidanceIcon from '../assets/svg/guidance.svg';
import communityActivityIcon from '../assets/svg/community.svg';
import maintenanceIcon from '../assets/svg/maintenance.svg';
import defaultProfilePic from '../assets/images/default_profile_pic.png';
import fotoIcon from '../assets/svg/foto.svg';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { user, logout, updateProfile } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [coverPhotoDialogOpen, setCoverPhotoDialogOpen] = useState(false);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(null);
  const [profilePhotoDialogOpen, setProfilePhotoDialogOpen] = useState(false);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileFileInputRef = useRef<HTMLInputElement>(null);
  
  // Track form data for edit mode
  const [editData, setEditData] = useState({
    profession: user?.profession || '',
    workplace: user?.workplace || '',
    place_of_residence: user?.place_of_residence || '',
    my_story: user?.my_story || '',
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize edit data when user changes
  useEffect(() => {
    if (user) {
      setEditData({
        profession: user.profession || '',
        workplace: user.workplace || '',
        place_of_residence: user.place_of_residence || '',
        my_story: user.my_story || '',
      });
    }
  }, [user]);

  // Handle cover photo file selection
  const handleCoverPhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      if (e.target) e.target.value = '';
      return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be less than 10MB');
      if (e.target) e.target.value = '';
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setCoverPhotoPreview(result);
        setCoverPhotoDialogOpen(true);
      } else {
        toast.error('Error reading image file');
      }
    };
    reader.onerror = () => {
      toast.error('Error reading image file');
      if (e.target) e.target.value = '';
    };
    reader.readAsDataURL(file);
    
    // Reset input so same file can be selected again
    if (e.target) {
      e.target.value = '';
    }
  };

  // Handle profile photo file selection
  const handleProfilePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfilePhotoPreview(result);
        setProfilePhotoDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload cover photo to Supabase
  const uploadCoverPhoto = async (blob: Blob) => {
    if (!user) return;
    
    try {
      setSaving(true);
      const fileExt = 'jpg';
      const fileName = `${user.id}/cover-${Date.now()}.${fileExt}`;
      
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('profile-media')
        .upload(fileName, blob, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get public URL (or signed URL if bucket is private)
      const { data: publicUrlData } = supabase.storage
        .from('profile-media')
        .getPublicUrl(fileName);

      // If bucket is private, get signed URL instead
      let imageUrl = publicUrlData.publicUrl;
      
      // Try to get signed URL (for private buckets)
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from('profile-media')
        .createSignedUrl(fileName, 31536000); // 1 year expiry

      if (!signedUrlError && signedUrlData) {
        imageUrl = signedUrlData.signedUrl;
      }

      // Update profile with the URL
      await updateProfile({ cover_picture_url: imageUrl });
      
      // Clear preview and close dialog
      setCoverPhotoPreview(null);
      setCoverPhotoDialogOpen(false);
      
      setHasUnsavedChanges(true);
      toast.success(t.profile.coverPhotoUploaded);
    } catch (error: any) {
      console.error('Error uploading cover photo:', error);
      toast.error(error.message || 'Failed to upload cover photo');
    } finally {
      setSaving(false);
    }
  };

  // Upload profile photo to Supabase
  const uploadProfilePhoto = async (blob: Blob) => {
    if (!user) return;
    
    try {
      setSaving(true);
      const fileExt = 'jpg';
      const fileName = `${user.id}/profile-${Date.now()}.${fileExt}`;
      
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('profile-media')
        .upload(fileName, blob, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get public URL (or signed URL if bucket is private)
      const { data: publicUrlData } = supabase.storage
        .from('profile-media')
        .getPublicUrl(fileName);

      // If bucket is private, get signed URL instead
      let imageUrl = publicUrlData.publicUrl;
      
      // Try to get signed URL (for private buckets)
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from('profile-media')
        .createSignedUrl(fileName, 31536000); // 1 year expiry

      if (!signedUrlError && signedUrlData) {
        imageUrl = signedUrlData.signedUrl;
      }

      // Update profile with the URL
      await updateProfile({ profile_picture_url: imageUrl });
      
      // Clear preview and close dialog
      setProfilePhotoPreview(null);
      setProfilePhotoDialogOpen(false);
      
      setHasUnsavedChanges(true);
      toast.success(t.profile.profilePhotoUploaded);
    } catch (error: any) {
      console.error('Error uploading profile photo:', error);
      toast.error(error.message || 'Failed to upload profile photo');
    } finally {
      setSaving(false);
    }
  };

  // Save profile changes
  const handleSave = async () => {
    if (!user) return;
    
    try {
      setSaving(true);
      await updateProfile({
        profession: editData.profession || null,
        workplace: editData.workplace || null,
        place_of_residence: editData.place_of_residence || null,
        my_story: editData.my_story || null,
      });
      setHasUnsavedChanges(false);
      setIsEditing(false);
      toast.success(t.profile.profileSaved);
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast.error(error.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  // Discard changes
  const handleDiscard = () => {
    if (user) {
      setEditData({
        profession: user.profession || '',
        workplace: user.workplace || '',
        place_of_residence: user.place_of_residence || '',
        my_story: user.my_story || '',
      });
    }
    setHasUnsavedChanges(false);
    setIsEditing(false);
    setShowSaveDialog(false);
    if (pendingNavigation) {
      onNavigate(pendingNavigation);
      setPendingNavigation(null);
    }
  };

  // Handle navigation with unsaved changes check
  const handleNavigate = (page: string) => {
    if (isEditing && hasUnsavedChanges) {
      setPendingNavigation(page);
      setShowSaveDialog(true);
    } else {
      onNavigate(page);
    }
  };

  // Handle save dialog actions
  const handleSaveDialogAction = async (action: 'save' | 'discard' | 'cancel') => {
    if (action === 'save') {
      await handleSave();
      if (pendingNavigation) {
        onNavigate(pendingNavigation);
        setPendingNavigation(null);
      }
    } else if (action === 'discard') {
      handleDiscard();
    } else {
      // Cancel - stay on page
      setShowSaveDialog(false);
      setPendingNavigation(null);
    }
  };

  // Handle edit mode toggle
  const handleEditToggle = () => {
    if (isEditing) {
      if (hasUnsavedChanges) {
        setShowSaveDialog(true);
      } else {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  // Track changes in edit data
  useEffect(() => {
    if (isEditing && user) {
      const hasChanges = 
        editData.profession !== (user.profession || '') ||
        editData.workplace !== (user.workplace || '') ||
        editData.place_of_residence !== (user.place_of_residence || '') ||
        editData.my_story !== (user.my_story || '');
      setHasUnsavedChanges(hasChanges);
    }
  }, [editData, isEditing, user]);


  if (!user) {
    return (
      <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#505050' }}>
          {t.auth.login}
        </div>
      </div>
    );
  }

  // Helper function to get user display name
  const getUserDisplayName = () => {
    return user.firstName || user.name || 'User';
  };

  // Helper functions to map activities and challenges to icons and labels (matching onboarding flow)
  const getActivityIcon = (activityId: string) => {
    const activityMap: Record<string, string> = {
      'rehabilitation': rehabIcon,
      'social_life': sociallifeIcon,
      'emotions': emotionsIcon,
      'pain_relief': painreliefIcon,
      'work': workIcon,
      'independence': independenceIcon,
      'education': educationIcon,
      'confidence': confidenceIcon,
      'training': trainingFocusIcon,
      'sports': sportsIcon,
      'guidance': guidanceIcon,
      'community': communityActivityIcon,
      'maintenance': maintenanceIcon,
    };
    return activityMap[activityId] || rehabIcon;
  };

  const getActivityLabel = (activityId: string) => {
    const activityMap: Record<string, string> = {
      'rehabilitation': t.onboarding.rehabilitation,
      'social_life': t.onboarding.socialLife,
      'emotions': t.onboarding.emotions,
      'pain_relief': t.onboarding.painRelief,
      'work': t.onboarding.work,
      'independence': t.onboarding.independence,
      'education': t.onboarding.education,
      'confidence': t.onboarding.confidence,
      'training': t.onboarding.training,
      'sports': t.onboarding.sports,
      'guidance': t.onboarding.guidance,
      'community': t.onboarding.community,
      'maintenance': t.onboarding.maintenance,
    };
    return activityMap[activityId] || activityId;
  };

  const getChallengeIcon = (challengeId: string) => {
    const challengeMap: Record<string, string> = {
      'fit_comfort': fitComfortIcon,
      'mobility': mobilityIcon,
      'community': communityIcon,
      'cost_access': costAccessIcon,
      'training': trainingIcon,
      'emotional': emotionalIcon,
    };
    return challengeMap[challengeId] || fitComfortIcon;
  };

  const getChallengeLabel = (challengeId: string) => {
    const challengeMap: Record<string, string> = {
      'fit_comfort': t.onboarding.fitAndComfort,
      'mobility': t.onboarding.mobility,
      'community': t.onboarding.community,
      'cost_access': t.onboarding.costAndAccess,
      'training': t.onboarding.training,
      'emotional': t.onboarding.emotionalWellbeing,
    };
    return challengeMap[challengeId] || challengeId;
  };

  // Mock data for uploads, connections, and activities (to be replaced with real data later)
  const uploads = [
    { id: 1, image: null },
    { id: 2, image: null },
    { id: 3, image: null },
  ];

  const connections = [
    { id: 1, name: 'Brijesh Mohan', image: null },
    { id: 2, name: 'Shruti Apte', image: null },
    { id: 3, name: 'Rishika Sharma', image: null },
  ];

  const activities = [
    { type: 'like', text: 'Ravi liked your comment on "Running with a Below-Knee Prosthetic"', detail: '"Great stretching routine! I\'ve been trying…" — 3 hrs ago' },
    { type: 'comment', text: 'You Commented on "Running with a Below-Knee Prosthetic"', detail: '"Great stretching routine! I\'ve been trying…" — 3 hrs ago' },
    { type: 'group', text: 'You Joined group: "Adaptive sport India"', detail: '- 2 days ago' },
    { type: 'badge', text: 'You Earned a badge for : " First 5 Community replies"', detail: '- 1 week ago' },
    { type: 'comment', text: 'Aashish and 4 other people commented on your recent post.', detail: '10 days ago' },
    { type: 'like', text: 'Amit and 7 other people liked your post  "Rehabilitation and ways to keep up".', detail: '12 days ago' },
  ];

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1280px', position: 'relative' }}>
        {/* Cover Picture - Keep as is */}
        <div 
          style={{ 
            width: '100%', 
            height: '420px', 
            background: user.cover_picture_url 
              ? `url(${user.cover_picture_url})` 
              : 'linear-gradient(135deg, #8AC0AD 0%, #388896 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}
        >
          {/* Add cover photo button - only visible in edit mode */}
          {isEditing && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleCoverPhotoSelect}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                type="button"
                style={{
                  position: 'absolute',
                  right: '80px',
                  top: '354px',
                  background: '#ffffff',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '8px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  boxShadow: '0px 0px 10px 0px #dddddd',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#505050',
                }}
              >
                <span>{t.profile.addCoverPhoto}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f9ca6" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Profile Picture - Original position (352px) */}
        <div style={{ 
          position: 'absolute', 
          left: isMobile ? '20px' : '120px', 
          top: '352px' 
        }}>
          <div
            style={{
              width: '186px',
              height: '186px',
              borderRadius: '50%',
              background: user.profile_picture_url 
                ? `url(${user.profile_picture_url})` 
                : `url(${defaultProfilePic})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '6px solid #ffffff',
              position: 'relative',
            }}
          >
            {/* Change picture button - only visible in edit mode */}
            {isEditing && (
              <>
                <input
                  ref={profileFileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleProfilePhotoSelect}
                />
                <button
                  onClick={() => profileFileInputRef.current?.click()}
                  style={{
                    position: 'absolute',
                    right: '0',
                    bottom: '0',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: '#f2f2f7',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0px 0px 10px 0px #dddddd',
                  }}
                >
                  <img src={fotoIcon} alt="upload photo" width="24" height="24" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Name and Location - 10px below cover picture (430px) */}
        <div style={{ 
          position: 'absolute',
          left: isMobile ? '20px' : '320px', // 120px (profile left) + 186px (profile width) + 14px (gap)
          top: '430px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '32px',
              fontWeight: 500,
              lineHeight: '40px',
              color: '#192126',
              margin: 0,
            }}>
              {user.firstName && user.name ? `${user.firstName} ${user.name}` : getUserDisplayName()}
            </h1>
            {/* Verified badge */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#388896" />
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={locationIcon} alt="location" width="20" height="20" />
            <span style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '18px',
              fontWeight: 500,
              lineHeight: '28px',
              color: '#192126',
            }}>
              {user.place_of_residence || 'India'}
            </span>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div style={{ 
          position: 'absolute', 
          right: isMobile ? '20px' : '80px', 
          top: '458px' 
        }}>
          <button
            onClick={handleEditToggle}
            disabled={saving}
            onMouseEnter={(e) => {
              if (!saving) {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#388896';
                const svg = e.currentTarget.querySelector('svg');
                if (svg) svg.setAttribute('stroke', '#388896');
              }
            }}
            onMouseLeave={(e) => {
              if (!saving) {
                e.currentTarget.style.background = '#388896';
                e.currentTarget.style.color = '#ffffff';
                const svg = e.currentTarget.querySelector('svg');
                if (svg) svg.setAttribute('stroke', '#ffffff');
              }
            }}
            style={{
              background: '#388896',
              border: 'none',
              borderRadius: '24px',
              padding: '8px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: saving ? 'not-allowed' : 'pointer',
              boxShadow: '0px 0px 10px 0px #dddddd',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              color: '#ffffff',
              transition: 'all 0.2s ease',
              opacity: saving ? 0.6 : 1,
            }}
          >
            <span>{isEditing ? t.profile.saveProfile : t.profile.editProfile}</span>
            {isEditing ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            )}
          </button>
        </div>

        {/* Divider - 10px below profile picture (profile pic starts at 352px, height 186px, ends at 538px, so divider at 548px) */}
        <div style={{ 
          width: isMobile ? 'calc(100% - 40px)' : 'calc(100% - 160px)', 
          height: '1px', 
          background: '#d9d9d9', 
          margin: isMobile ? '128px 20px 0 20px' : '128px 80px 0 80px'
        }} />

        {/* Main Content - Two Column Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
          gap: '24px', 
          marginTop: '20px',
          padding: isMobile ? '0 20px 40px 20px' : '0 80px 40px 80px'
        }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* About Section */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #f2f2f7',
              borderRadius: '30px',
              padding: '28px',
            }}>
              <h2 style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '22px',
                fontWeight: 400,
                lineHeight: '32px',
                color: '#192126',
                margin: '0 0 20px 0',
              }}>
                {t.profile.about}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* 1st row: Profession */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <img src={achievementIcon} alt="achievement" width="31" height="31" />
                  {user.profession && (
                    <span style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '18px',
                      fontWeight: 500,
                      lineHeight: '28px',
                      color: '#192126',
                    }}>
                      {user.profession}
                    </span>
                  )}
                </div>
                {/* 2nd row: Workplace */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <img src={workIcon} alt="work" width="31" height="31" />
                  {user.workplace && (
                    <span style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '18px',
                      fontWeight: 500,
                      lineHeight: '28px',
                      color: '#192126',
                    }}>
                      {t.profile.worksAt} {user.workplace}
                    </span>
                  )}
                </div>
                {/* 3rd row: Place of Residence */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={locationPrimaryIcon} alt="location" width="25" height="25" />
                  {user.place_of_residence && (
                    <span style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '18px',
                      fontWeight: 500,
                      lineHeight: '28px',
                      color: '#192126',
                    }}>
                      {t.profile.from} {user.place_of_residence}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Prosthesis Info Section */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #f2f2f7',
              borderRadius: '30px',
              padding: '28px',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {user.userType === 'amputee' ? (
                  <>
                    {user.prosthesisType && (
                      <p style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '18px',
                        fontWeight: 500,
                        lineHeight: '28px',
                        color: '#192126',
                        margin: 0,
                      }}>
                        <span style={{ fontWeight: 400 }}>{t.profile.prostheticType}:</span>
                        <span style={{ fontWeight: 500, marginLeft: '8px' }}>
                          {user.prosthesisType === 'below_knee' ? t.profile.belowKnee : t.profile.aboveKnee}
                        </span>
                      </p>
                    )}
                    {user.lengthUsage && (
                      <p style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '18px',
                        fontWeight: 500,
                        lineHeight: '28px',
                        color: '#192126',
                        margin: 0,
                      }}>
                        <span style={{ fontWeight: 400 }}>{t.profile.usageDuration}:</span>
                        <span style={{ fontWeight: 500, marginLeft: '8px' }}>
                          {user.lengthUsage === 'less_than_6_month' 
                            ? t.profile.lessThan6Months 
                            : user.lengthUsage === 'more_than_1_year'
                            ? t.profile.moreThan1Year
                            : t.profile.moreThan5Years}
                        </span>
                      </p>
                    )}
                  </>
                ) : (
                  <p style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '18px',
                    fontWeight: 500,
                    lineHeight: '28px',
                    color: '#192126',
                    margin: 0,
                  }}>
                    <span style={{ fontWeight: 400 }}>{t.profile.userType}:</span>
                    <span style={{ fontWeight: 500, marginLeft: '8px' }}>
                      {user.userType === 'caregiver' ? t.onboarding.iAmCaregiver :
                       user.userType === 'volunteer' ? t.onboarding.iAmVolunteer :
                       user.userType === 'doctor' ? t.onboarding.iAmDoctor :
                       user.userType === 'practitioner' ? t.onboarding.iAmPractitioner :
                       user.userType}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Uploads Section */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #f2f2f7',
              borderRadius: '30px',
              padding: '20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '26px' }}>
                <h2 style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '22px',
                  fontWeight: 400,
                  lineHeight: '32px',
                  color: '#192126',
                  margin: 0,
                }}>
                  {t.profile.uploads}
                </h2>
                <button 
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#388896';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.color = '#388896';
                  }}
                  style={{
                    background: '#ffffff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '8px 24px',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#388896',
                    cursor: 'pointer',
                    boxShadow: '0px 0px 10px 0px #dddddd',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {t.profile.seeAllPosts}
                </button>
              </div>
              <div style={{ display: 'flex', gap: '20px' }}>
                {uploads.map((upload) => (
                  <div
                    key={upload.id}
                    style={{
                      width: '150px',
                      height: '150px',
                      borderRadius: '30px',
                      background: '#f2f2f7',
                      border: '1px solid #f2f2f7',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Connections Section */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #f2f2f7',
              borderRadius: '30px',
              padding: '20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                <h2 style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '22px',
                  fontWeight: 400,
                  lineHeight: '32px',
                  color: '#192126',
                  margin: 0,
                }}>
                  {t.profile.connections}
                </h2>
                <button 
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#388896';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.color = '#388896';
                  }}
                  style={{
                    background: '#ffffff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '8px 24px',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#388896',
                    cursor: 'pointer',
                    boxShadow: '0px 0px 10px 0px #dddddd',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {t.profile.seeAllConnections}
                </button>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {connections.map((connection) => (
                  <div key={connection.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', width: '150px' }}>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50px',
                      background: '#f2f2f7',
                    }} />
                    <span style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '18px',
                      fontWeight: 500,
                      lineHeight: '28px',
                      color: '#192126',
                      textAlign: 'center',
                    }}>
                      {connection.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests and Activities Section */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #f2f2f7',
              borderRadius: '30px',
              padding: '28px',
            }}>
              <h2 style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '22px',
                fontWeight: 400,
                lineHeight: '32px',
                color: '#192126',
                margin: '0 0 24px 0',
              }}>
                {t.profile.interestsAndActivities}
              </h2>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {user.activities && user.activities.map((activityId) => (
                  <div
                    key={activityId}
                    style={{
                      background: '#ffffff',
                      border: 'none',
                      borderRadius: '15px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0px 0px 10px 0px #dddddd',
                    }}
                  >
                    <img 
                      src={getActivityIcon(activityId)} 
                      alt={activityId} 
                      width="24" 
                      height="24" 
                    />
                    <span style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: '20px',
                      color: '#192126',
                    }}>
                      {getActivityLabel(activityId)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges Faced Section */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #f2f2f7',
              borderRadius: '30px',
              padding: '28px',
            }}>
              <h2 style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '22px',
                fontWeight: 400,
                lineHeight: '32px',
                color: '#192126',
                margin: '0 0 8px 0',
              }}>
                {t.profile.challengesFaced}
              </h2>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {user.mainChallenge && user.mainChallenge.map((challengeId) => (
                  <div
                    key={challengeId}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      width: '131px',
                    }}
                  >
                    <div style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '36px',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0px 0px 10px 0px #dddddd',
                    }}>
                      <img 
                        src={getChallengeIcon(challengeId)} 
                        alt={challengeId} 
                        width="24" 
                        height="24" 
                      />
                    </div>
                    <span style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      color: '#505050',
                      textAlign: 'center',
                    }}>
                      {getChallengeLabel(challengeId)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* My Story Section */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #f2f2f7',
              borderRadius: '30px',
              padding: '26px 18px',
            }}>
              <h2 style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '22px',
                fontWeight: 400,
                lineHeight: '32px',
                color: '#192126',
                margin: '0 0 44px 0',
              }}>
                {t.profile.myStory}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'flex-end' }}>
                {/* Video/Image Space */}
                <div style={{ position: 'relative', width: '100%' }}>
                  <div style={{
                    width: '100%',
                    height: '357px',
                    borderRadius: '30px',
                    background: '#f2f2f7',
                    position: 'relative',
                  }}>
                    {/* Play button overlay */}
                    <button
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0px 0px 10px 0px #dddddd',
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#388896" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Story Text */}
                <div style={{
                  background: '#ffffff',
                  borderRadius: '30px',
                  padding: '20px',
                  width: '100%',
                }}>
                  <p style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    color: '#192126',
                    textAlign: 'justify',
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {user.my_story || 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.   At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet....'}
                  </p>
                </div>

                {/* Read More Button */}
                <button
                  onClick={() => {/* TODO: Open modal */}}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#388896';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.color = '#388896';
                  }}
                  style={{
                    background: '#ffffff',
                    border: 'none',
                    borderRadius: '24px',
                    padding: '8px 24px',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#388896',
                    cursor: 'pointer',
                    boxShadow: '0px 0px 10px 0px #dddddd',
                    width: '130px',
                    height: '46px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {t.profile.readMore}
                </button>
              </div>
            </div>

            {/* Make a Post Section */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #f2f2f7',
              borderRadius: '30px',
              padding: '11px 20px',
            }}>
              <h2 style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '22px',
                fontWeight: 400,
                lineHeight: '32px',
                color: '#192126',
                margin: '0 0 8px 0',
              }}>
                {t.profile.makeAPost}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {/* Post Input */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: '#f2f2f7',
                  }} />
                  <div style={{
                    flex: 1,
                    height: '50px',
                    background: '#f2f2f7',
                    borderRadius: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 29px',
                  }}>
                    <span style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      color: '#979797',
                    }}>
                      {t.profile.shareAThought}
                    </span>
                  </div>
                </div>

                {/* Photo/Video Options */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}>
                    <img src={imageIcon} alt="photo" width="24" height="24" />
                    <span style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      color: '#979797',
                    }}>
                      {t.profile.photo}
                    </span>
                  </button>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}>
                    <img src={videoIcon} alt="video" width="24" height="24" />
                    <span style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      color: '#979797',
                    }}>
                      {t.profile.video}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Community Activities Section */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #f2f2f7',
              borderRadius: '30px',
              padding: '20px',
            }}>
              <h2 style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '22px',
                fontWeight: 400,
                lineHeight: '32px',
                color: '#192126',
                margin: '0 0 20px 0',
              }}>
                {t.profile.communityActivities}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #f2f2f7',
                      borderRadius: '30px',
                      padding: '14px 26px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    {activity.type === 'like' && <img src={heartIcon} alt="like" width="20" height="18" />}
                    {activity.type === 'comment' && (
                      <svg width="20" height="18" viewBox="0 0 24 24" fill="none" stroke="#388896" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    )}
                    {activity.type === 'group' && <img src={communityIcon} alt="group" width="20" height="18" />}
                    {activity.type === 'badge' && (
                      <svg width="20" height="18" viewBox="0 0 24 24" fill="none" stroke="#388896" strokeWidth="2">
                        <circle cx="12" cy="8" r="7" />
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                      </svg>
                    )}
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '16px',
                        fontWeight: 700,
                        lineHeight: '24px',
                        color: '#192126',
                        margin: '0 0 4px 0',
                      }}>
                        {activity.text}
                      </p>
                      <p style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '22px',
                        color: '#192126',
                        margin: 0,
                      }}>
                        {activity.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Log Out and Delete Account Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginTop: '40px',
          padding: isMobile ? '0 20px 40px 20px' : '0 80px 40px 80px',
          justifyContent: 'flex-start',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={async () => {
              try {
                await logout();
                handleNavigate('login');
              } catch (error) {
                console.error('Logout error:', error);
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#388896';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#388896';
            }}
            style={{
              background: '#ffffff',
              border: 'none',
              borderRadius: '26px',
              padding: '8px 24px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              color: '#388896',
              cursor: 'pointer',
              boxShadow: '0px 0px 10px 0px #dddddd',
              height: '48px',
              width: '160px',
              transition: 'all 0.2s ease',
            }}
          >
            {t.profile.logOut}
          </button>
          <button
            onClick={() => {/* TODO: Implement delete account */}}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#388896';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#388896';
            }}
            style={{
              background: '#ffffff',
              border: 'none',
              borderRadius: '26px',
              padding: '8px 24px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              color: '#388896',
              cursor: 'pointer',
              boxShadow: '0px 0px 10px 0px #dddddd',
              height: '48px',
              width: '160px',
              transition: 'all 0.2s ease',
            }}
          >
            {t.profile.deleteAccount}
          </button>
        </div>
      </div>

      {/* Cover Photo Crop Dialog */}
      {coverPhotoPreview && (
        <ImageCropDialog
          open={coverPhotoDialogOpen}
          onOpenChange={(open) => {
            setCoverPhotoDialogOpen(open);
            if (!open) {
              // Clear preview when dialog closes
              setCoverPhotoPreview(null);
            }
          }}
          imageSrc={coverPhotoPreview}
          onCropComplete={uploadCoverPhoto}
          aspect={1280 / 420}
        />
      )}

      {/* Profile Photo Crop Dialog */}
      {profilePhotoPreview && (
        <ImageCropDialog
          open={profilePhotoDialogOpen}
          onOpenChange={setProfilePhotoDialogOpen}
          imageSrc={profilePhotoPreview}
          onCropComplete={uploadProfilePhoto}
          aspect={1}
        />
      )}

      {/* Save Dialog */}
      {showSaveDialog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '30px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)',
          }}>
            <h2 style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '22px',
              fontWeight: 400,
              lineHeight: '32px',
              color: '#192126',
              margin: '0 0 16px 0',
            }}>
              {t.profile.unsavedChanges}
            </h2>
            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '24px',
              color: '#505050',
              margin: '0 0 24px 0',
            }}>
              {t.profile.unsavedChangesMessage}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => handleSaveDialogAction('cancel')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f2f2f7';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #d9d9d9',
                  borderRadius: '24px',
                  padding: '8px 24px',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#192126',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {t.profile.cancel}
              </button>
              <button
                onClick={() => handleSaveDialogAction('discard')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#388896';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.color = '#388896';
                }}
                style={{
                  background: '#ffffff',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '8px 24px',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#388896',
                  cursor: 'pointer',
                  boxShadow: '0px 0px 10px 0px #dddddd',
                  transition: 'all 0.2s ease',
                }}
              >
                {t.profile.discard}
              </button>
              <button
                onClick={() => handleSaveDialogAction('save')}
                disabled={saving}
                style={{
                  background: '#388896',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '8px 24px',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#ffffff',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  boxShadow: '0px 0px 10px 0px #dddddd',
                  transition: 'all 0.2s ease',
                  opacity: saving ? 0.6 : 1,
                }}
              >
                {saving ? t.profile.saving : t.profile.save}
              </button>
        </div>
      </div>
        </div>
      )}
    </div>
  );
}
