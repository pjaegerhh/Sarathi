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
  
  return (
    <div className="flex flex-col gap-4 items-start justify-center w-full px-4" data-name="Service centers">
      <div className="flex items-center justify-between w-full" data-name="Selecting Category, Hyperlink">
        <div className="flex flex-col text-h3 justify-center leading-[0] relative shrink-0 text-body-color text-nowrap">
          <p className="leading-[32px] whitespace-pre">{t.home.selectCenterCategory}</p>
        </div>
        <div className="text-disabled-primary text-[16px] underline">{t.home.viewAll}</div>
      </div>
      <div className="text-body-color text-body">Service Centers Cards - Mobile TBD</div>
    </div>
  );
}
