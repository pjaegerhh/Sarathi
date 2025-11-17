import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import govCentersImage from '../../../assets/images/govcenters.png';
import ngoCentersImage from '../../../assets/images/ngocenters.png';
import privateClinicsImage from '../../../assets/images/privateclinics.png';
import LocationIcon from '../../../assets/svg/location.svg';
import CenterTypeIcon from '../../../assets/svg/centertype.svg';
import RupeeIcon from '../../../assets/svg/rupee.svg';
import HeartIcon from '../../../assets/svg/heart.svg';

// ===========================================
// SECTION 6: SERVICE CENTERS
// ===========================================
export function ServiceCentersSectionDesktop() {
  const { t } = useLanguage();
  function LocationCard({ image, location, title, subtitle, features }: {
    image: string;
    location: string;
    title: string;
    subtitle: string;
    features: { iconType: 'centertype' | 'rupee' | 'heart'; text: string }[];
  }) {
    const [isHovered, setIsHovered] = React.useState(false);
    return (
      <div className="relative bg-white rounded-[30px] shadow-[0px_0px_10px_0px_#dddddd]" style={{ width: '360px', height: '570px', overflow: 'hidden' }}>
        {/* Image Section */}
        <div className="relative h-[296px] overflow-hidden">
          <img alt="" className="w-full h-full object-cover" src={image} />
        </div>
        
        {/* Location Badge */}
        <div className="absolute bg-white flex gap-2 items-center px-2 py-2 rounded-[8px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)]" style={{ top: '14px', left: '48.5px', zIndex: 10 }}>
          <img 
            src={LocationIcon} 
            alt="" 
            className="w-6 h-6" 
            style={{ display: 'block', width: '24px', height: '24px', flexShrink: 0 }} 
          />
          <span className="text-[14px] text-[#505050] leading-[22px] whitespace-nowrap">{location}</span>
        </div>
        
        {/* Content Section */}
        <div className="px-4 pt-6 pb-10 flex flex-col gap-3">
          <h3 className="text-h3 text-heading leading-[32px]">{title}</h3>
          <p className="text-body text-body-color leading-[22px]">{subtitle}</p>
          
          <div className="flex flex-col gap-3 mt-2">
            {features.map((feature, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                {feature.iconType === 'centertype' && (
                  <img 
                    src={CenterTypeIcon} 
                    alt="" 
                    className="w-6 h-6 shrink-0" 
                    style={{ 
                      display: 'block',
                      width: '24px',
                      height: '24px',
                      flexShrink: 0,
                      filter: 'brightness(0) saturate(100%) invert(73%) sepia(44%) saturate(650%) hue-rotate(110deg) brightness(94%) contrast(86%)'
                    }} 
                  />
                )}
                {feature.iconType === 'rupee' && (
                  <img 
                    src={RupeeIcon} 
                    alt="" 
                    className="w-6 h-6 shrink-0" 
                    style={{ 
                      display: 'block',
                      width: '24px',
                      height: '24px',
                      flexShrink: 0,
                      filter: 'brightness(0) saturate(100%) invert(73%) sepia(44%) saturate(650%) hue-rotate(110deg) brightness(94%) contrast(86%)'
                    }} 
                  />
                )}
                {feature.iconType === 'heart' && (
                  <img 
                    src={HeartIcon} 
                    alt="" 
                    className="w-6 h-6 shrink-0" 
                    style={{ 
                      display: 'block',
                      width: '24px',
                      height: '24px',
                      flexShrink: 0,
                      filter: 'brightness(0) saturate(100%) invert(73%) sepia(44%) saturate(650%) hue-rotate(110deg) brightness(94%) contrast(86%)'
                    }} 
                  />
                )}
                <span className="text-body text-body-color leading-[22px]">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Arrow Button */}
        <button
          className="absolute flex items-center justify-center rounded-full cursor-pointer"
          style={{
            right: '20px',
            bottom: '20px',
            width: '48px',
            height: '48px',
            backgroundColor: isHovered ? '#69B57C' : 'white',
            padding: '12px',
            boxShadow: '0px 0px 10px 0px #dddddd',
            transition: 'background-color 300ms',
            zIndex: 10
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24">
            <path d="M8 4L16 12L8 20" stroke={isHovered ? 'white' : '#C7C8D5'} strokeWidth="2" />
          </svg>
        </button>
      </div>
    );
  }

  const centers = [
    {
      image: govCentersImage,
      location: t.home.govCentersLocation,
      title: t.home.govCentersTitle,
      subtitle: t.home.govCentersSubtitle,
      features: [
        { iconType: 'centertype' as const, text: t.home.govCentersFeature1 },
        { iconType: 'rupee' as const, text: t.home.govCentersFeature2 },
        { iconType: 'heart' as const, text: t.home.govCentersFeature3 },
      ]
    },
    {
      image: ngoCentersImage,
      location: t.home.ngoCentersLocation,
      title: t.home.ngoCentersTitle,
      subtitle: t.home.ngoCentersSubtitle,
      features: [
        { iconType: 'centertype' as const, text: t.home.ngoCentersFeature1 },
        { iconType: 'rupee' as const, text: t.home.ngoCentersFeature2 },
        { iconType: 'heart' as const, text: t.home.ngoCentersFeature3 },
      ]
    },
    {
      image: privateClinicsImage,
      location: t.home.privateClinicsLocation,
      title: t.home.privateClinicsTitle,
      subtitle: t.home.privateClinicsSubtitle,
      features: [
        { iconType: 'centertype' as const, text: t.home.privateClinicsFeature1 },
        { iconType: 'rupee' as const, text: t.home.privateClinicsFeature2 },
        { iconType: 'heart' as const, text: t.home.privateClinicsFeature3 },
      ]
    }
  ];

  return (
    <div 
      className="flex flex-col gap-4"
      style={{ width: '1146px', height: '610px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <p className="text-h3 text-body-color leading-[32px]">{t.home.selectCenterCategory}</p>
        <a href="#" className="text-label text-disabled-primary underline leading-[24px]">
          {t.home.viewAll}
        </a>
      </div>
      
      {/* Cards Container */}
      <div className="flex gap-[32px] items-start">
        {centers.map((center, idx) => (
          <LocationCard key={idx} {...center} />
        ))}
      </div>
    </div>
  );
}

export function ServiceCentersSectionMobile() {
  const { t } = useLanguage();
  
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  
  function LocationCardMobile({ image, location, title, subtitle, features }: {
    image: string;
    location: string;
    title: string;
    subtitle: string;
    features: { iconType: 'centertype' | 'rupee' | 'heart'; text: string }[];
  }) {
    const [isHovered, setIsHovered] = React.useState(false);
    
    return (
      <div className="relative bg-white rounded-[15px] shadow-[0px_0px_10px_0px_#dddddd] w-full overflow-hidden" style={{ minHeight: '400px' }}>
        {/* Image Section */}
        <div className="relative h-[163px] overflow-hidden">
          <img alt="" className="w-full h-full object-cover" src={image} />
        </div>
        
        {/* Location Badge */}
        <div className="absolute bg-white flex gap-2 items-center px-2 py-2 rounded-[8px] shadow-[0px_0px_10px_0px_rgba(20,20,20,0.35)]" style={{ top: '10px', left: '13px', zIndex: 10 }}>
          <img 
            src={LocationIcon} 
            alt="" 
            className="w-5 h-5" 
            style={{ display: 'block', width: '20px', height: '20px', flexShrink: 0 }} 
          />
          <span className="text-[12px] text-[#505050] leading-[16px] whitespace-nowrap">{location}</span>
        </div>
        
        {/* Content Section */}
        <div className="px-3 pt-4 pb-6 flex flex-col gap-3">
          <h3 className="text-h3 text-heading leading-[24px]">{title}</h3>
          <p className="text-body text-body-color leading-[20px]">{subtitle}</p>
          
          <div className="flex flex-col gap-2 mt-2">
            {features.map((feature, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                {feature.iconType === 'centertype' && (
                  <img 
                    src={CenterTypeIcon} 
                    alt="" 
                    className="w-5 h-5 shrink-0" 
                    style={{ 
                      display: 'block',
                      width: '20px',
                      height: '20px',
                      flexShrink: 0,
                      filter: 'brightness(0) saturate(100%) invert(73%) sepia(44%) saturate(650%) hue-rotate(110deg) brightness(94%) contrast(86%)'
                    }} 
                  />
                )}
                {feature.iconType === 'rupee' && (
                  <img 
                    src={RupeeIcon} 
                    alt="" 
                    className="w-5 h-5 shrink-0" 
                    style={{ 
                      display: 'block',
                      width: '20px',
                      height: '20px',
                      flexShrink: 0,
                      filter: 'brightness(0) saturate(100%) invert(73%) sepia(44%) saturate(650%) hue-rotate(110deg) brightness(94%) contrast(86%)'
                    }} 
                  />
                )}
                {feature.iconType === 'heart' && (
                  <img 
                    src={HeartIcon} 
                    alt="" 
                    className="w-5 h-5 shrink-0" 
                    style={{ 
                      display: 'block',
                      width: '20px',
                      height: '20px',
                      flexShrink: 0,
                      filter: 'brightness(0) saturate(100%) invert(73%) sepia(44%) saturate(650%) hue-rotate(110deg) brightness(94%) contrast(86%)'
                    }} 
                  />
                )}
                <span className="text-body text-body-color leading-[20px] text-[14px]">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Arrow Button */}
        <button
          className="absolute flex items-center justify-center rounded-full cursor-pointer"
          style={{
            right: '12px',
            bottom: '12px',
            width: '40px',
            height: '40px',
            backgroundColor: isHovered ? '#69B57C' : 'white',
            padding: '10px',
            boxShadow: '0px 0px 10px 0px #dddddd',
            transition: 'background-color 300ms',
            zIndex: 10
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24">
            <path d="M8 4L16 12L8 20" stroke={isHovered ? 'white' : '#C7C8D5'} strokeWidth="2" />
          </svg>
        </button>
      </div>
    );
  }

  const centers = [
    {
      image: govCentersImage,
      location: t.home.govCentersLocation,
      title: t.home.govCentersTitle,
      subtitle: t.home.govCentersSubtitle,
      features: [
        { iconType: 'centertype' as const, text: t.home.govCentersFeature1 },
        { iconType: 'rupee' as const, text: t.home.govCentersFeature2 },
        { iconType: 'heart' as const, text: t.home.govCentersFeature3 },
      ]
    },
    {
      image: ngoCentersImage,
      location: t.home.ngoCentersLocation,
      title: t.home.ngoCentersTitle,
      subtitle: t.home.ngoCentersSubtitle,
      features: [
        { iconType: 'centertype' as const, text: t.home.ngoCentersFeature1 },
        { iconType: 'rupee' as const, text: t.home.ngoCentersFeature2 },
        { iconType: 'heart' as const, text: t.home.ngoCentersFeature3 },
      ]
    },
    {
      image: privateClinicsImage,
      location: t.home.privateClinicsLocation,
      title: t.home.privateClinicsTitle,
      subtitle: t.home.privateClinicsSubtitle,
      features: [
        { iconType: 'centertype' as const, text: t.home.privateClinicsFeature1 },
        { iconType: 'rupee' as const, text: t.home.privateClinicsFeature2 },
        { iconType: 'heart' as const, text: t.home.privateClinicsFeature3 },
      ]
    }
  ];

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? centers.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === centers.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div className="flex flex-col gap-4 items-start justify-center w-full px-4" data-name="Service centers">
      <div className="flex items-center justify-between w-full" data-name="Selecting Category, Hyperlink">
        <div className="flex flex-col text-h3 justify-center leading-[0] relative shrink-0 text-body-color">
          <p className="leading-[24px]">{t.home.selectCenterCategory}</p>
        </div>
        <div className="text-disabled-primary text-[16px] underline">{t.home.viewAll}</div>
      </div>
      
      {/* Carousel Container */}
      <div 
        className="relative w-full"
        style={{ minHeight: '400px' }}
        data-name="Service centers carousel"
      >
        {/* Carousel track */}
        <div className="relative w-full overflow-hidden">
          <div 
            className="flex items-start"
            style={{ 
              width: `${centers.length * 100}%`,
              transform: `translateX(-${(currentIndex * 100) / centers.length}%)`,
              transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
            }}
          >
            {centers.map((center, index) => (
              <div key={index} style={{ width: `${100 / centers.length}%`, flexShrink: 0 }}>
                <LocationCardMobile {...center} />
              </div>
            ))}
          </div>
        </div>

        {/* Left Chevron */}
        <button
          onClick={goToPrevious}
          className="absolute z-50 bg-white hover:bg-gray-100 text-gray-700 rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-elevation transition-opacity"
          style={{ left: '8px', top: '50%', transform: 'translateY(-50%)' }}
          aria-label="Previous card"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Chevron */}
        <button
          onClick={goToNext}
          className="absolute z-50 bg-white hover:bg-gray-100 text-gray-700 rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-elevation transition-opacity"
          style={{ right: '8px', top: '50%', transform: 'translateY(-50%)' }}
          aria-label="Next card"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
