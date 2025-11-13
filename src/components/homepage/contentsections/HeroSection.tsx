import chandonVideo from '../../../assets/video/Chandon 10sek website.mp4';
import dt5Video from '../../../assets/video/DT5 P5 10sek website.mp4';
import manishaVideo from '../../../assets/video/Manisha 10sek website.mp4';
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

// Video configuration
const VIDEOS = [
  { id: 0, src: chandonVideo, name: 'Chandon' },
  { id: 1, src: dt5Video, name: 'DT5' },
  { id: 2, src: manishaVideo, name: 'Manisha' }
];

// Simple Video Controls - no portal, just absolute positioning
function VideoControls({ 
  showLeftChevron, 
  showRightChevron, 
  currentVideoIndex, 
  onPrevious, 
  onNext, 
  onDotClick 
}: {
  showLeftChevron: boolean;
  showRightChevron: boolean;
  currentVideoIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}) {
  return (
    <>
      {/* Left side control - vertically centered at 50% */}
      <div 
        className="absolute z-40"
        style={{ left: '16px', top: '50%', transform: 'translateY(-50%)' }}
      >
        <button
          onClick={onPrevious}
          className={`bg-black/60 hover:bg-black/80 text-white rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-lg transition-opacity ${
            showLeftChevron ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Previous video"
        >
          <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Right side control - vertically centered at 50% */}
      <div 
        className="absolute z-40"
        style={{ right: '16px', top: '50%', transform: 'translateY(-50%)' }}
      >
        <button
          onClick={onNext}
          className={`bg-black/60 hover:bg-black/80 text-white rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-lg transition-opacity ${
            showRightChevron ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Next video"
        >
          <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Video Navigation Dots - Figma Design */}
      <div 
        className="absolute left-1/2 z-40 flex items-center"
        style={{ top: '582px', transform: 'translateX(-50%)', gap: '8px' }}
      >
        {VIDEOS.map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            aria-label={`Go to video ${index + 1}`}
            style={{
              width: index === currentVideoIndex ? '14px' : '10px',
              height: index === currentVideoIndex ? '14px' : '10px',
              borderRadius: '50%',
              backgroundColor: index === currentVideoIndex ? '#FFFFFF' : '#C7C8D5',
              boxShadow: index === currentVideoIndex ? '0 0 10px rgba(221,221,221,1)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: 'none',
              padding: 0
            }}
            onMouseEnter={(e) => {
              if (index !== currentVideoIndex) {
                e.currentTarget.style.backgroundColor = '#a8a9b5';
              }
            }}
            onMouseLeave={(e) => {
              if (index !== currentVideoIndex) {
                e.currentTarget.style.backgroundColor = '#C7C8D5';
              }
            }}
          />
        ))}
      </div>
    </>
  );
}

function ImageSection() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle video end - go to next video
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  // Mouse move inside video area to compute left/right 10%
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!videoRef.current) return;
    const rect = videoRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width > 0 ? rect.width : 1280;
    setShowLeftChevron(x < width * 0.1);
    setShowRightChevron(x > width * 0.9);
  };

  // Hide chevrons when leaving the video area
  const handleMouseLeave = () => {
    setShowLeftChevron(false);
    setShowRightChevron(false);
  };

  // Navigate to previous video
  const goToPrevious = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
  };

  // Navigate to next video
  const goToNext = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  // Handle dot click
  const handleDotClick = (index: number) => {
    setCurrentVideoIndex(index);
  };

  // Reset video when index changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Video play was interrupted (e.g., component unmounted or video removed)
          // This is expected behavior and can be safely ignored
          if (error.name !== 'AbortError') {
            console.debug('Video play interrupted:', error);
          }
        });
      }
    }
    // Cleanup: pause video if component unmounts
    return () => {
      if (video) {
        video.pause();
      }
    };
  }, [currentVideoIndex]);

  return (
    <div 
      className="absolute inset-0 w-full h-full z-30" 
      data-name="Image section"
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 rounded-br-[20px] rounded-tr-[20px]" data-name="Background Image">
        <video 
          ref={videoRef}
          className="absolute max-w-none object-cover rounded-br-[20px] rounded-tr-[20px] size-full" 
          controlsList="nodownload" 
          muted
          playsInline
          src={VIDEOS[currentVideoIndex].src}
          onEnded={handleVideoEnd}
          onMouseMove={handleMouseMove}
          autoPlay
        >
          {/* Fallback message */}
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Video Controls - inside video container so they position correctly */}
      <VideoControls
        showLeftChevron={showLeftChevron}
        showRightChevron={showRightChevron}
        currentVideoIndex={currentVideoIndex}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onDotClick={handleDotClick}
      />
      
      
      {/* Gradient overlay - ensure it never blocks interactions */}
      <div className="pointer-events-none absolute bottom-0 flex items-center justify-center left-0 right-0 top-[60.83%] z-10">
        <div className="flex-none h-[329px] scale-y-[-100%] w-[1280px]">
          <div className="bg-gradient-to-b from-[#ffffff] from-[18.103%] rounded-bl-[20px] rounded-br-[20px] size-full to-[rgba(255,255,255,0)]" data-name="Gradient overlay" />
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();
  const [textScale, setTextScale] = useState(1);

  useEffect(() => {
    const updateTextScale = () => {
      const viewportWidth = window.innerWidth;
      const baseWidth = 1280;
      // Scale text down proportionally when viewport is smaller than 1280px
      const newScale = Math.min(1, viewportWidth / baseWidth);
      setTextScale(newScale);
    };

    updateTextScale();
    window.addEventListener('resize', updateTextScale);
    return () => window.removeEventListener('resize', updateTextScale);
  }, []);

  return (
    <div className="relative size-full" data-name="Hero Section">
      <ImageSection />
      <div 
        className="absolute capitalize flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center leading-[0] left-[62px] text-[#192126] text-[0px] top-[729px] translate-y-[-50%] w-[1150px]" 
        style={{ 
          fontVariationSettings: "'wdth' 100",
          transform: `translateY(-50%) scale(${textScale})`,
          transformOrigin: 'left center'
        }}
      >
        <p className="leading-[66px] mb-0 text-[64px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{t.home.heroTextWithYou}</p>
        <p className="leading-[66px] text-[64px] whitespace-nowrap">
          <span className="text-[#192126]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {t.home.heroTextRedefining}
          </span>
          <span style={{ fontVariationSettings: "'wdth' 100" }}> </span>
          <span className="bg-clip-text bg-gradient-to-b from-[#69b57c] to-[#388896]" style={{ WebkitTextFillColor: "transparent", fontVariationSettings: "'wdth' 100" }}>
            {t.home.heroTextLimitlessPossibilities}
          </span>
        </p>
      </div>
    </div>
  );
}

// Mobile Hero Section
function ImageSectionMobile() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  // Handle video end - go to next video
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  // Navigate to next video
  const goToNext = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  // Navigate to previous video
  const goToPrevious = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
  };

  // Handle dot click
  const handleDotClick = (index: number) => {
    setCurrentVideoIndex(index);
  };

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    // Don't interfere with button clicks
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
    // Show chevrons when user starts touching
    setShowLeftChevron(true);
    setShowRightChevron(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    // Don't interfere with button clicks
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    // Don't interfere with button clicks
    if ((e.target as HTMLElement).closest('button')) {
      touchStartX.current = null;
      touchEndX.current = null;
      return;
    }
    
    if (!touchStartX.current || !touchEndX.current) {
      // Hide chevrons after a delay if no swipe
      setTimeout(() => {
        setShowLeftChevron(false);
        setShowRightChevron(false);
      }, 2000);
      return;
    }
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
    
    // Hide chevrons after swipe
    setTimeout(() => {
      setShowLeftChevron(false);
      setShowRightChevron(false);
    }, 2000);
    
    // Reset touch tracking
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Reset video when index changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Video play was interrupted (e.g., component unmounted or video removed)
          // This is expected behavior and can be safely ignored
          if (error.name !== 'AbortError') {
            console.debug('Video play interrupted:', error);
          }
        });
      }
    }
    // Cleanup: pause video if component unmounts
    return () => {
      if (video) {
        video.pause();
      }
    };
  }, [currentVideoIndex]);

  return (
    <div 
      className="relative w-full h-full z-30" 
      data-name="Image section mobile"
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0" data-name="Background Image">
        <video 
          ref={videoRef}
          className="absolute max-w-none object-cover size-full" 
          controlsList="nodownload" 
          muted
          playsInline
          src={VIDEOS[currentVideoIndex].src}
          onEnded={handleVideoEnd}
          autoPlay
        >
          {/* Fallback message */}
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Video Controls - Mobile: Always clickable, show on touch */}
      <div 
        className="absolute z-40"
        style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            setShowLeftChevron(true);
            setShowRightChevron(true);
            setTimeout(() => {
              setShowLeftChevron(false);
              setShowRightChevron(false);
            }, 2000);
          }}
          className={`bg-black/60 active:bg-black/80 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-lg transition-opacity ${
            showLeftChevron ? 'opacity-100' : 'opacity-60'
          }`}
          style={{ pointerEvents: 'auto' }}
          aria-label="Previous video"
        >
          <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div 
        className="absolute z-40"
        style={{ right: '12px', top: '50%', transform: 'translateY(-50%)' }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            setShowLeftChevron(true);
            setShowRightChevron(true);
            setTimeout(() => {
              setShowLeftChevron(false);
              setShowRightChevron(false);
            }, 2000);
          }}
          className={`bg-black/60 active:bg-black/80 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-lg transition-opacity ${
            showRightChevron ? 'opacity-100' : 'opacity-60'
          }`}
          style={{ pointerEvents: 'auto' }}
          aria-label="Next video"
        >
          <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Video Navigation Dots - Positioned above text, matching desktop proportion */}
      <div 
        className="absolute left-1/2 flex items-center"
        style={{ 
          bottom: '140px', 
          transform: 'translateX(-50%)', 
          gap: '8px',
          zIndex: 50,
          pointerEvents: 'auto'
        }}
      >
        {VIDEOS.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              handleDotClick(index);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
            aria-label={`Go to video ${index + 1}`}
            style={{
              width: index === currentVideoIndex ? '14px' : '10px',
              height: index === currentVideoIndex ? '14px' : '10px',
              borderRadius: '50%',
              backgroundColor: index === currentVideoIndex ? '#FFFFFF' : '#C7C8D5',
              boxShadow: index === currentVideoIndex ? '0 0 10px rgba(221,221,221,1)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: 'none',
              padding: 0,
              pointerEvents: 'auto',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              if (index !== currentVideoIndex) {
                e.currentTarget.style.backgroundColor = '#a8a9b5';
              }
            }}
            onMouseLeave={(e) => {
              if (index !== currentVideoIndex) {
                e.currentTarget.style.backgroundColor = '#C7C8D5';
              }
            }}
          />
        ))}
      </div>
      
      {/* Gradient overlay - Mobile */}
      <div className="pointer-events-none absolute bottom-0 flex items-center justify-center left-0 right-0 z-10">
        <div className="flex-none h-[160px] scale-y-[-100%] w-full">
          <div className="bg-gradient-to-b from-[#ffffff] from-[18.103%] size-full to-[rgba(255,255,255,0)]" data-name="Gradient overlay" />
        </div>
      </div>
    </div>
  );
}

export function HeroSectionMobile() {
  const { t } = useLanguage();

  return (
    <div className="relative w-full" data-name="Hero Section Mobile" style={{ height: '400px', minHeight: '400px' }}>
      <ImageSectionMobile />
      <div 
        className="absolute flex flex-col font-['Roboto:Bold',_sans-serif] font-bold justify-center leading-[0] left-[17px] text-[#192126] text-[0px] w-[285px] h-[90px]" 
        style={{ 
          fontVariationSettings: "'wdth' 100",
          bottom: '29px',
          zIndex: 50
        }}
      >
        <p className="leading-[30px] mb-0 text-[24px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{t.home.heroTextWithYou}</p>
        <p className="leading-[30px] text-[24px] whitespace-nowrap">
          <span style={{ fontVariationSettings: "'wdth' 100" }}>{t.home.heroTextRedefining}</span>
          <span className="bg-clip-text bg-gradient-to-b from-[#69b57c] to-[#388896]" style={{ WebkitTextFillColor: "transparent", fontVariationSettings: "'wdth' 100" }}>
            {t.home.heroTextLimitlessPossibilities}
          </span>
        </p>
      </div>
    </div>
  );
}