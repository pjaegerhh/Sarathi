import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

// User profile images
// Card 1: Manisha Rajput
import manishaImage from '../../../assets/images/manisha.png';
// Card 2: Ramesh Raj
import rameshImage from '../../../assets/images/ramesh.png';
// Card 3: Hakim Ali
import hakimImage from '../../../assets/images/hakim.png';
// Card 4: Raj Mohan
import rajImage from '../../../assets/images/raj.png';

// SVG Icons
import occupationIcon from '../../../assets/svg/occupation.svg';
import peopleIcon from '../../../assets/svg/2ppl.svg';

// ===========================================
// SECTION 8: COMMUNITY/USER PROFILES
// ===========================================
export function CommunitySectionDesktop() {
  const [currentIndex, setCurrentIndex] = React.useState(1); // Start at 1 (middle of cloned array)
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [showLeftChevron, setShowLeftChevron] = React.useState(false);
  const [showRightChevron, setShowRightChevron] = React.useState(false);
  const { t } = useLanguage();

  // Base cards data - 4 user profiles
  const baseCards = [
    {
      image: manishaImage,
      name: t.home.communityCard1Name,
      location: t.home.communityCard1Location,
      verified: true,
      tags: [t.home.tagSkincare, t.home.tagFatigue, t.home.tagPhantomPain, '+5'],
      achievement: t.home.communityCard1Achievement,
      profileType: t.home.communityCard1ProfileType
    },
    {
      image: rameshImage,
      name: t.home.communityCard2Name,
      location: t.home.communityCard2Location,
      verified: false,
      tags: [t.home.tagDailyTips, t.home.tagSkinCare, t.home.tagAthletics, '+2'],
      achievement: t.home.communityCard2Achievement,
      profileType: t.home.communityCard2ProfileType
    },
    {
      image: hakimImage,
      name: t.home.communityCard3Name,
      location: t.home.communityCard3Location,
      verified: false,
      tags: [t.home.tagRehabilitation, t.home.tagSports, t.home.tagCommunity, '+3'],
      achievement: t.home.communityCard3Achievement,
      profileType: t.home.communityCard3ProfileType
    },
    {
      image: rajImage,
      name: t.home.communityCard4Name,
      location: t.home.communityCard4Location,
      verified: false,
      tags: [t.home.tagSkincare, t.home.tagArt, t.home.tagAccessibility, '+2'],
      achievement: t.home.communityCard4Achievement,
      profileType: t.home.communityCard4ProfileType
    }
  ];

  // Create infinite loop by cloning cards: [...cards, ...cards, ...cards]
  const cards = [...baseCards, ...baseCards, ...baseCards];

  // Calculate active indicator index
  const activeIndicatorIndex = React.useMemo(() => {
    const realIndex = currentIndex % baseCards.length;
    return realIndex < 0 ? realIndex + baseCards.length : realIndex;
  }, [currentIndex, baseCards.length]);

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  // Handle the infinite loop reset
  React.useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      setIsTransitioning(false);

      // Reset to equivalent position in the middle set
      if (currentIndex === 0) {
        setCurrentIndex(baseCards.length);
      } else if (currentIndex === cards.length - 3) {
        setCurrentIndex(baseCards.length - 3);
      }
    }, 500); // Match transition duration

    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning, baseCards.length, cards.length]);

  // Card width: 353px
  // Gap reduced by 5px: 43px - 5px = 38px
  const cardWidth = 353;
  const cardGap = 38;

  function UserCard({ card }: { card: typeof baseCards[0] }) {
    const [viewProfileHovered, setViewProfileHovered] = React.useState(false);
    const [connectHovered, setConnectHovered] = React.useState(false);
    
    return (
      <div 
        className="flex flex-col items-start relative shrink-0 rounded-[30px]"
        style={{ width: `${cardWidth}px` }}
        data-name="User Card"
      >
        {/* Image Section */}
        <div 
          className="relative rounded-tl-[30px] rounded-tr-[30px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)] shrink-0 overflow-hidden" 
          style={{ 
            width: '353px',
            height: '256px'
          }}
          data-name="Image"
        >
          <img 
            alt="" 
            className="w-full h-full object-cover pointer-events-none rounded-tl-[30px] rounded-tr-[30px]"
            style={{ 
              objectPosition: 'center center'
            }}
            src={card.image} 
          />
        </div>
        
        {/* Bottom Card Section */}
        <div className="bg-white box-border flex flex-col gap-[10px] items-start px-[9px] py-[19px] relative rounded-bl-[30px] rounded-br-[30px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-full" data-name="Bottom frame">
          <div className="flex flex-col gap-[11px] items-start relative shrink-0 w-[335px]" data-name="Information section">
            <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="User Information">
              {/* Name, Location, Badge */}
              <div className="flex gap-[8px] items-start relative shrink-0" data-name="Name, Location, Badge">
                <div className="flex flex-col gap-[4px] items-start justify-center leading-[0] relative shrink-0 text-nowrap w-[153px]" data-name="Name, Location">
                  <div className="flex flex-col justify-center relative shrink-0 text-heading text-[22px]">
                    <p className="leading-[32px] text-nowrap whitespace-pre">{card.name}</p>
                  </div>
                  <div className="flex flex-col justify-center relative shrink-0 text-[#979797] text-[14px]">
                    <p className="leading-[22px] text-nowrap whitespace-pre">{card.location}</p>
                  </div>
                </div>
                {card.verified && (
                  <div className="relative shrink-0 w-[24px] h-[24px]" data-name="Verified badge">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#388896"/>
                    </svg>
                  </div>
                )}
              </div>
              
              {/* User Details */}
              <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="User details">
                {/* Tags */}
                <div className="flex gap-[24px] items-center relative shrink-0" data-name="Tags">
                  <div className="flex gap-[4px] items-center relative shrink-0" data-name="Tags">
                    {card.tags.slice(0, 3).map((tag, idx) => (
                      <div 
                        key={idx}
                        className="border-[#c7c8d5] border-[0.5px] border-solid box-border flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative rounded-[20px] shrink-0" 
                        data-name="Tag"
                      >
                        <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap">
                          <p className="leading-[22px] whitespace-pre">{tag}</p>
                        </div>
                      </div>
                    ))}
                    {card.tags.length > 3 && (
                      <div className="border-[#c7c8d5] border-[0.5px] border-solid box-border flex gap-[10px] items-center justify-center p-[4px] relative rounded-[100px] shrink-0 w-[30px]" data-name="Tag">
                        <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#c7c8d5] text-[14px] text-nowrap">
                          <p className="leading-[22px] whitespace-pre">{card.tags[3]}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Achievement */}
                <div className="flex gap-[8px] items-center relative shrink-0 w-full" data-name="Profession">
                  <div className="relative shrink-0 w-[24px] h-[24px]" data-name="Achievement icon">
                    <img 
                      src={occupationIcon} 
                      alt="" 
                      className="w-6 h-6 shrink-0" 
                      style={{ 
                        display: 'block',
                        filter: 'brightness(0) saturate(100%) invert(27%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                      }} 
                    />
                  </div>
                  <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-body-color text-[14px] text-nowrap">
                    <p className="leading-[22px] whitespace-pre">{card.achievement}</p>
                  </div>
                </div>
                
                {/* Profile Type */}
                <div className="flex gap-[8px] items-center relative shrink-0 w-full" data-name="Profile type">
                  <div className="relative shrink-0 w-[24px] h-[24px]" data-name="People icon">
                    <img 
                      src={peopleIcon} 
                      alt="" 
                      className="w-6 h-6 shrink-0" 
                      style={{ 
                        display: 'block',
                        filter: 'brightness(0) saturate(100%) invert(27%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                      }} 
                    />
                  </div>
                  <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-body-color text-[14px] text-nowrap">
                    <p className="leading-[22px] whitespace-pre">{card.profileType}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="box-border flex gap-[18px] items-center pl-[10px] pr-0 py-0 relative shrink-0" data-name="Buttons">
              <button 
                className="box-border flex gap-[8px] h-[46px] items-center justify-center px-[24px] py-[8px] relative rounded-[24px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[130px] cursor-pointer transition-colors"
                style={{ 
                  backgroundColor: viewProfileHovered ? '#388896' : '#ffffff',
                  transition: 'background-color 300ms'
                }}
                onMouseEnter={() => setViewProfileHovered(true)}
                onMouseLeave={() => setViewProfileHovered(false)}
                data-name="Primary button desktop"
              >
                <div 
                  className="flex flex-col justify-center leading-[0] relative shrink-0 text-[16px] text-nowrap"
                  style={{ 
                    color: viewProfileHovered ? '#ffffff' : '#388896',
                    transition: 'color 300ms'
                  }}
                >
                  <p className="leading-[24px] whitespace-pre">{t.home.viewProfile}</p>
                </div>
              </button>
              <button 
                className="box-border flex gap-[8px] h-[43px] items-center px-[24px] py-[8px] relative rounded-[20px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 cursor-pointer transition-colors"
                style={{ 
                  backgroundColor: connectHovered ? '#388896' : '#ffffff',
                  transition: 'background-color 300ms'
                }}
                onMouseEnter={() => setConnectHovered(true)}
                onMouseLeave={() => setConnectHovered(false)}
                data-name="text button desktop"
              >
                <div 
                  className="flex flex-col justify-center leading-[0] relative shrink-0 text-[16px] text-nowrap"
                  style={{ 
                    color: connectHovered ? '#ffffff' : '#388896',
                    transition: 'color 300ms'
                  }}
                >
                  <p className="leading-[24px] whitespace-pre">{t.home.connect}</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col gap-[24px] items-start justify-center"
      style={{ width: '1146px', height: '710px', minHeight: '710px', maxHeight: '710px' }}
      data-name="User profiles"
    >
      {/* Quote + Join Now Button */}
      <div className="flex gap-[150px] items-end relative shrink-0 w-full" data-name="Quote + Onboarding option">
        <div className="flex flex-col gap-[12px] items-start leading-[0] relative shrink-0 w-[906px]" data-name="Quote">
          <div className="flex flex-col text-h1 justify-center relative shrink-0 text-heading w-full">
            <p className="leading-[60px]">{t.home.communityTitle}</p>
          </div>
          <div className="flex flex-col text-h3 justify-center relative shrink-0 text-body-color w-full">
            <p className="leading-[32px]">{t.home.communitySubtext}</p>
          </div>
        </div>
        <div className="h-[24px] relative shrink-0 w-[59px]" data-name="Desktop text underline button">
          <div className="absolute bottom-0 flex flex-col font-bold justify-center leading-[0] left-0 right-[18.64%] text-body-color text-[0px] text-nowrap top-0">
            <p className="[text-underline-position:from-font] decoration-solid leading-[24px] text-disabled-primary text-[16px] underline whitespace-pre">
              {t.home.joinCommunity}
            </p>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative"
        style={{ 
          width: '1146px', 
          height: '542px' 
        }}
        data-name="User Cards"
        onMouseEnter={() => {
          setShowLeftChevron(true);
          setShowRightChevron(true);
        }}
        onMouseLeave={() => {
          setShowLeftChevron(false);
          setShowRightChevron(false);
        }}
      >
        {/* Carousel track - shows 3 cards at a time */}
        <div className="relative w-full h-full overflow-hidden">
          <div 
            className="flex items-center h-full"
            style={{ 
              width: `${cards.length * (cardWidth + cardGap) - cardGap}px`,
              transform: `translateX(-${currentIndex * (cardWidth + cardGap)}px)`,
              transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
              gap: `${cardGap}px`,
              paddingLeft: '5px'
            }}
          >
            {cards.map((card, index) => (
              <UserCard key={`${card.name}-${index}`} card={card} />
            ))}
          </div>
        </div>

        {/* Left Chevron */}
        <div 
          className="absolute z-50 pointer-events-auto"
          style={{ left: '16px', top: '50%', transform: 'translateY(-50%)' }}
        >
          <button
            onClick={goToPrevious}
            className={`bg-white hover:bg-gray-100 text-gray-700 rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-[0px_0px_10px_0px_#dddddd] transition-opacity ${
              showLeftChevron ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Previous card"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Right Chevron */}
        <div 
          className="absolute z-50 pointer-events-auto"
          style={{ right: '16px', top: '50%', transform: 'translateY(-50%)' }}
        >
          <button
            onClick={goToNext}
            className={`bg-white hover:bg-gray-100 text-gray-700 rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-[0px_0px_10px_0px_#dddddd] transition-opacity ${
              showRightChevron ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Next card"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Carousel Indicators - show 4 dots for the base cards */}
        <div 
          className="absolute left-1/2 z-40 flex items-center"
          style={{ bottom: '-32px', transform: 'translateX(-50%)', gap: '8px' }}
        >
          {baseCards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isTransitioning) return;
                setIsTransitioning(true);
                setCurrentIndex(index + baseCards.length);
              }}
              aria-label={`Go to card ${index + 1}`}
              style={{
                width: index === activeIndicatorIndex ? '14px' : '10px',
                height: index === activeIndicatorIndex ? '10px' : '10px',
                borderRadius: '50%',
                backgroundColor: index === activeIndicatorIndex ? '#388896' : '#C7C8D5',
                boxShadow: index === activeIndicatorIndex ? '0 0 10px rgba(56,136,150,0.5)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: 'none',
                padding: 0
              }}
              onMouseEnter={(e) => {
                if (index !== activeIndicatorIndex) {
                  e.currentTarget.style.backgroundColor = '#a8a9b5';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== activeIndicatorIndex) {
                  e.currentTarget.style.backgroundColor = '#C7C8D5';
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CommunitySectionMobile() {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col gap-6 items-start justify-center w-full px-4" data-name="User profiles">
      <div className="flex flex-col gap-4 items-start leading-[0] relative shrink-0 w-full" data-name="Quote + Onboarding option">
        <div className="flex flex-col gap-3 items-start leading-[0] relative shrink-0 w-full" data-name="Quote">
          <div className="flex flex-col text-h1 justify-center relative shrink-0 text-heading w-full">
            <p className="leading-[60px]">{t.home.communityTitle}</p>
          </div>
          <div className="flex flex-col text-h3 justify-center relative shrink-0 text-body-color w-full">
            <p className="leading-[32px]">{t.home.communitySubtext}</p>
          </div>
        </div>
        <div className="text-disabled-primary text-[16px] underline">
          {t.home.joinCommunity}
        </div>
      </div>
      <div className="text-body-color text-body">User Profile Cards Grid - Mobile TBD</div>
    </div>
  );
}
