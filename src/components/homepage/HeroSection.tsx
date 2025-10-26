import chandonVideo from '../../assets/video/Chandon 10sek website.mp4';
import dt5Video from '../../assets/video/DT5 P5 10sek website.mp4';
import manishaVideo from '../../assets/video/Manisha 10sek website.mp4';
import React, { useState, useRef, useEffect } from 'react';

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
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
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
        <p className="leading-[66px] mb-0 text-[64px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`With you, `}</p>
        <p className="leading-[66px] text-[64px] whitespace-nowrap">
          <span className="text-[#192126]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Redefining
          </span>
          <span style={{ fontVariationSettings: "'wdth' 100" }}> </span>
          <span className="bg-clip-text bg-gradient-to-b from-[#69b57c] to-[#388896]" style={{ WebkitTextFillColor: "transparent", fontVariationSettings: "'wdth' 100" }}>
            Limitless Possibilities.
          </span>
        </p>
      </div>
    </div>
  );
}