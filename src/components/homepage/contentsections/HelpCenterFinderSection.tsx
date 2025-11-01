import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import LocationIcon from '../../../assets/svg/location.svg';
import MicrophoneIcon from '../../../assets/svg/microphone.svg';
import CenterTypeIcon from '../../../assets/svg/centertype.svg';
import RupeeIcon from '../../../assets/svg/rupee.svg';
import SearchIcon from '../../../assets/svg/search.svg';

// ===========================================
// SECTION 5: HELP CENTER FINDER  
// ===========================================
export function HelpCenterFinderSectionDesktop() {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div 
      className="w-[1146px] rounded-[30px] bg-gradient-brand flex flex-col gap-[21px] items-center justify-center"
      style={{ height: '328px', minHeight: '328px', maxHeight: '328px' }}
    >
      {/* Title and description */}
      <div className="flex flex-col gap-3 items-center text-center text-white">
        <p className="text-h1 leading-[60px] font-semibold">
          {t.home.helpCenterTitle}
        </p>
        <p className="text-h3 leading-[32px]">
          {t.home.helpCenterSubtext}
        </p>
      </div>
      
      {/* Search box */}
      <div className="bg-white flex gap-[24px] items-center px-[20px] py-[15px] rounded-[30px] shadow-[0px_0px_10px_0px_rgba(221,221,221,0.86)]">
        <div className="flex gap-[25px] items-center">
          {/* Search Location Field */}
          <div className="h-[52px] w-[364px] bg-white border border-[#c7c8d5] rounded-[10px] shadow-[0px_0px_10px_0px_#dddddd] flex items-center gap-3 px-4">
            <img src={LocationIcon} alt="" className="w-6 h-6 shrink-0" />
            <input 
              type="text" 
              placeholder={t.home.searchLocation} 
              className="flex-1 text-[14px] text-[#505050] leading-[22px] outline-none border-none bg-transparent"
            />
            <img src={MicrophoneIcon} alt="" className="w-6 h-6 shrink-0 cursor-pointer" />
          </div>
          
          {/* Divider */}
          <div className="bg-[#c7c8d5] h-[44px] w-[3px]" />
          
          {/* Center Type Field */}
          <div className="h-[52px] w-[195px] bg-white border border-[#c7c8d5] rounded-[10px] shadow-[0px_0px_10px_0px_#dddddd] flex items-center gap-3 px-4">
            <img src={CenterTypeIcon} alt="" className="w-5 h-5 shrink-0" />
            <input 
              type="text" 
              placeholder={t.home.centerType} 
              className="flex-1 text-[14px] text-[#505050] leading-[22px] outline-none border-none bg-transparent"
            />
          </div>
          
          {/* Divider */}
          <div className="bg-[#c7c8d5] h-[44px] w-[3px]" />
          
          {/* Price Range Field */}
          <div className="h-[52px] w-[195px] bg-white border border-[#c7c8d5] rounded-[10px] shadow-[0px_0px_10px_0px_#dddddd] flex items-center gap-3 px-4">
            <img src={RupeeIcon} alt="" className="w-5 h-5 shrink-0" />
            <input 
              type="text" 
              placeholder={t.home.priceRange} 
              className="flex-1 text-[14px] text-[#505050] leading-[22px] outline-none border-none bg-transparent"
            />
          </div>
        </div>
        
        {/* Search Button */}
        <button 
          className="rounded-full shadow-[0px_0px_10px_0px_#dddddd] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          style={{ 
            width: '48px', 
            height: '48px', 
            minWidth: '48px', 
            minHeight: '48px',
            backgroundColor: isHovered ? '#69B57C' : '#5f9ca6'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={SearchIcon} alt="Search" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export function HelpCenterFinderSectionMobile() {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center w-full px-4" data-name="Help center finder">
      <div className="relative w-full min-h-[327.281px] rounded-[30px] bg-gradient-brand" data-name="Background">
        <div className="absolute inset-0 box-border flex flex-col gap-[21px] items-center justify-center px-4 py-6" data-name="Help center finder">
          <div className="relative shrink-0 w-full" data-name="Title and description">
            <div className="flex flex-col items-center size-full">
              <div className="box-border flex flex-col gap-3 items-center px-4 py-0 relative w-full">
                <div className="flex flex-col text-h1 justify-center leading-[0] relative shrink-0 text-center text-white w-full">
                  <p className="leading-[60px]">{t.home.helpCenterTitle}</p>
                </div>
                <div className="flex items-center relative shrink-0 justify-center w-full" data-name="Description">
                  <div className="flex flex-col text-h3 justify-center leading-[0] relative shrink-0 text-center text-white w-full">
                    <p className="leading-[32px]">{t.home.helpCenterSubtext}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white box-border flex gap-6 items-center px-4 py-3 relative rounded-[30px] shadow-[0px_0px_10px_0px_rgba(221,221,221,0.86)] shrink-0 w-full max-w-[90%]" data-name="Input fields">
            <div className="text-body-color text-body text-sm">{t.home.searchLocation} • {t.home.centerType} • {t.home.priceRange}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
