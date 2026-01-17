import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ViewStoryModal } from './ViewStoryModal';
import { MapPin } from 'lucide-react';
import { loadSignedUrl } from '../utils/mediaLoader';
import achievementIcon from '../assets/svg/achievement.svg';
import workIcon from '../assets/svg/work.svg';
import fitComfortIcon from '../assets/svg/fit_comfort.svg';
import mobilityIcon from '../assets/svg/mobility.svg';
import emotionalIcon from '../assets/svg/emotional.svg';
import communityIcon from '../assets/svg/community.svg';
import costAccessIcon from '../assets/svg/cost_access.svg';
import trainingIcon from '../assets/svg/training.svg';

interface AllStoriesPageProps {
  onNavigate: (page: string, data?: any) => void;
}

interface UserStory {
  id: string;
  user_id: string;
  story_text: string | null;
  media_urls: string[] | null;
  created_at: string;
  updated_at: string;
  user: {
    first_name: string;
    name: string;
    profile_picture_url: string | null;
    place_of_residence: string | null;
    profession: string | null;
    workplace: string | null;
    main_challenge: string[] | null;
  };
  firstImageUrl?: string;
  isConnected?: boolean;
}

export function AllStoriesPage({ onNavigate }: AllStoriesPageProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [stories, setStories] = useState<UserStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<any | null>(null);
  const [viewStoryModalOpen, setViewStoryModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      loadAllStories();
    }
  }, [user]);

  const loadAllStories = async () => {
    if (!user) return;

    try {
      console.log('🔍 Loading all stories for user:', user.id);
      
      const { data, error } = await supabase
        .from('user_stories')
        .select(`
          id,
          user_id,
          story_text,
          media_urls,
          created_at,
          updated_at,
          sarathi_user!user_stories_user_id_fkey (
            first_name,
            name,
            profile_picture_url,
            place_of_residence,
            profession,
            workplace,
            main_challenge
          )
        `)
        .order('created_at', { ascending: false });

      console.log('📚 Stories query result:', { data, error });

      if (error) {
        console.error('Error loading stories:', error);
        return;
      }

      if (data) {
        console.log(`✅ Found ${data.length} stories`);
        
        // Transform and get first image + connection status for each story
        const transformedStories = await Promise.all(
          data.map(async (story: any) => {
            const storyUser = Array.isArray(story.sarathi_user)
              ? story.sarathi_user[0]
              : story.sarathi_user;

            console.log('👤 Processing story for user:', storyUser?.first_name, storyUser?.name);

            // Get first media URL
            let firstImageUrl = '';
            if (story.media_urls && story.media_urls.length > 0) {
              console.log('📸 Story has media:', story.media_urls);
              // Find first image (skip videos)
              for (const mediaUrl of story.media_urls) {
                const isImage = mediaUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);
                if (isImage) {
                  console.log('🖼️ Loading image:', mediaUrl);
                  // Load signed URL with cache
                  const signedUrl = await loadSignedUrl('profile-media', mediaUrl);
                  
                  if (signedUrl) {
                    firstImageUrl = signedUrl;
                    console.log('✅ Image URL loaded (cached)');
                    break;
                  }
                }
              }
            }

            // Check connection status (skip if it's the user's own story)
            let isConnected = false;
            if (story.user_id !== user.id) {
              const { data: connectionData } = await supabase
                .from('connections')
                .select('status')
                .or(`and(requester_id.eq.${user.id},addressee_id.eq.${story.user_id}),and(requester_id.eq.${story.user_id},addressee_id.eq.${user.id})`)
                .eq('status', 'accepted')
                .maybeSingle();

              isConnected = !!connectionData;
            }

            return {
              id: story.id,
              user_id: story.user_id,
              story_text: story.story_text,
              media_urls: story.media_urls,
              created_at: story.created_at,
              updated_at: story.updated_at,
              user: {
                first_name: storyUser?.first_name || '',
                name: storyUser?.name || '',
                profile_picture_url: storyUser?.profile_picture_url || null,
                place_of_residence: storyUser?.place_of_residence || null,
                profession: storyUser?.profession || null,
                workplace: storyUser?.workplace || null,
                main_challenge: storyUser?.main_challenge || null,
              },
              firstImageUrl,
              isConnected,
            };
          })
        );

        console.log('✅ Transformed stories:', transformedStories);
        setStories(transformedStories);
      }
    } catch (error) {
      console.error('Error in loadAllStories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStoryClick = (story: UserStory) => {
    setSelectedStory(story);
    setViewStoryModalOpen(true);
  };

  const handleViewProfile = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    onNavigate('user-profile', { userId });
  };

  const handleConnect = async (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    
    if (!user) return;

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
      setStories(stories.map(story => 
        story.user_id === userId 
          ? { ...story, isConnected: true }
          : story
      ));
    } catch (error) {
      console.error('Error in handleConnect:', error);
    }
  };

  // Get challenge icon
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

  // Get challenge label
  const getChallengeLabel = (challengeId: string) => {
    const challengeMap: Record<string, string> = {
      'fit_comfort': t.onboarding?.fitAndComfort || 'Fit & Comfort',
      'mobility': t.onboarding?.mobility || 'Mobility',
      'community': t.onboarding?.community || 'Community',
      'cost_access': t.onboarding?.costAndAccess || 'Cost & Access',
      'training': t.onboarding?.training || 'Training',
      'emotional': t.onboarding?.emotionalWellbeing || 'Emotional',
    };
    return challengeMap[challengeId] || challengeId;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', paddingTop: '96px' }}>
      {/* Main Container */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 80px 24px 80px',
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => onNavigate('community')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#388896',
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
            cursor: 'pointer',
            padding: '0',
            marginBottom: '16px',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Title and Subtitle */}
        <h1
          style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#192126',
            margin: '0 0 8px 0',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          User Stories
        </h1>
        <p
          style={{
            fontSize: '16px',
            fontWeight: '400',
            color: '#9CA3AF',
            margin: '0 0 40px 0',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          Meet inspiring members of our prosthesis community
        </p>

        {/* Stories Grid */}
        {isLoading ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              color: '#979797',
            }}
          >
            {t.common.loading}
          </div>
        ) : stories.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              color: '#979797',
            }}
          >
            No stories yet
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(353px, 1fr))',
              gap: '24px',
            }}
          >
            {stories.map((story) => (
              <div
                key={story.id}
                style={{
                  width: '353px',
                  minHeight: '518px',
                  background: '#ffffff',
                  borderRadius: '30px',
                  overflow: 'hidden',
                  boxShadow: '0px 0px 10px 0px #dddddd',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onClick={() => handleStoryClick(story)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0px 0px 10px 0px #dddddd';
                }}
              >
                {/* Story Image - 270px height */}
                {story.firstImageUrl ? (
                  <div
                    style={{
                      width: '100%',
                      height: '270px',
                      position: 'relative',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={story.firstImageUrl}
                      alt="Story"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '270px',
                      background: 'linear-gradient(135deg, #8AC0AD 0%, #388896 100%)',
                      flexShrink: 0,
                    }}
                  />
                )}

                {/* Card Content - Bottom Frame */}
                <div 
                  style={{ 
                    padding: '24px 24px 19px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {/* Name */}
                  <h3
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 700,
                      fontSize: '20px',
                      lineHeight: '28px',
                      color: '#192126',
                      margin: 0,
                    }}
                  >
                    {story.user.first_name} {story.user.name}
                  </h3>

                  {/* Location */}
                  {story.user.place_of_residence && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <MapPin size={16} color="#979797" />
                      <span
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '22px',
                          color: '#979797',
                        }}
                      >
                        {story.user.place_of_residence}
                      </span>
                    </div>
                  )}

                  {/* Challenges Faced */}
                  {story.user.main_challenge && story.user.main_challenge.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px',
                      }}
                    >
                      {story.user.main_challenge.slice(0, 2).map((challenge, index) => (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: '#e0ebe3',
                            padding: '6px 12px',
                            borderRadius: '12px',
                          }}
                        >
                          <img
                            src={getChallengeIcon(challenge)}
                            alt={challenge}
                            width="16"
                            height="16"
                          />
                          <span
                            style={{
                              fontFamily: 'Roboto, sans-serif',
                              fontWeight: 400,
                              fontSize: '12px',
                              lineHeight: '20px',
                              color: '#388896',
                            }}
                          >
                            {getChallengeLabel(challenge)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Profession with icon */}
                  {story.user.profession && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <img src={achievementIcon} alt="profession" width="20" height="20" />
                      <span
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '22px',
                          color: '#505050',
                        }}
                      >
                        {story.user.profession}
                      </span>
                    </div>
                  )}

                  {/* Workplace with icon */}
                  {story.user.workplace && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <img src={workIcon} alt="workplace" width="20" height="20" />
                      <span
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '22px',
                          color: '#979797',
                        }}
                      >
                        {story.user.workplace}
                      </span>
                    </div>
                  )}

                  {/* Buttons Row */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '12px',
                    }}
                  >
                    {/* View Profile Button */}
                    <button
                      onClick={(e) => handleViewProfile(e, story.user_id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#388896';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#ffffff';
                        e.currentTarget.style.color = '#388896';
                      }}
                      style={{
                        flex: 1,
                        background: '#ffffff',
                        border: 'none',
                        borderRadius: '24px',
                        padding: '10px 20px',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#388896',
                        cursor: 'pointer',
                        boxShadow: '0px 0px 10px 0px #dddddd',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      View Profile
                    </button>

                    {/* Connect Button */}
                    {story.user_id !== user?.id && (
                      <button
                        onClick={!story.isConnected ? (e) => handleConnect(e, story.user_id) : undefined}
                        disabled={story.isConnected}
                        onMouseEnter={(e) => {
                          if (!story.isConnected) {
                            e.currentTarget.style.background = '#388896';
                            e.currentTarget.style.color = '#ffffff';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!story.isConnected) {
                            e.currentTarget.style.background = '#ffffff';
                            e.currentTarget.style.color = story.isConnected ? '#b0b0b0' : '#388896';
                          }
                        }}
                        style={{
                          flex: 1,
                          background: '#ffffff',
                          border: 'none',
                          borderRadius: '24px',
                          padding: '10px 20px',
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: story.isConnected ? '#b0b0b0' : '#388896',
                          cursor: story.isConnected ? 'not-allowed' : 'pointer',
                          boxShadow: '0px 0px 10px 0px #dddddd',
                          transition: 'all 0.2s ease',
                          opacity: story.isConnected ? 0.6 : 1,
                        }}
                      >
                        {story.isConnected ? 'Connected' : 'Connect'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Story Modal */}
      {selectedStory && (
        <ViewStoryModal
          isOpen={viewStoryModalOpen}
          onClose={() => setViewStoryModalOpen(false)}
          story={selectedStory}
        />
      )}
    </div>
  );
}
