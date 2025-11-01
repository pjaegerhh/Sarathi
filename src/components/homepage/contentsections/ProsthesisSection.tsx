import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import imgBelowKnee from '../../../assets/images/below_knee.png';
import imgAboveKnee from '../../../assets/images/above_knee.png';
import imgWheelchair from '../../../assets/images/wheelchair.png';

// ===========================================
// SECTION 4: PROSTHESIS CATEGORY
// ===========================================
export function ProsthesisSectionDesktop() {
  const [currentIndex, setCurrentIndex] = React.useState(1); // Start at 1 (middle of cloned array)
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [showLeftChevron, setShowLeftChevron] = React.useState(false);
  const [showRightChevron, setShowRightChevron] = React.useState(false);
  const { t } = useLanguage();

  const baseCards = [
    { image: imgBelowKnee, type: 'below' },
    { image: imgAboveKnee, type: 'above' },
    { image: imgWheelchair, type: 'wheelchair' }
  ];

  // Create infinite loop by cloning cards: [...cards, ...cards, ...cards]
  // This allows seamless infinite scrolling
  const cards = [...baseCards, ...baseCards, ...baseCards];

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
      } else if (currentIndex === cards.length - 2) {
        setCurrentIndex(baseCards.length - 2);
      }
    }, 500); // Match transition duration

    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning, baseCards.length, cards.length]);

  function KneeCard({ image, type }: { image: string; type: string }) {
    const [isHovered, setIsHovered] = React.useState(false);
    
    const cardLabels: { [key: string]: string } = {
      'below': t.home.belowKnee,
      'above': t.home.aboveKnee,
      'wheelchair': t.home.wheelchair
    };

    return (
      <div 
        className="h-[244px] relative w-[550px] rounded-[30px] overflow-hidden"
        style={{ 
          boxShadow: 'none',
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent'
        }}
      >
        <img 
          alt="" 
          className="w-full h-full object-cover object-bottom rounded-[30px]"
          style={{ 
            opacity: isHovered ? 0.5 : 1, 
            transition: 'opacity 300ms',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            backgroundColor: 'transparent'
          }}
          src={image} 
        />
        <div 
          className="absolute inset-0 bg-white opacity-20 rounded-[30px]"
          style={{ 
            boxShadow: 'none',
            border: 'none',
            outline: 'none'
          }}
        />
        
        <div 
          style={{ 
            position: 'absolute', 
            top: '174px', 
            right: '-19px', 
            width: '90px', 
            height: '90px', 
            cursor: 'pointer', 
            zIndex: 10,
            border: '0',
            outline: 'none',
            boxShadow: 'none'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg 
            style={{ 
              width: '100%', 
              height: '100%',
              border: '0',
              outline: 'none'
            }} 
            fill="none" 
            viewBox="0 0 90 90"
          >
            <circle cx="45" cy="45" fill="white" r="45" stroke="none" />
          </svg>
        </div>
        
        <div 
          style={{ 
            position: 'absolute',
            top: '195px',
            right: '2px',
            width: '48px',
            height: '48px',
            backgroundColor: isHovered ? '#69B57C' : 'white',
            borderRadius: '50px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'background-color 300ms',
            boxShadow: '0px 0px 10px 0px #dddddd'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24">
            <path d="M8 4L16 12L8 20" stroke={isHovered ? 'white' : '#C7C8D5'} strokeWidth="2" />
          </svg>
        </div>
        
        {isHovered && (
          <div style={{ 
            position: 'absolute',
            bottom: '20px',
            right: '86px',
            color: 'white',
            fontSize: '22px',
            lineHeight: '32px',
            fontWeight: '600',
            zIndex: 100,
            pointerEvents: 'none',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            textAlign: 'right',
            whiteSpace: 'nowrap'
          }}>
            {cardLabels[type]}
          </div>
        )}
      </div>
    );
  }

  // Calculate which base card is currently centered (for indicators)
  const activeIndicatorIndex = ((currentIndex % baseCards.length) + baseCards.length) % baseCards.length;

  return (
    <div className="w-[1146px] flex flex-col gap-[46px] items-center leading-[0]" style={{ minHeight: '360px' }} data-name="Prosthesis Category">
      <div className="flex gap-[265px] items-start relative shrink-0 w-full max-w-[1146px]" data-name="Prosthesis Category">
        <div className="flex flex-col text-h1 justify-center relative shrink-0 text-heading" style={{ maxWidth: '462px', flex: '1 1 auto' }}>
          <p className="leading-[60px]" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{t.home.findWhatFits}</p>
        </div>
        <div className="flex flex-col text-h3 justify-start relative shrink-0 text-body-color text-right" style={{ maxWidth: '419px', flex: '0 0 auto', minHeight: '64px' }}>
          <p className="leading-[32px]" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{t.home.findWhatFitsDesc}</p>
        </div>
      </div>
      <div 
        className="relative w-[1120px] h-[244px]" 
        data-name="Category carousel"
        onMouseEnter={() => {
          setShowLeftChevron(true);
          setShowRightChevron(true);
        }}
        onMouseLeave={() => {
          setShowLeftChevron(false);
          setShowRightChevron(false);
        }}
      >
        {/* Carousel track - shows 2 cards at a time (1120px = 550 + 22 + 550 - 150 for partial view) */}
        <div className="relative w-full h-full overflow-hidden">
          <div 
            className="flex gap-[22px] items-center h-full"
            style={{ 
              width: `${cards.length * (550 + 22) - 22}px`,
              transform: `translateX(-${currentIndex * (550 + 22)}px)`,
              transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
            }}
          >
            {cards.map((card, index) => (
              <KneeCard key={`${card.type}-${index}`} image={card.image} type={card.type} />
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
            className={`bg-white hover:bg-gray-100 text-gray-700 rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-elevation transition-opacity ${
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
            className={`bg-white hover:bg-gray-100 text-gray-700 rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-elevation transition-opacity ${
              showRightChevron ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Next card"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Carousel Indicators - only show 3 dots for the base cards */}
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
                height: index === activeIndicatorIndex ? '14px' : '10px',
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

export function ProsthesisSectionMobile() {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full px-4" data-name="Prosthesis Category">
      <div className="flex flex-col gap-3 items-start leading-[0] relative shrink-0 w-full" data-name="Prosthesis Category">
        <div className="flex flex-col text-h1 justify-center relative shrink-0 text-heading text-nowrap w-full">
          <p className="leading-[60px] whitespace-pre">{t.home.findWhatFits}</p>
        </div>
        <div className="flex flex-col text-h3 justify-center relative shrink-0 text-body-color w-full">
          <p className="leading-[32px]">{t.home.findWhatFitsDesc}</p>
        </div>
      </div>
      <div className="text-body-color text-body">Prosthesis Cards - Mobile TBD</div>
    </div>
  );
}
