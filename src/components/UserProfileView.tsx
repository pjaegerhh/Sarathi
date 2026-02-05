import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ChevronLeft } from 'lucide-react';
import { Lightbox } from './community/Lightbox';
import { ViewStoryModal } from './ViewStoryModal';
import { PostCard } from './community/PostCard';
import { loadSignedUrl, loadMediaUrl } from '../utils/mediaLoader';
import achievementIcon from '../assets/svg/achievement.svg';
import workIcon from '../assets/svg/work.svg';
import locationIcon from '../assets/svg/location.svg';
import rehabIcon from '../assets/svg/rehab.svg';
import emotionsIcon from '../assets/svg/emotions.svg';
import sociallifeIcon from '../assets/svg/sociallife.svg';
import fitComfortIcon from '../assets/svg/fit_comfort.svg';
import mobilityIcon from '../assets/svg/mobility.svg';
import emotionalIcon from '../assets/svg/emotional.svg';
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
import maintenanceIcon from '../assets/svg/maintenance.svg';

interface UserProfileViewProps {
  userId: string;
  onBack: () => void;
  onNavigate: (page: string, data?: any) => void;
}

interface UserProfile {
  uuid: string;
  first_name: string;
  name: string;
  profile_picture_url?: string;
  cover_picture_url?: string;
  bio?: string;
  place_of_residence?: string;
  profession?: string;
  workplace?: string;
  prosthesisType?: string;
  lengthUsage?: string;
  my_story?: string;
  activities?: string[];
  main_challenge?: string[];  // Database field name with underscore
}

interface Post {
  id: string;
  user_id: string;
  post_text: string | null;
  media_urls: string[] | null;
  like_count: number;
  comment_count?: number;
  repost_count?: number;
  created_at: string;
  user_name: string;
  user_first_name: string;
  user_profile_picture: string | null;
  location?: string | null;
  reaction_type?: string | null;
  mentioned_display_names?: string[] | null;
}

export function UserProfileView({ userId, onBack, onNavigate }: UserProfileViewProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userMedia, setUserMedia] = useState<string[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'none' | 'pending' | 'accepted' | 'self'>('none');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [postsPage, setPostsPage] = useState(0);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [coverPicUrl, setCoverPicUrl] = useState<string | null>(null);
  const [isHoveringBack, setIsHoveringBack] = useState(false);
  const [isHoveringConnect, setIsHoveringConnect] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [viewStoryModalOpen, setViewStoryModalOpen] = useState(false);
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
  const POSTS_PER_PAGE = 10;

  useEffect(() => {
    loadUserProfile();
    loadUserPosts();
    loadUserMedia();
    loadUserConnections();
    loadUserStory();
    checkConnectionStatus();
  }, [userId]);

  const loadUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('sarathi_user')
        .select('*')
        .eq('uuid', userId)
        .single();

      if (error) {
        console.error('Error loading user profile:', error);
        return;
      }

      if (data) {
        setProfile(data);

        // Load profile picture with cache
        if (data.profile_picture_url) {
          const profileUrl = await loadMediaUrl(data.profile_picture_url);
          if (profileUrl) {
            setProfilePicUrl(profileUrl);
          }
        }

        // Load cover picture with cache
        if (data.cover_picture_url) {
          const coverUrl = await loadMediaUrl(data.cover_picture_url);
          if (coverUrl) {
            setCoverPicUrl(coverUrl);
          }
        }
      }
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserPosts = async (pageNum: number = 0) => {
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
          mentioned_display_names,
          sarathi_user!posts_user_id_fkey (
            uuid,
            name,
            first_name,
            profile_picture_url
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(pageNum * POSTS_PER_PAGE, (pageNum + 1) * POSTS_PER_PAGE - 1);

      if (error) {
        console.error('Error loading user posts:', error);
        return;
      }

      if (data) {
        const transformedPosts: Post[] = data.map((post: any) => {
          const user = Array.isArray(post.sarathi_user)
            ? post.sarathi_user[0]
            : post.sarathi_user;

          return {
            id: post.id,
            user_id: post.user_id,
            post_text: post.post_text || null,
            media_urls: post.media_urls || null,
            like_count: post.like_count || 0,
            comment_count: post.comment_count || 0,
            repost_count: post.repost_count || 0,
            created_at: post.created_at,
            user_name: user?.name || '',
            user_first_name: user?.first_name || '',
            user_profile_picture: user?.profile_picture_url || null,
            location: post.location || null,
            reaction_type: post.reaction_type || null,
            mentioned_display_names: post.mentioned_display_names || null,
          };
        });

        if (pageNum === 0) {
          setPosts(transformedPosts);
        } else {
          setPosts([...posts, ...transformedPosts]);
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

  const handlePostClick = (postId: string) => {
    // Navigate to community page with the post ID to scroll to
    if (onNavigate) {
      onNavigate('community', { scrollToPostId: postId });
    }
  };

  const loadUserMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('media_urls')
        .eq('user_id', userId)
        .not('media_urls', 'is', null)
        .order('created_at', { ascending: false });

      if (error) {
        return;
      }

      if (data) {
        const allMedia: string[] = [];
        for (const post of data) {
          if (post.media_urls && Array.isArray(post.media_urls)) {
            allMedia.push(...post.media_urls);
          }
        }
        
        // Load signed URLs for ALL media using cache
        const signedUrls: string[] = [];
        for (const mediaPath of allMedia) {
          try {
            const signedUrl = await loadMediaUrl(mediaPath);
            if (signedUrl) {
              signedUrls.push(signedUrl);
            }
          } catch (err) {
            // Skip failed media URLs
          }
        }
        
        setUserMedia(signedUrls);
      }
    } catch (error) {
      // Silently fail
    }
  };

  const loadUserConnections = async () => {
    try {
      // Load accepted connections for this user
      const { data, error } = await supabase
        .from('connections')
        .select(`
          id,
          status,
          requester:requester_id(uuid, name, first_name, profile_picture_url),
          addressee:addressee_id(uuid, name, first_name, profile_picture_url)
        `)
        .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
        .eq('status', 'accepted')
        .limit(6);

      if (error) {
        console.error('Error loading connections:', error);
        return;
      }

      if (data) {
        // Transform data to get the "other" user in each connection
        const connectionsData = await Promise.all(
          data.map(async (conn: any) => {
            const otherUser = conn.requester.uuid === userId ? conn.addressee : conn.requester;
            
            // Load profile picture if available using cache
            let profilePicUrl = null;
            if (otherUser.profile_picture_url) {
              profilePicUrl = await loadMediaUrl(otherUser.profile_picture_url);
            }
            
            return {
              id: conn.id,
              user_id: otherUser.uuid,
              name: otherUser.name,
              first_name: otherUser.first_name,
              profile_picture_url: profilePicUrl,
            };
          })
        );

        setConnections(connectionsData);
      }
    } catch (error) {
      console.error('Error in loadUserConnections:', error);
    }
  };

  const checkConnectionStatus = async () => {
    if (!user) return;

    // Check if viewing own profile
    if (userId === user.id) {
      setConnectionStatus('self');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('connections')
        .select('status')
        .or(`and(requester_id.eq.${user.id},addressee_id.eq.${userId}),and(requester_id.eq.${userId},addressee_id.eq.${user.id})`)
        .maybeSingle();

      if (error) {
        console.error('Error checking connection status:', error);
        setConnectionStatus('none');
        return;
      }

      if (data) {
        setConnectionStatus(data.status === 'accepted' ? 'accepted' : 'pending');
      } else {
        setConnectionStatus('none');
      }
    } catch (error) {
      console.error('Error in checkConnectionStatus:', error);
      setConnectionStatus('none');
    }
  };

  const handleConnect = async () => {
    if (!user || connectionStatus !== 'none') return;

    try {
      const { error } = await supabase.from('connections').insert({
        requester_id: user.id,
        addressee_id: userId,
        status: 'pending',
      });

      if (error) {
        console.error('Error sending connection request:', error);
        return;
      }

      // Update local state
      setConnectionStatus('pending');
    } catch (error) {
      console.error('Error in handleConnect:', error);
    }
  };

  const loadUserStory = async () => {
    try {
      const { data, error } = await supabase
        .from('user_stories')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "no rows returned" - which is fine
        console.error('Error fetching user story:', error);
        return;
      }

      if (data) {
        setUserStory(data);
        
        // Load signed URL for first media from profile-media bucket
        if (data.media_urls && data.media_urls.length > 0) {
          const firstMedia = data.media_urls[0];
          
          // Check if it's a video
          const isVideo = firstMedia.match(/\.(mp4|webm|ogg)$/i);
          setIsStoryMediaVideo(!!isVideo);
          
          // User stories are stored in profile-media bucket
          const signedUrl = await loadSignedUrl('profile-media', firstMedia);
          
          if (signedUrl) {
            setStoryMediaUrl(signedUrl);
          }
        }
      } else {
        setUserStory(null);
        setStoryMediaUrl(null);
      }
    } catch (error) {
      // Silently fail
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
      'community': communityIcon,
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div
          style={{
            fontFamily: 'Roboto, sans-serif',
            color: '#979797',
          }}
        >
          Loading profile...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div
          style={{
            fontFamily: 'Roboto, sans-serif',
            color: '#979797',
          }}
        >
          Profile not found
        </div>
      </div>
    );
  }

  const userInitials = `${profile.first_name.charAt(0)}${profile.name.charAt(0)}`.toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        {/* Back Button */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '34px',
            zIndex: 10,
          }}
        >
          <button
            onClick={onBack}
            onMouseEnter={() => setIsHoveringBack(true)}
            onMouseLeave={() => setIsHoveringBack(false)}
            style={{
              background: isHoveringBack ? '#388896' : '#fff',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: 'none',
              boxShadow: isHoveringBack
                ? '0px 0px 15px rgba(56, 136, 150, 0.5)'
                : '0px 0px 10px rgba(221, 221, 221, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '10px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
              transform: isHoveringBack ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <ChevronLeft size={24} color={isHoveringBack ? '#ffffff' : '#505050'} />
          </button>
        </div>

        {/* Cover Picture */}
        <div
          style={{
            width: '100%',
            height: '420px',
            background: coverPicUrl ? `url(${coverPicUrl}) center/cover` : 'linear-gradient(135deg, #8AC0AD 0%, #388896 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        />

        {/* Profile Picture */}
        <div
          style={{
            position: 'absolute',
            top: '328px',
            left: '120px',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '6px solid #fff',
            background: profilePicUrl
              ? `url(${profilePicUrl}) center/cover`
              : 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(180deg, rgba(105, 181, 124, 1) 0%, rgba(56, 136, 150, 1) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!profilePicUrl && (
            <span
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                fontSize: '48px',
                color: '#ffffff',
              }}
            >
              {userInitials}
            </span>
          )}
        </div>

        {/* Name and Location - 10px below cover picture (430px) */}
        <div
          style={{
            position: 'absolute',
            left: '320px', // 120px (profile left) + 186px (profile width) + 14px (gap)
            top: '430px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '32px',
                fontWeight: 500,
                lineHeight: '40px',
                color: '#192126',
                margin: 0,
              }}
            >
              {profile.first_name} {profile.name}
            </h1>
            {/* Verified badge */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#388896" />
              <path
                d="M9 12l2 2 4-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={locationIcon} alt="location" width="20" height="20" />
            <span
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                lineHeight: '28px',
                color: '#192126',
              }}
            >
              {profile.place_of_residence || 'India'}
            </span>
          </div>
        </div>

        {/* Connect and Message Buttons */}
        {connectionStatus !== 'self' && (
          <div
            style={{
              position: 'absolute',
              right: '80px',
              top: '458px',
              display: 'flex',
              gap: '18px',
            }}
          >
            <button
              onClick={connectionStatus === 'none' ? handleConnect : undefined}
              disabled={connectionStatus !== 'none'}
              onMouseEnter={() => connectionStatus === 'none' && setIsHoveringConnect(true)}
              onMouseLeave={() => setIsHoveringConnect(false)}
              style={{
                background: connectionStatus === 'none' && isHoveringConnect ? '#388896' : '#fff',
                color: connectionStatus === 'none' ? (isHoveringConnect ? '#ffffff' : '#388896') : '#b0b0b0',
                border: 'none',
                borderRadius: '24px',
                padding: '12px 24px',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '24px',
                cursor: connectionStatus === 'none' ? 'pointer' : 'not-allowed',
                boxShadow: connectionStatus === 'none' && isHoveringConnect
                  ? '0px 0px 15px rgba(56, 136, 150, 0.5)'
                  : '0px 0px 10px rgba(221, 221, 221, 1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease',
                transform: connectionStatus === 'none' && isHoveringConnect ? 'scale(1.1)' : 'scale(1)',
                opacity: connectionStatus === 'none' ? 1 : 0.6,
              }}
            >
              {connectionStatus === 'accepted' ? 'Connected' : connectionStatus === 'pending' ? 'Pending' : 'Connect'}
            </button>
            <button
              style={{
                background: '#fff',
                color: '#388896',
                border: 'none',
                borderRadius: '20px',
                padding: '8px 24px',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '24px',
                cursor: 'pointer',
                boxShadow: '0px 0px 10px rgba(221, 221, 221, 1)',
              }}
            >
              Message
            </button>
          </div>
        )}

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: '#d9d9d9',
            marginTop: '132px',
            marginLeft: '80px',
            marginRight: '80px',
          }}
        />

        {/* Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '538px 1fr',
            gap: '40px',
            padding: '21px 80px',
          }}
        >
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Prosthesis Details */}
            <div
              style={{
                background: '#fff',
                border: '1px solid #f2f2f7',
                borderRadius: '30px',
                padding: '20px',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '18px',
                    lineHeight: '28px',
                    margin: '0 0 12px 0',
                    color: '#192126',
                  }}
                >
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: '22px',
                      lineHeight: '32px',
                    }}
                  >
                    Prosthesis type:
                  </span>{' '}
                  <span style={{ fontWeight: 500 }}>{profile.prosthesisType || 'Below knee'}</span>
                </p>
                <p
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '18px',
                    lineHeight: '28px',
                    margin: 0,
                    color: '#192126',
                  }}
                >
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: '22px',
                      lineHeight: '32px',
                    }}
                  >
                    Usage Duration:
                  </span>{' '}
                  <span style={{ fontWeight: 500 }}>{profile.lengthUsage || 'More than 1 year'}</span>
                </p>
              </div>
            </div>

            {/* About Section */}
            <div
              style={{
                background: '#fff',
                border: '1px solid #f2f2f7',
                borderRadius: '30px',
                padding: '20px',
              }}
            >
              <h2
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 400,
                  fontSize: '22px',
                  lineHeight: '32px',
                  margin: '0 0 20px 0',
                  color: '#192126',
                }}
              >
                About
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {profile.profession && (
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                    <img src={achievementIcon} alt="" style={{ width: '24px', height: '24px' }} />
                    <p
                      style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 500,
                        fontSize: '18px',
                        lineHeight: '28px',
                        margin: 0,
                        color: '#192126',
                      }}
                    >
                      {profile.profession}
                    </p>
                  </div>
                )}
                {profile.workplace && (
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                    <img src={workIcon} alt="" style={{ width: '24px', height: '24px' }} />
                    <p
                      style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 500,
                        fontSize: '18px',
                        lineHeight: '28px',
                        margin: 0,
                        color: '#192126',
                      }}
                    >
                      Works at {profile.workplace}
                    </p>
                  </div>
                )}
                {profile.place_of_residence && (
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img src={locationIcon} alt="" style={{ width: '24px', height: '24px' }} />
                    <p
                      style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 500,
                        fontSize: '18px',
                        lineHeight: '28px',
                        margin: 0,
                        color: '#192126',
                      }}
                    >
                      From {profile.place_of_residence}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Media Section */}
            {userMedia.length > 0 && (
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #f2f2f7',
                  borderRadius: '30px',
                  padding: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '26px',
                  }}
                >
                  <h2
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 400,
                      fontSize: '22px',
                      lineHeight: '32px',
                      margin: 0,
                      color: '#192126',
                    }}
                  >
                    {profile.first_name}'s Media
                  </h2>
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
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.color = '#388896';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    style={{
                      background: '#fff',
                      border: 'none',
                      padding: '8px 24px',
                      borderRadius: '20px',
                      boxShadow: '0px 0px 10px rgba(221, 221, 221, 1)',
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 700,
                      fontSize: '16px',
                      color: '#388896',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    See all Media
                  </button>
                </div>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '20px' 
                }}>
                  {userMedia.slice(0, 9).map((url, index) => {
                    const isVideo = url.includes('.mp4') || url.includes('.webm') || url.includes('.mov');
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
                          border: '1px solid #f2f2f7',
                          overflow: 'hidden',
                          cursor: 'pointer',
                        }}
                      >
                        {isVideo ? (
                          <video
                            src={url}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <img
                            src={url}
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
              </div>
            )}

            {/* Connections Section */}
            {connections.length > 0 && (
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #f2f2f7',
                  borderRadius: '30px',
                  padding: '20px',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                    fontSize: '22px',
                    lineHeight: '32px',
                    margin: '0 0 24px 0',
                    color: '#192126',
                  }}
                >
                  Connections
                </h2>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '20px' 
                }}>
                  {connections.map((connection) => {
                    const initials = `${connection.first_name?.[0] || ''}${connection.name?.[0] || ''}`.toUpperCase();
                    return (
                      <div
                        key={connection.id}
                        onClick={() => {
                          onNavigate('user-profile', { 
                            userId: connection.user_id, 
                            previousPage: 'user-profile' 
                          });
                        }}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        {/* Avatar */}
                        <div
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            background: connection.profile_picture_url 
                              ? 'transparent' 
                              : 'linear-gradient(135deg, #8AC0AD 0%, #388896 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid #f2f2f7',
                          }}
                        >
                          {connection.profile_picture_url ? (
                            <img
                              src={connection.profile_picture_url}
                              alt={`${connection.first_name} ${connection.name}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          ) : (
                            <span
                              style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '24px',
                                fontWeight: 600,
                                color: '#ffffff',
                              }}
                            >
                              {initials}
                            </span>
                          )}
                        </div>
                        
                        {/* Name */}
                        <div
                          style={{
                            textAlign: 'center',
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#192126',
                            lineHeight: '20px',
                          }}
                        >
                          {connection.first_name} {connection.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Interests and Activities */}
            {profile.activities && profile.activities.length > 0 && (
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #f2f2f7',
                  borderRadius: '30px',
                  padding: '28px',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                    fontSize: '22px',
                    lineHeight: '32px',
                    margin: '0 0 24px 0',
                    color: '#192126',
                  }}
                >
                  {t.profile.interestsAndActivities}
                </h2>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  {profile.activities.map((activity, index) => (
                    <div
                      key={index}
                      style={{
                        background: '#fff',
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                        padding: '8px',
                        borderRadius: '15px',
                        boxShadow: '0px 0px 10px rgba(221, 221, 221, 1)',
                      }}
                    >
                      <img src={getActivityIcon(activity)} alt="" style={{ width: '24px', height: '24px' }} />
                      <span
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontWeight: 500,
                          fontSize: '14px',
                          lineHeight: '20px',
                          color: '#192126',
                        }}
                      >
                        {getActivityLabel(activity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges Faced */}
            {profile.main_challenge && profile.main_challenge.length > 0 && (
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #f2f2f7',
                  borderRadius: '30px',
                  padding: '28px',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                    fontSize: '22px',
                    lineHeight: '32px',
                    margin: '0 0 8px 0',
                    color: '#192126',
                  }}
                >
                  {t.profile.challengesFaced}
                </h2>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  {profile.main_challenge.map((challenge, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        width: '131px',
                      }}
                    >
                      <div
                        style={{
                          width: '45px',
                          height: '45px',
                          borderRadius: '36px',
                          background: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0px 0px 10px 0px #dddddd',
                        }}
                      >
                        <img src={getChallengeIcon(challenge)} alt="" style={{ width: '24px', height: '24px' }} />
                      </div>
                      <p
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '22px',
                          color: '#505050',
                          textAlign: 'center',
                          margin: 0,
                        }}
                      >
                        {getChallengeLabel(challenge)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* User Story */}
            {(userStory || profile.my_story) && (
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #f2f2f7',
                  borderRadius: '30px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                    fontSize: '22px',
                    lineHeight: '32px',
                    margin: 0,
                    color: '#192126',
                  }}
                >
                  {profile.first_name}'s Story
                </h2>
                
                {/* Story media preview */}
                {storyMediaUrl && (
                  <div
                    style={{
                      width: '100%',
                      height: '357px',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      background: '#000000',
                      position: 'relative',
                    }}
                  >
                    {isStoryMediaVideo ? (
                      <video
                        ref={videoRef}
                        src={storyMediaUrl}
                        onClick={handleVideoPlay}
                        onEnded={() => setIsVideoPlaying(false)}
                        onPause={() => setIsVideoPlaying(false)}
                        onPlay={() => setIsVideoPlaying(true)}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          cursor: 'pointer',
                        }}
                      />
                    ) : (
                      <img
                        src={storyMediaUrl}
                        alt="Story preview"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    )}
                    
                    {/* Play button overlay for video */}
                    {isStoryMediaVideo && !isVideoPlaying && (
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
                  </div>
                )}
                
                {/* Story text preview */}
                <div
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '22px',
                    color: '#505050',
                  }}
                >
                  {userStory?.story_text 
                    ? userStory.story_text.substring(0, 150) + (userStory.story_text.length > 150 ? '...' : '')
                    : profile.my_story?.substring(0, 150) + (profile.my_story && profile.my_story.length > 150 ? '...' : '')
                  }
                </div>
                
                {/* Read more button */}
                {(userStory || (profile.my_story && profile.my_story.length > 150)) && (
                  <button
                    onClick={() => setViewStoryModalOpen(true)}
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
                      borderRadius: '24px',
                      padding: '8px 24px',
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#388896',
                      cursor: 'pointer',
                      boxShadow: '0px 0px 10px 0px #dddddd',
                      alignSelf: 'flex-end',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {t.profile.readMore}
                  </button>
                )}
              </div>
            )}

            {/* User Posts */}
            {posts.length > 0 && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '30px' }}>
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onPostDeleted={handlePostDeleted}
                      onNavigate={onNavigate}
                      readOnly={true}
                      onPostClick={handlePostClick}
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
      </div>

      {/* View Story Modal */}
      {userStory && (
        <ViewStoryModal
          isOpen={viewStoryModalOpen}
          onClose={() => setViewStoryModalOpen(false)}
          story={userStory}
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
