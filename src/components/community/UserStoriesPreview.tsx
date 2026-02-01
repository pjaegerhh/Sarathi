import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { supabase } from '../../lib/supabase';
import { ViewStoryModal } from '../ViewStoryModal';
import { loadSignedUrl } from '../../utils/mediaLoader';

// Image assets from Figma (valid for 7 days)
const img1 = "https://www.figma.com/api/mcp/asset/d8db5493-6a14-4364-8c2b-a0d33a05d2b9";
const img2 = "https://www.figma.com/api/mcp/asset/fd429f81-4c5e-4889-839d-717e5b3feb99";
const img3 = "https://www.figma.com/api/mcp/asset/e32f80a5-f0e5-4525-a9cf-11f317e15bda";
const img4 = "https://www.figma.com/api/mcp/asset/13bad7de-17fc-4ab2-a6be-22bcdf7c6dc3";

interface UserStory {
  id: string;
  userName: string;
  userInitials: string;
  storyTitle: string;
  imageUrl: string;
  profilePictureUrl?: string;
  isMockup?: boolean;  // Flag to identify mockup stories
}

interface RealUserStory {
  id: string;
  user_id: string;
  story_text: string | null;
  media_urls: string[] | null;
  user: {
    first_name: string;
    name: string;
    profile_picture_url: string | null;
  };
}

// Sample/mockup user stories data (used when we have < 10 real stories)
const mockupStories: UserStory[] = [
  {
    id: '1',
    userName: 'Manisha Rajput',
    userInitials: 'MR',
    storyTitle: '"How yoga changed me"',
    imageUrl: img1,
    isMockup: true,
  },
  {
    id: '2',
    userName: 'Ramesh Raj',
    userInitials: 'RR',
    storyTitle: '"Running is my passion"',
    imageUrl: img2,
    isMockup: true,
  },
  {
    id: '3',
    userName: 'Hakim Ali',
    userInitials: 'HA',
    storyTitle: '"I train for cricket better now"',
    imageUrl: img3,
    isMockup: true,
  },
  {
    id: '4',
    userName: 'Raj Mohan',
    userInitials: 'RM',
    storyTitle: '"I express through art"',
    imageUrl: img4,
    isMockup: true,
  },
  {
    id: '5',
    userName: 'Marcus C.',
    userInitials: 'SM',
    storyTitle: '6 Months Post Surgery',
    imageUrl: img4,
    isMockup: true,
  },
  {
    id: '6',
    userName: 'Raj Mohan',
    userInitials: 'RM',
    storyTitle: '"I express through art"',
    imageUrl: img4,
    isMockup: true,
  },
  {
    id: '7',
    userName: 'Manisha Rajput',
    userInitials: 'MR',
    storyTitle: '"How yoga changed me"',
    imageUrl: img1,
    isMockup: true,
  },
  {
    id: '8',
    userName: 'Ramesh Raj',
    userInitials: 'RR',
    storyTitle: '"Running is my passion"',
    imageUrl: img2,
    isMockup: true,
  },
  {
    id: '9',
    userName: 'Hakim Ali',
    userInitials: 'HA',
    storyTitle: '"I train for cricket better now"',
    imageUrl: img3,
    isMockup: true,
  },
  {
    id: '10',
    userName: 'Marcus C.',
    userInitials: 'SM',
    storyTitle: '6 Months Post Surgery',
    imageUrl: img4,
    isMockup: true,
  },
];

interface UserStoryCardProps {
  story: UserStory;
  onClick?: () => void;
}

const UserStoryCard: React.FC<UserStoryCardProps> = ({ story, onClick }) => {
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  useEffect(() => {
    if (story.profilePictureUrl) {
      loadProfilePicture();
    }
  }, [story.profilePictureUrl]);

  const loadProfilePicture = async () => {
    if (!story.profilePictureUrl) return;

    try {
      // If it's already a full URL (signed URL), use it directly
      if (story.profilePictureUrl.startsWith('http')) {
        setProfilePicUrl(story.profilePictureUrl);
        return;
      }

      // Otherwise, create a signed URL from the file path with cache
      const signedUrl = await loadSignedUrl('profile-media', story.profilePictureUrl);

      if (signedUrl) {
        setProfilePicUrl(signedUrl);
      }
    } catch (error) {
      console.error('Error loading profile picture:', error);
    }
  };

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        minWidth: '128px',
        width: '128px',
        height: '182px',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {/* Card with image and overlay */}
      <div
        style={{
          position: 'relative',
          width: '128px',
          height: '128px',
          borderRadius: '15px',
          overflow: 'hidden',
        }}
      >
        {/* Background Image */}
        <img
          src={story.imageUrl}
          alt={story.userName}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />

        {/* Dark gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)',
            borderRadius: '15px',
          }}
        />

        {/* Profile Button with initials or avatar */}
        <div
          style={{
            position: 'absolute',
            top: '5px',
            left: '4px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {profilePicUrl ? (
            <img
              src={profilePicUrl}
              alt={story.userName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <p
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '24px',
                margin: 0,
                background: 'linear-gradient(180deg, rgba(105, 181, 124, 1) 0%, rgba(56, 136, 150, 1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {story.userInitials}
            </p>
          )}
        </div>

        {/* User name at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 24px',
            height: '27px',
            overflow: 'hidden',
          }}
        >
          <p
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '22px',
              color: '#ffffff',
              margin: 0,
              textAlign: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {story.userName}
          </p>
        </div>
      </div>

      {/* Story title */}
      <p
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '22px',
          color: '#505050',
          margin: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {story.storyTitle}
      </p>
    </div>
  );
};

interface UserStoriesPreviewProps {
  onNavigate?: (page: string, data?: any) => void;
  isMobile?: boolean;
}

export const UserStoriesPreview: React.FC<UserStoriesPreviewProps> = ({ onNavigate, isMobile = false }) => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const [realStories, setRealStories] = useState<UserStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<any | null>(null);
  const [viewStoryModalOpen, setViewStoryModalOpen] = useState(false);
  const storiesPerPage = 5;

  useEffect(() => {
    loadRealUserStories();
  }, []);

  const loadRealUserStories = async () => {
    try {
      const { data, error } = await supabase
        .from('user_stories')
        .select(`
          id,
          user_id,
          story_text,
          media_urls,
          user:sarathi_user!user_stories_user_id_fkey(
            first_name,
            name,
            profile_picture_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading user stories:', error);
        setIsLoading(false);
        return;
      }

      if (data) {
        // Filter for stories with at least one image (checking ALL media files)
        const storiesWithImages = data.filter((story: any) => {
          if (!story.media_urls || story.media_urls.length === 0) {
            return false;
          }
          
          // Check if ANY media file is an image
          const hasImage = story.media_urls.some((mediaUrl: string) => 
            /\.(jpg|jpeg|png|gif|webp)$/i.test(mediaUrl)
          );
          
          return hasImage;
        });

        const transformedStories: UserStory[] = await Promise.all(
          storiesWithImages.map(async (story: any) => {
              const user = Array.isArray(story.user) ? story.user[0] : story.user;
              const firstName = user?.first_name || '';
              const lastName = user?.name || '';
              const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

              // Get first sentence (up to 45 characters)
              let storyTitle = '';
              if (story.story_text) {
                const firstSentence = story.story_text.split(/[.!?]/)[0].trim();
                storyTitle = firstSentence.length > 45 
                  ? firstSentence.substring(0, 45) + '...' 
                  : firstSentence;
              }

              // Find the FIRST image in the media_urls array (skip videos)
              let imageUrl = '';
              if (story.media_urls && story.media_urls.length > 0) {
                const firstImagePath = story.media_urls.find((mediaUrl: string) => 
                  /\.(jpg|jpeg|png|gif|webp)$/i.test(mediaUrl)
                );
                
                if (firstImagePath) {
                  try {
                    const signedUrl = await loadSignedUrl('profile-media', firstImagePath);
                    
                    if (signedUrl) {
                      imageUrl = signedUrl;
                    }
                  } catch (err) {
                    // Skip failed media URLs
                  }
                }
              }

              return {
                id: story.id,
                userName: `${firstName} ${lastName}`.trim(),
                userInitials: initials,
                storyTitle,
                imageUrl,
                profilePictureUrl: user?.profile_picture_url || undefined,
              };
            })
        );

        setRealStories(transformedStories);
      }
    } catch (error) {
      // Silently fail
    } finally {
      setIsLoading(false);
    }
  };

  // Combine real stories with mockup data
  const allStories = [...realStories, ...mockupStories];
  const totalPages = Math.ceil(allStories.length / storiesPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(displayTotalPages - 1, prev + 1));
  };

  const handleViewAll = () => {
    if (onNavigate) {
      onNavigate('all-stories');
    }
  };

  const handleStoryClick = async (storyId: string, isMockup?: boolean) => {
    if (isMockup) {
      // Don't open mockup stories
      return;
    }
    
    // Fetch the full story data from Supabase
    const { data, error } = await supabase
      .from('user_stories')
      .select('*')
      .eq('id', storyId)
      .single();

    if (error) {
      console.error('Error loading story:', error);
      return;
    }

    if (data) {
      setSelectedStory(data);
      setViewStoryModalOpen(true);
    }
  };

  const startIndex = currentPage * storiesPerPage;
  const visibleStories = allStories.slice(startIndex, startIndex + storiesPerPage);

  // Only show mockup stories if we have less than 10 real stories
  const shouldShowMockup = realStories.length < 10;
  const displayStories = shouldShowMockup ? allStories : realStories;
  const displayVisibleStories = displayStories.slice(startIndex, startIndex + storiesPerPage);
  const displayTotalPages = Math.ceil(displayStories.length / storiesPerPage);

  return (
    <div
      style={{
        background: '#ffffff',
        border: '0.8px solid #e0ebe3',
        borderRadius: isMobile ? '20px' : '30px',
        padding: isMobile ? '12px' : '16.8px',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '12px' : '16px',
        width: '100%',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            fontSize: isMobile ? '18px' : '22px',
            lineHeight: isMobile ? '26px' : '32px',
            color: '#192126',
            margin: 0,
          }}
        >
          {t.community.userStories}
        </p>
        <button
          onClick={handleViewAll}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 700,
            fontSize: isMobile ? '14px' : '16px',
            lineHeight: '24px',
            color: '#8ac0ad',
            textDecoration: 'underline',
          }}
        >
          {t.community.viewAll}
        </button>
      </div>

      {/* Scrollable story cards */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          width: '100%',
        }}
      >
        {isLoading ? (
          <div style={{ padding: '40px', textAlign: 'center', width: '100%', color: '#979797' }}>
            {t.community.loadingStories}
          </div>
        ) : displayVisibleStories.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', width: '100%', color: '#979797' }}>
            {t.community.noStoriesYet}
          </div>
        ) : (
          displayVisibleStories.map((story) => (
            <UserStoryCard 
              key={story.id} 
              story={story} 
              onClick={() => handleStoryClick(story.id, story.isMockup)} 
            />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px',
        }}
      >
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          style={{
            background: 'none',
            border: 'none',
            cursor: currentPage === 0 ? 'default' : 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: currentPage === 0 ? 0.3 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          <ChevronLeft size={24} color="#192126" />
        </button>

        {/* Page Indicators */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {Array.from({ length: displayTotalPages }).map((_, index) => (
            <div
              key={index}
              style={{
                width: index === currentPage ? '14px' : '10px',
                height: index === currentPage ? '14px' : '10px',
                borderRadius: '50%',
                background: index === currentPage ? '#8ac0ad' : '#e0e0e0',
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === displayTotalPages - 1}
          style={{
            background: 'none',
            border: 'none',
            cursor: currentPage === displayTotalPages - 1 ? 'default' : 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: currentPage === displayTotalPages - 1 ? 0.3 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          <ChevronRight size={24} color="#192126" />
        </button>
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
};

export default UserStoriesPreview;
