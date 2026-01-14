import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

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
}

// Sample user stories data
const userStories: UserStory[] = [
  {
    id: '1',
    userName: 'Manisha Rajput',
    userInitials: 'MR',
    storyTitle: '"How yoga changed me"',
    imageUrl: img1,
  },
  {
    id: '2',
    userName: 'Ramesh Raj',
    userInitials: 'RR',
    storyTitle: '"Running is my passion"',
    imageUrl: img2,
  },
  {
    id: '3',
    userName: 'Hakim Ali',
    userInitials: 'HA',
    storyTitle: '"I train for cricket better now"',
    imageUrl: img3,
  },
  {
    id: '4',
    userName: 'Raj Mohan',
    userInitials: 'RM',
    storyTitle: '"I express through art"',
    imageUrl: img4,
  },
  {
    id: '5',
    userName: 'Marcus C.',
    userInitials: 'SM',
    storyTitle: '6 Months Post Surgery',
    imageUrl: img4,
  },
  {
    id: '6',
    userName: 'Raj Mohan',
    userInitials: 'RM',
    storyTitle: '"I express through art"',
    imageUrl: img4,
  },
  {
    id: '7',
    userName: 'Manisha Rajput',
    userInitials: 'MR',
    storyTitle: '"How yoga changed me"',
    imageUrl: img1,
  },
  {
    id: '8',
    userName: 'Ramesh Raj',
    userInitials: 'RR',
    storyTitle: '"Running is my passion"',
    imageUrl: img2,
  },
  {
    id: '9',
    userName: 'Hakim Ali',
    userInitials: 'HA',
    storyTitle: '"I train for cricket better now"',
    imageUrl: img3,
  },
  {
    id: '10',
    userName: 'Marcus C.',
    userInitials: 'SM',
    storyTitle: '6 Months Post Surgery',
    imageUrl: img4,
  },
];

interface UserStoryCardProps {
  story: UserStory;
  onClick?: () => void;
}

const UserStoryCard: React.FC<UserStoryCardProps> = ({ story, onClick }) => {
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

        {/* Profile Button with initials */}
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
          }}
        >
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

export const UserStoriesPreview: React.FC = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const storiesPerPage = 5;
  const totalPages = Math.ceil(userStories.length / storiesPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handleViewAll = () => {
    // TODO: Navigate to stories page
    console.log('View all stories');
  };

  const handleStoryClick = (storyId: string) => {
    // TODO: Open story detail
    console.log('Story clicked:', storyId);
  };

  const startIndex = currentPage * storiesPerPage;
  const visibleStories = userStories.slice(startIndex, startIndex + storiesPerPage);

  return (
    <div
      style={{
        background: '#ffffff',
        border: '0.8px solid #e0ebe3',
        borderRadius: '30px',
        padding: '16.8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
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
            fontSize: '22px',
            lineHeight: '32px',
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
            fontSize: '16px',
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
        {visibleStories.map((story) => (
          <UserStoryCard key={story.id} story={story} onClick={() => handleStoryClick(story.id)} />
        ))}
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
          {Array.from({ length: totalPages }).map((_, index) => (
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
          disabled={currentPage === totalPages - 1}
          style={{
            background: 'none',
            border: 'none',
            cursor: currentPage === totalPages - 1 ? 'default' : 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: currentPage === totalPages - 1 ? 0.3 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          <ChevronRight size={24} color="#192126" />
        </button>
      </div>
    </div>
  );
};

export default UserStoriesPreview;
