import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { ImageCropDialog } from './ImageCropDialog';
import { ViewStoryModal } from './ViewStoryModal';
import { EditStoryModal } from './EditStoryModal';
import { ConnectionsList } from './community/ConnectionsList';
import { ConnectionSearch } from './community/ConnectionSearch';
import { CreatePost } from './community/CreatePost';
import { PostCard } from './community/PostCard';
import { Lightbox } from './community/Lightbox';
import { loadMediaUrl } from '../utils/mediaLoader';
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
    prosthesisType: (user as any)?.prosthesisType || '',
    lengthUsage: (user as any)?.lengthUsage || '',
    activities: (user as any)?.activities || [],
    mainChallenge: (user as any)?.mainChallenge || [],
  });
  const [activitiesModalOpen, setActivitiesModalOpen] = useState(false);
  const [challengesModalOpen, setChallengesModalOpen] = useState(false);

  // Media state
  const [userMedia, setUserMedia] = useState<string[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Story state
  const [userStory, setUserStory] = useState<{
    id: string;
    story_text: string | null;
    media_urls: string[] | null;
    created_at: string;
    updated_at: string;
  } | null>(null);
  const [storyMediaUrl, setStoryMediaUrl] = useState<string | null>(null);
  const [isStoryMediaVideo, setIsStoryMediaVideo] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [viewStoryModalOpen, setViewStoryModalOpen] = useState(false);
  const [editStoryModalOpen, setEditStoryModalOpen] = useState(false);

  // Posts state (identical to UserProfileView)
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [postsPage, setPostsPage] = useState(0);
  const POSTS_PER_PAGE = 10;

  const activityOptions = [
    'rehabilitation',
    'social_life',
    'emotions',
    'pain_relief',
    'work',
    'independence',
    'education',
    'confidence',
    'training',
    'sports',
    'guidance',
    'community',
    'maintenance',
  ];

  const challengeOptions = [
    'fit_comfort',
    'mobility',
    'community',
    'cost_access',
    'training',
    'emotional',
  ];

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
        prosthesisType: (user as any)?.prosthesisType || '',
        lengthUsage: (user as any)?.lengthUsage || '',
        activities: (user as any)?.activities || [],
        mainChallenge: (user as any)?.mainChallenge || [],
      });
    }
  }, [user]);

  // Fetch user story
  useEffect(() => {
    fetchUserStory();
  }, [user?.id]);

  // Fetch user media from posts
  useEffect(() => {
    fetchUserMedia();
    loadUserPosts(); // Load user's posts
  }, [user?.id]);

  const fetchUserMedia = async () => {
    if (!user?.id) return;

    try {
      setLoadingMedia(true);
      
      // Fetch all posts with media from this user
      const { data: posts, error } = await supabase
        .from('posts')
        .select('media_urls')
        .eq('user_id', user.id)
        .not('media_urls', 'is', null)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user media:', error);
        setLoadingMedia(false);
        return;
      }

      if (posts && posts.length > 0) {
        console.log('📸 Fetched posts with media:', posts);
        
        // Flatten all media URLs from all posts
        const allMedia: string[] = [];
        for (const post of posts) {
          if (post.media_urls && Array.isArray(post.media_urls)) {
            console.log('📁 Processing media_urls:', post.media_urls);
            
            for (const mediaPath of post.media_urls) {
              try {
                // Use the cached media loader
                const signedUrl = await loadMediaUrl(mediaPath);
                
                if (signedUrl) {
                  allMedia.push(signedUrl);
                }
              } catch (err) {
                console.error('❌ Error processing media URL:', err);
              }
            }
          }
        }
        
        console.log('📊 Total media loaded:', allMedia.length);
        setUserMedia(allMedia);
      } else {
        console.log('📭 No posts with media found');
        setUserMedia([]);
      }
    } catch (error) {
      console.error('Error fetching user media:', error);
    } finally {
      setLoadingMedia(false);
    }
  };

  const loadUserPosts = async (pageNum: number = 0) => {
    if (!user?.id) return;
    
    setIsLoadingPosts(true);

    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          user_id,
          post_text,
          media_urls,
          created_at,
          location,
          reaction_type,
          like_count,
          comment_count,
          repost_count,
          sarathi_user!posts_user_id_fkey (
            uuid,
            name,
            first_name,
            profile_picture_url
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(pageNum * POSTS_PER_PAGE, (pageNum + 1) * POSTS_PER_PAGE - 1);

      if (error) {
        console.error('Error loading user posts:', error);
        return;
      }

      if (data) {
        const transformedPosts = data.map((post: any) => {
          const postUser = Array.isArray(post.sarathi_user)
            ? post.sarathi_user[0]
            : post.sarathi_user;

          return {
            id: post.id,
            user_id: post.user_id,
            post_text: post.post_text,
            media_urls: post.media_urls,
            created_at: post.created_at,
            location: post.location || null,
            reaction_type: post.reaction_type || null,
            like_count: post.like_count || 0,
            comment_count: post.comment_count || 0,
            repost_count: post.repost_count || 0,
            user_name: postUser?.name || '',
            user_first_name: postUser?.first_name || '',
            user_profile_picture: postUser?.profile_picture_url || null,
          };
        });

        if (pageNum === 0) {
          setPosts(transformedPosts);
        } else {
          setPosts((prev) => [...prev, ...transformedPosts]);
        }

        setHasMorePosts(transformedPosts.length === POSTS_PER_PAGE);
        setPostsPage(pageNum);
      }
    } catch (error) {
      console.error('Error in loadUserPosts:', error);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const handlePostDeleted = () => {
    loadUserPosts(0); // Reload posts from the beginning
  };

  const handleLoadMorePosts = () => {
    loadUserPosts(postsPage + 1);
  };

  const fetchUserStory = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('user_stories')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "no rows returned" - which is fine
        console.error('Error fetching user story:', error);
        return;
      }

      if (data) {
        console.log('📖 User story fetched:', data);
        console.log('📸 Media URLs:', data.media_urls);
        setUserStory(data);
        
        // Load signed URL for first media
        if (data.media_urls && data.media_urls.length > 0) {
          loadStoryMediaUrl(data.media_urls[0]);
        }
      } else {
        setUserStory(null);
        setStoryMediaUrl(null);
      }
    } catch (error) {
      console.error('Error fetching user story:', error);
    }
  };

  // Load signed URL for story preview
  const loadStoryMediaUrl = async (path: string) => {
    // Check if it's a video
    const isVideo = path.match(/\.(mp4|webm|ogg)$/i);
    setIsStoryMediaVideo(!!isVideo);
    
    // Use cache
    const signedUrl = await loadMediaUrl(path);

    if (signedUrl) {
      console.log('🔗 Generated signed URL (cached) for:', path);
      setStoryMediaUrl(signedUrl);
    } else {
      console.error('❌ Failed to load story media');
    }
  };

  // Handle video play
  const handleVideoPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

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

      // Update profile with just the filename (path), not the full URL
      // The loadMediaUrl utility will handle getting signed URLs with caching
      await updateProfile({ cover_picture_url: fileName });
      
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

      // Update profile with just the filename (path), not the full URL
      // The loadMediaUrl utility will handle getting signed URLs with caching
      await updateProfile({ profile_picture_url: fileName });
      
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
        prosthesis_type: editData.prosthesisType || null,
        length_usage: editData.lengthUsage || null,
        activities: editData.activities || [],
        main_challenge: editData.mainChallenge || [],
      } as any);
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
        prosthesisType: (user as any)?.prosthesisType || '',
        lengthUsage: (user as any)?.lengthUsage || '',
        activities: (user as any)?.activities || [],
        mainChallenge: (user as any)?.mainChallenge || [],
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
        editData.my_story !== (user.my_story || '') ||
        editData.prosthesisType !== ((user as any)?.prosthesisType || '') ||
        editData.lengthUsage !== ((user as any)?.lengthUsage || '') ||
        JSON.stringify(editData.activities || []) !== JSON.stringify((user as any)?.activities || []) ||
        JSON.stringify(editData.mainChallenge || []) !== JSON.stringify((user as any)?.mainChallenge || []);
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
      fit_comfort: fitComfortIcon,
      mobility: mobilityIcon,
      community: communityIcon,
      cost_access: costAccessIcon,
      training: trainingIcon,
      emotional: emotionalIcon,
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

  const toggleActivity = (id: string) => {
    setEditData((prev) => {
      const exists = (prev.activities || []).includes(id);
      return {
        ...prev,
        activities: exists ? prev.activities.filter((a: string) => a !== id) : [...(prev.activities || []), id],
      };
    });
  };

  const toggleChallenge = (id: string) => {
    setEditData((prev) => {
      const exists = (prev.mainChallenge || []).includes(id);
      return {
        ...prev,
        mainChallenge: exists ? prev.mainChallenge.filter((c: string) => c !== id) : [...(prev.mainChallenge || []), id],
      };
    });
  };

  // Mock data for uploads and activities (to be replaced with real data later)
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
          top: '352px',
          width: '186px',
          height: '186px',
          overflow: 'visible',
        }}>
          <div
            style={{
              width: '186px',
              height: '186px',
              borderRadius: '50%',
              background: '#ffffff',
              overflow: 'hidden',
              border: '6px solid #ffffff',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={user.profile_picture_url || defaultProfilePic}
              alt={t.profile.profilePicture}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
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
            onClick={isEditing ? handleSave : handleEditToggle}
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
                    {isEditing ? (
                      <select
                        value={editData.prosthesisType}
                        onChange={(e) => setEditData({ ...editData, prosthesisType: e.target.value === '__clear__' ? '' : e.target.value })}
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: '16px',
                          padding: '10px 12px',
                          borderRadius: '12px',
                          border: '1px solid #d9d9d9',
                          outline: 'none',
                        }}
                      >
                        <option value="__clear__">Clear</option>
                        <option value="above_knee">{t.profile.aboveKnee}</option>
                        <option value="below_knee">{t.profile.belowKnee}</option>
                      </select>
                    ) : (
                      editData.prosthesisType && (
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
                            {editData.prosthesisType === 'below_knee' ? t.profile.belowKnee : t.profile.aboveKnee}
                          </span>
                        </p>
                      )
                    )}

                    {isEditing ? (
                      <select
                        value={editData.lengthUsage}
                        onChange={(e) => setEditData({ ...editData, lengthUsage: e.target.value === '__clear__' ? '' : e.target.value })}
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: '16px',
                          padding: '10px 12px',
                          borderRadius: '12px',
                          border: '1px solid #d9d9d9',
                          outline: 'none',
                        }}
                      >
                        <option value="__clear__">Clear</option>
                        <option value="less_than_6_month">{t.profile.lessThan6Months}</option>
                        <option value="more_than_1_year">{t.profile.moreThan1Year}</option>
                        <option value="more_than_5_years">{t.profile.moreThan5Years}</option>
                      </select>
                    ) : (
                      editData.lengthUsage && (
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
                            {editData.lengthUsage === 'less_than_6_month' 
                              ? t.profile.lessThan6Months 
                              : editData.lengthUsage === 'more_than_1_year'
                              ? t.profile.moreThan1Year
                              : t.profile.moreThan5Years}
                          </span>
                        </p>
                      )
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
                  {isEditing ? (
                    <input
                      value={editData.profession}
                      onChange={(e) => setEditData({ ...editData, profession: e.target.value })}
                      style={{
                        flex: 1,
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '24px',
                        color: '#192126',
                        padding: '8px 12px',
                        borderRadius: '12px',
                        border: '1px solid #d9d9d9',
                        outline: 'none',
                      }}
                    />
                  ) : (
                    user.profession && (
                      <span style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '18px',
                        fontWeight: 500,
                        lineHeight: '28px',
                        color: '#192126',
                      }}>
                        {user.profession}
                      </span>
                    )
                  )}
                </div>
                {/* 2nd row: Workplace */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <img src={workIcon} alt="work" width="31" height="31" />
                  {isEditing ? (
                    <input
                      value={editData.workplace}
                      onChange={(e) => setEditData({ ...editData, workplace: e.target.value })}
                      style={{
                        flex: 1,
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '24px',
                        color: '#192126',
                        padding: '8px 12px',
                        borderRadius: '12px',
                        border: '1px solid #d9d9d9',
                        outline: 'none',
                      }}
                    />
                  ) : (
                    user.workplace && (
                      <span style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '18px',
                        fontWeight: 500,
                        lineHeight: '28px',
                        color: '#192126',
                      }}>
                        {t.profile.worksAt} {user.workplace}
                      </span>
                    )
                  )}
                </div>
                {/* 3rd row: Place of Residence */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={locationPrimaryIcon} alt="location" width="25" height="25" />
                  {isEditing ? (
                    <input
                      value={editData.place_of_residence}
                      onChange={(e) => setEditData({ ...editData, place_of_residence: e.target.value })}
                      style={{
                        flex: 1,
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '24px',
                        color: '#192126',
                        padding: '8px 12px',
                        borderRadius: '12px',
                        border: '1px solid #d9d9d9',
                        outline: 'none',
                      }}
                    />
                  ) : (
                    user.place_of_residence && (
                      <span style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '18px',
                        fontWeight: 500,
                        lineHeight: '28px',
                        color: '#192126',
                      }}>
                        {t.profile.from} {user.place_of_residence}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Media Section */}
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
                {userMedia.length > 0 && (
                  <button 
                    onClick={() => {
                      setLightboxIndex(0);
                      setLightboxOpen(true);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#388896';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.color = '#388896';
                      e.currentTarget.style.transform = 'scale(1)';
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
                )}
              </div>
              {loadingMedia ? (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  minHeight: '150px',
                  color: '#888',
                  fontFamily: 'Roboto, sans-serif',
                }}>
                  Loading media...
                </div>
              ) : userMedia.length > 0 ? (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '20px' 
                }}>
                  {userMedia.slice(0, 9).map((mediaUrl, index) => {
                    const isVideo = mediaUrl.includes('.mp4') || mediaUrl.includes('.webm') || mediaUrl.includes('.mov');
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setLightboxIndex(index);
                          setLightboxOpen(true);
                        }}
                        style={{
                          width: '100%',
                          aspectRatio: '1/1',
                          borderRadius: '30px',
                          background: '#f2f2f7',
                          border: '1px solid #f2f2f7',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          position: 'relative',
                        }}
                      >
                        {isVideo ? (
                          <video
                            src={mediaUrl}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <img
                            src={mediaUrl}
                            alt={`Media ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  minHeight: '150px',
                  color: '#888',
                  fontFamily: 'Roboto, sans-serif',
                }}>
                  No media uploaded yet
                </div>
              )}
            </div>

            {/* Connections Section */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #f2f2f7',
              borderRadius: '30px',
              padding: '20px',
            }}>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '22px',
                  fontWeight: 400,
                  lineHeight: '32px',
                  color: '#192126',
                  margin: '0 0 16px 0',
                }}>
                  {t.profile.connections}
                </h2>
                <ConnectionsList />
              </div>
              
              {/* Add Connection Search */}
              <div style={{ marginTop: '20px' }}>
                <ConnectionSearch />
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
              <div
                style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', cursor: isEditing ? 'pointer' : 'default' }}
                onClick={() => isEditing && setActivitiesModalOpen(true)}
              >
                {(isEditing ? editData.activities : (user as any)?.activities || []).map((activityId: string) => (
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
                {isEditing && (editData.activities || []).length === 0 && (
                  <span style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: '#505050',
                  }}>
                    {t.profile.editProfile}
                  </span>
                )}
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
              <div
                style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', cursor: isEditing ? 'pointer' : 'default' }}
                onClick={() => isEditing && setChallengesModalOpen(true)}
              >
                {(isEditing ? editData.mainChallenge : (user as any)?.mainChallenge || []).map((challengeId: string) => (
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
                {isEditing && (editData.mainChallenge || []).length === 0 && (
                  <span style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: '#505050',
                  }}>
                    {t.profile.editProfile}
                  </span>
                )}
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
                <div 
                  style={{ 
                    position: 'relative', 
                    width: '100%',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    if (isEditing) {
                      setEditStoryModalOpen(true);
                    } else if (userStory) {
                      setViewStoryModalOpen(true);
                    } else {
                      // No story exists, open edit modal to create one
                      setEditStoryModalOpen(true);
                    }
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '357px',
                    borderRadius: '30px',
                    background: '#f2f2f7',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {!userStory ? (
                      // Placeholder when no story exists
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '40px',
                        textAlign: 'center',
                      }}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#979797" strokeWidth="1.5">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="m21 15-5-5L5 21" />
                        </svg>
                        <div>
                          <p style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '18px',
                            fontWeight: 500,
                            color: '#192126',
                            margin: '0 0 8px 0',
                          }}>
                            {t.profile.noStoryYet}
                          </p>
                          <p style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '14px',
                            fontWeight: 400,
                            color: '#979797',
                            margin: 0,
                          }}>
                            {t.profile.noStoryDescription}
                          </p>
                        </div>
                        {isEditing && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditStoryModalOpen(true);
                            }}
                            style={{
                              background: '#388896',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '24px',
                              padding: '12px 32px',
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: '16px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              marginTop: '8px',
                            }}
                          >
                            {t.profile.createYourStory}
                          </button>
                        )}
                      </div>
                    ) : (
                      <>
                        {/* Display first media or placeholder */}
                        {userStory.media_urls && userStory.media_urls.length > 0 && storyMediaUrl ? (
                          isStoryMediaVideo ? (
                            <video
                              ref={videoRef}
                              src={storyMediaUrl}
                              onClick={(e) => {
                                if (!isEditing) {
                                  handleVideoPlay(e);
                                }
                              }}
                              onEnded={() => setIsVideoPlaying(false)}
                              onPause={() => setIsVideoPlaying(false)}
                              onPlay={() => setIsVideoPlaying(true)}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                borderRadius: '30px',
                                background: '#000000',
                                cursor: !isEditing ? 'pointer' : 'default',
                              }}
                            />
                          ) : (
                            <img
                              src={storyMediaUrl}
                              alt="Story media"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                borderRadius: '30px',
                                background: '#000000',
                              }}
                            />
                          )
                        ) : null}
                        {/* Play button overlay for view mode */}
                        {!isEditing && isStoryMediaVideo && !isVideoPlaying && (
                          <button
                            onClick={handleVideoPlay}
                            style={{
                              position: 'absolute',
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: '64px',
                              height: '64px',
                              borderRadius: '50%',
                              background: 'rgba(255, 255, 255, 0.9)',
                              border: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              boxShadow: '0px 0px 10px 0px #dddddd',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                            }}
                          >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="#388896">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </button>
                        )}
                        {!isEditing && !isStoryMediaVideo && (
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
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Story Text Preview */}
                {userStory && userStory.story_text && (
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
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 7,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {userStory.story_text}
                    </p>
                  </div>
                )}

                {/* Read More / Edit Button */}
                {(userStory || isEditing) && (
                  <button
                    onClick={() => {
                      if (isEditing) {
                        setEditStoryModalOpen(true);
                      } else {
                        setViewStoryModalOpen(true);
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
                    {isEditing ? t.profile.editStory : t.profile.readMore}
                  </button>
                )}
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
              <CreatePost onPostCreated={() => {
                // Reload posts after creating a new one
                loadUserPosts(0);
              }} />
            </div>

            {/* User Posts */}
            {posts.length > 0 && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '24px' }}>
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onPostDeleted={handlePostDeleted}
                      onNavigate={onNavigate}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMorePosts && (
                  <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <button
                      onClick={handleLoadMorePosts}
                      disabled={isLoadingPosts}
                      onMouseEnter={(e) => {
                        if (!isLoadingPosts) {
                          e.currentTarget.style.background = '#388896';
                          e.currentTarget.style.color = '#ffffff';
                          e.currentTarget.style.borderColor = '#388896';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isLoadingPosts) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#388896';
                          e.currentTarget.style.borderColor = '#e0e0e0';
                        }
                      }}
                      style={{
                        padding: '12px 32px',
                        background: isLoadingPosts ? '#cccccc' : 'transparent',
                        border: isLoadingPosts ? '1px solid #cccccc' : '1px solid #e0e0e0',
                        borderRadius: '24px',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: isLoadingPosts ? '#ffffff' : '#388896',
                        cursor: isLoadingPosts ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {isLoadingPosts ? t.common.loading : 'Load more posts'}
                    </button>
                  </div>
                )}
              </>
            )}
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

      {/* Activities Modal */}
      {activitiesModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }} onClick={() => setActivitiesModalOpen(false)}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '24px',
              maxWidth: '640px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '20px',
              fontWeight: 500,
              margin: '0 0 16px 0',
              color: '#192126',
            }}>
              {t.profile.interestsAndActivities}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {activityOptions.map((id) => (
                <label
                  key={id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '14px',
                    border: '1px solid #d9d9d9',
                    cursor: 'pointer',
                    minWidth: '220px',
                    minHeight: '52px',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={(editData.activities || []).includes(id)}
                    onChange={() => toggleActivity(id)}
                  />
                  <img src={getActivityIcon(id)} alt={id} width={24} height={24} />
                  <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: '#192126' }}>
                    {getActivityLabel(id)}
                  </span>
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button
                onClick={() => setActivitiesModalOpen(false)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #d9d9d9',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                }}
              >
                {t.profile.cancel}
              </button>
              <button
                onClick={() => setActivitiesModalOpen(false)}
                style={{
                  background: '#388896',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                }}
              >
                {t.profile.saveProfile}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Challenges Modal */}
      {challengesModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }} onClick={() => setChallengesModalOpen(false)}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '24px',
              maxWidth: '640px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '20px',
              fontWeight: 500,
              margin: '0 0 16px 0',
              color: '#192126',
            }}>
              {t.profile.challengesFaced}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {challengeOptions.map((id) => (
                <label
                  key={id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '14px',
                    border: '1px solid #d9d9d9',
                    cursor: 'pointer',
                    minWidth: '220px',
                    minHeight: '52px',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={(editData.mainChallenge || []).includes(id)}
                    onChange={() => toggleChallenge(id)}
                  />
                  <img src={getChallengeIcon(id)} alt={id} width={24} height={24} />
                  <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', color: '#192126' }}>
                    {getChallengeLabel(id)}
                  </span>
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button
                onClick={() => setChallengesModalOpen(false)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #d9d9d9',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                }}
              >
                {t.profile.cancel}
              </button>
              <button
                onClick={() => setChallengesModalOpen(false)}
                style={{
                  background: '#388896',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                }}
              >
                {t.profile.saveProfile}
              </button>
            </div>
          </div>
        </div>
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

      {/* View Story Modal */}
      {userStory && (
        <ViewStoryModal
          isOpen={viewStoryModalOpen}
          onClose={() => setViewStoryModalOpen(false)}
          story={userStory}
        />
      )}

      {/* Edit Story Modal */}
      {user && (
        <EditStoryModal
          isOpen={editStoryModalOpen}
          onClose={() => setEditStoryModalOpen(false)}
          userId={user.id}
          existingStory={userStory}
          onSave={fetchUserStory}
          user={user}
        />
      )}

      {/* Media Lightbox */}
      {lightboxOpen && userMedia.length > 0 && (
        <Lightbox
          mediaUrls={userMedia}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
