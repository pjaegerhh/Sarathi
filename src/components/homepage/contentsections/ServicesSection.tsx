import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import svgPaths from "../../../imports/svg-xq60h88j1a";
import trainingImage from '../../../assets/images/training.png';
import rehabilitationImage from '../../../assets/images/rehabilitation.png';

// ===========================================
// SECTION 3: SERVICES
// ===========================================
export function ServicesSectionDesktop() {
  const { t } = useLanguage();
  
  // Training Card Components
  function TrainingCard() {
    const [isHovered, setIsHovered] = React.useState(false);
    
    return (
      <div className="h-[432.719px] relative shadow-elevation shrink-0 w-[555.339px]" data-name="category card desktop">
        <div className="absolute bottom-[1.64%] contents left-0 right-0 top-0">
          <div className="absolute bg-light-secondary bottom-[1.64%] left-0 right-0 rounded-tl-[30px] rounded-tr-[30px] shadow-elevation top-0" />
          <div className="absolute bottom-[1.64%] left-0 right-0 rounded-tl-[30px] rounded-tr-[30px] top-[0.23%]">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[30px] rounded-tr-[30px] size-full" src={trainingImage} />
          </div>
        </div>
        <div 
          className="absolute bottom-0 box-border flex flex-col items-start left-0 px-[24.321px] py-[18.241px] right-0 rounded-tl-[30.402px] rounded-tr-[30.402px] top-[59.95%]"
          style={{ 
            background: isHovered ? 'linear-gradient(to bottom, #69b57c, #388896)' : '#ffffff'
          }}
        >
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
              <div 
                className="[grid-area:1_/_1] flex flex-col text-h3 h-[80.058px] justify-center ml-0 mt-[40.029px] relative translate-y-[-50%] w-[334.42px]"
                style={{
                  color: isHovered ? '#ffffff' : '#192126'
                }}
              >
                <p className="leading-[32px] whitespace-pre-wrap">{t.home.trainingDesc}</p>
              </div>
              <button
                className="[grid-area:1_/_1] box-border flex gap-3 h-[46px] items-center justify-center ml-0 mt-[92.33px] px-6 py-2 relative rounded-[24px] shadow-elevation cursor-pointer transition-colors"
                style={{ 
                  backgroundColor: isHovered ? '#ffffff' : '#8AC0AD',
                  transition: 'background-color 300ms'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                data-name="secondary button icon text desktop"
              >
                <div 
                  className="flex flex-col text-label justify-center leading-[0] relative shrink-0 text-nowrap"
                  style={{ 
                    color: isHovered ? '#8AC0AD' : '#ffffff',
                    transition: 'color 300ms'
                  }}
                >
                  <p className="leading-[24px] whitespace-pre">{t.home.trainingTitle}</p>
                </div>
                <div className="relative shrink-0 size-[20px]" data-name="Component">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <g id="Component">
                      <path 
                        d={svgPaths.p602f900} 
                        id="Vector" 
                        stroke={isHovered ? '#8AC0AD' : '#ffffff'} 
                        strokeWidth="2"
                        style={{ transition: 'stroke 300ms' }}
                      />
                    </g>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Rehabilitation Card Components
  function RehabilitationCard() {
    const [isHovered, setIsHovered] = React.useState(false);
    
    return (
      <div className="h-[432.719px] relative shadow-elevation shrink-0 w-[555.339px]" data-name="category card desktop">
        <div className="absolute bottom-[1.64%] contents left-0 right-0 top-0">
          <div className="absolute bg-light-secondary bottom-[1.64%] left-0 right-0 rounded-tl-[30px] rounded-tr-[30px] shadow-elevation top-0" />
          <div className="absolute bottom-[1.64%] left-0 right-0 rounded-tl-[30px] rounded-tr-[30px] top-[0.23%]">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[30px] rounded-tr-[30px] size-full" src={rehabilitationImage} />
          </div>
        </div>
        <div 
          className="absolute bottom-0 box-border flex flex-col items-start left-0 px-[24.321px] py-[18.241px] right-0 rounded-tl-[30.402px] rounded-tr-[30.402px] top-[59.95%]"
          style={{ 
            background: isHovered ? 'linear-gradient(to bottom, #69b57c, #388896)' : '#ffffff'
          }}
        >
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
              <div 
                className="[grid-area:1_/_1] flex flex-col text-h3 h-[80.058px] justify-center ml-0 mt-[40.029px] relative translate-y-[-50%] w-[334.42px]"
                style={{
                  color: isHovered ? '#ffffff' : '#192126'
                }}
              >
                <p className="leading-[32px] whitespace-pre-wrap">{t.home.rehabilitationDesc}</p>
              </div>
              <button
                className="[grid-area:1_/_1] box-border flex gap-3 h-[46px] items-center justify-center ml-0 mt-[92.33px] px-6 py-2 relative rounded-[24px] shadow-elevation cursor-pointer transition-colors"
                style={{ 
                  backgroundColor: isHovered ? '#ffffff' : '#8AC0AD',
                  transition: 'background-color 300ms'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                data-name="primary button icon text desktop"
              >
                <div 
                  className="flex flex-col text-label justify-center leading-[0] relative shrink-0 text-nowrap"
                  style={{ 
                    color: isHovered ? '#8AC0AD' : '#ffffff',
                    transition: 'color 300ms'
                  }}
                >
                  <p className="leading-[24px] whitespace-pre">{t.home.rehabilitationTitle}</p>
                </div>
                <div className="relative shrink-0 size-[20px]" data-name="Component">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <g id="Component">
                      <path 
                        d={svgPaths.p602f900} 
                        id="Vector" 
                        stroke={isHovered ? '#8AC0AD' : '#ffffff'} 
                        strokeWidth="2"
                        style={{ transition: 'stroke 300ms' }}
                      />
                    </g>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[1146px] h-[615px] flex flex-col gap-[50px] items-start" data-name="Service categories">
      <div className="flex flex-col gap-3 items-start leading-[0] relative shrink-0 w-[906px]" data-name="Section title, intro text">
        <div className="flex flex-col text-h1 justify-center relative shrink-0 text-heading w-full">
          <p className="leading-[60px]">{t.home.redefiningHealing}</p>
        </div>
        <div className="flex flex-col text-h3 justify-center relative shrink-0 text-body-color w-full">
          <p className="leading-[32px]">{t.home.redefiningSubtext}</p>
        </div>
      </div>
      <div className="flex gap-6 items-center relative shrink-0" data-name="Content Cards">
        <TrainingCard />
        <RehabilitationCard />
      </div>
    </div>
  );
}

export function ServicesSectionMobile() {
  const { t } = useLanguage();
  
  // Training Card Components - scaled from desktop
  function TrainingCard() {
    const [isHovered, setIsHovered] = React.useState(false);
    
    return (
      <div 
        className="relative shadow-elevation shrink-0 flex-1 min-w-0" 
        style={{ 
          height: 'min(78vw, 300px)',
          width: 'calc(50% - 6px)',
          borderRadius: 'clamp(12px, 2.6vw, 30px)'
        }}
        data-name="category card mobile"
      >
        <div className="absolute bottom-[1.64%] contents left-0 right-0 top-0">
          <div 
            className="absolute bg-light-secondary bottom-[1.64%] left-0 right-0 shadow-elevation top-0" 
            style={{ borderRadius: 'clamp(12px, 2.6vw, 30px) clamp(12px, 2.6vw, 30px) 0 0' }}
          />
          <div 
            className="absolute bottom-[1.64%] left-0 right-0 top-[0.23%]"
            style={{ borderRadius: 'clamp(12px, 2.6vw, 30px) clamp(12px, 2.6vw, 30px) 0 0' }}
          >
            <img 
              alt="" 
              className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" 
              style={{ borderRadius: 'clamp(12px, 2.6vw, 30px) clamp(12px, 2.6vw, 30px) 0 0' }}
              src={trainingImage} 
            />
          </div>
        </div>
        <div 
          className="absolute bottom-0 box-border flex flex-col items-start left-0 right-0 top-[59.95%]"
          style={{ 
            background: isHovered ? 'linear-gradient(to bottom, #69b57c, #388896)' : '#ffffff',
            padding: 'clamp(6px, 1.7vw, 18px) clamp(8px, 2.2vw, 24px)',
            borderRadius: 'clamp(12px, 2.6vw, 30px) clamp(12px, 2.6vw, 30px) 0 0'
          }}
        >
          <div className="flex flex-col font-normal justify-center relative w-full text-[14px] tracking-[0.4px]"
            style={{
              lineHeight: '18px',
              color: isHovered ? '#ffffff' : '#192126',
              paddingBottom: 'clamp(32px, 5vw, 50px)'
            }}
          >
            <p className="leading-[18px]" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>{t.home.trainingDesc}</p>
          </div>
        </div>
        <button
          className="absolute box-border flex items-center justify-center shadow-elevation cursor-pointer transition-colors z-10"
          style={{ 
            backgroundColor: isHovered ? '#ffffff' : '#8AC0AD',
            transition: 'background-color 300ms',
            gap: 'clamp(4px, 0.8vw, 12px)',
            height: 'clamp(32px, 5vw, 50px)',
            padding: 'clamp(6px, 1vw, 10px) clamp(10px, 2vw, 28px)',
            borderRadius: 'clamp(12px, 2.2vw, 24px)',
            bottom: '12px',
            left: '12px'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-name="secondary button icon text mobile"
        >
          <div 
            className="flex flex-col justify-center leading-[0] relative shrink-0 text-nowrap"
            style={{ 
              color: isHovered ? '#8AC0AD' : '#ffffff',
              transition: 'color 300ms',
              fontSize: 'clamp(12px, 1.6vw, 18px)'
            }}
          >
            <p style={{ lineHeight: 'clamp(16px, 2.4vw, 28px)' }} className="whitespace-pre">{t.home.trainingTitle}</p>
          </div>
          <div 
            className="relative shrink-0" 
            style={{ width: 'clamp(12px, 1.9vw, 20px)', height: 'clamp(12px, 1.9vw, 20px)' }}
            data-name="Component"
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <g id="Component">
                <path 
                  d={svgPaths.p602f900} 
                  id="Vector" 
                  stroke={isHovered ? '#8AC0AD' : '#ffffff'} 
                  strokeWidth="2"
                  style={{ transition: 'stroke 300ms' }}
                />
              </g>
            </svg>
          </div>
        </button>
      </div>
    );
  }

  // Rehabilitation Card Components - scaled from desktop
  function RehabilitationCard() {
    const [isHovered, setIsHovered] = React.useState(false);
    
    return (
      <div 
        className="relative shadow-elevation shrink-0 flex-1 min-w-0" 
        style={{ 
          height: 'min(78vw, 300px)',
          width: 'calc(50% - 6px)',
          borderRadius: 'clamp(12px, 2.6vw, 30px)'
        }}
        data-name="category card mobile"
      >
        <div className="absolute bottom-[1.64%] contents left-0 right-0 top-0">
          <div 
            className="absolute bg-light-secondary bottom-[1.64%] left-0 right-0 shadow-elevation top-0" 
            style={{ borderRadius: 'clamp(12px, 2.6vw, 30px) clamp(12px, 2.6vw, 30px) 0 0' }}
          />
          <div 
            className="absolute bottom-[1.64%] left-0 right-0 top-[0.23%]"
            style={{ borderRadius: 'clamp(12px, 2.6vw, 30px) clamp(12px, 2.6vw, 30px) 0 0' }}
          >
            <img 
              alt="" 
              className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" 
              style={{ borderRadius: 'clamp(12px, 2.6vw, 30px) clamp(12px, 2.6vw, 30px) 0 0' }}
              src={rehabilitationImage} 
            />
          </div>
        </div>
        <div 
          className="absolute bottom-0 box-border flex flex-col items-start left-0 right-0 top-[59.95%]"
          style={{ 
            background: isHovered ? 'linear-gradient(to bottom, #69b57c, #388896)' : '#ffffff',
            padding: 'clamp(6px, 1.7vw, 18px) clamp(8px, 2.2vw, 24px)',
            borderRadius: 'clamp(12px, 2.6vw, 30px) clamp(12px, 2.6vw, 30px) 0 0'
          }}
        >
          <div className="flex flex-col font-normal justify-center relative w-full text-[14px] tracking-[0.4px]"
            style={{
              lineHeight: '18px',
              color: isHovered ? '#ffffff' : '#192126',
              paddingBottom: 'clamp(32px, 5vw, 50px)'
            }}
          >
            <p className="leading-[18px]" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>{t.home.rehabilitationDesc}</p>
          </div>
        </div>
        <button
          className="absolute box-border flex items-center justify-center shadow-elevation cursor-pointer transition-colors z-10"
          style={{ 
            backgroundColor: isHovered ? '#ffffff' : '#8AC0AD',
            transition: 'background-color 300ms',
            gap: 'clamp(4px, 0.8vw, 12px)',
            height: 'clamp(32px, 5vw, 50px)',
            padding: 'clamp(6px, 1vw, 10px) clamp(10px, 2vw, 28px)',
            borderRadius: 'clamp(12px, 2.2vw, 24px)',
            bottom: '12px',
            left: '12px'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-name="primary button icon text mobile"
        >
          <div 
            className="flex flex-col justify-center leading-[0] relative shrink-0 text-nowrap"
            style={{ 
              color: isHovered ? '#8AC0AD' : '#ffffff',
              transition: 'color 300ms',
              fontSize: 'clamp(12px, 1.6vw, 18px)'
            }}
          >
            <p style={{ lineHeight: 'clamp(16px, 2.4vw, 28px)' }} className="whitespace-pre">{t.home.rehabilitationTitle}</p>
          </div>
          <div 
            className="relative shrink-0" 
            style={{ width: 'clamp(12px, 1.9vw, 20px)', height: 'clamp(12px, 1.9vw, 20px)' }}
            data-name="Component"
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <g id="Component">
                <path 
                  d={svgPaths.p602f900} 
                  id="Vector" 
                  stroke={isHovered ? '#8AC0AD' : '#ffffff'} 
                  strokeWidth="2"
                  style={{ transition: 'stroke 300ms' }}
                />
              </g>
            </svg>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div 
      className="w-full flex flex-col items-start" 
      style={{ 
        width: '100%',
        paddingLeft: 'clamp(12px, 2vw, 20px)',
        paddingRight: 'clamp(12px, 2vw, 20px)',
        gap: 'clamp(20px, 4.4vw, 50px)'
      }}
      data-name="Service categories"
    >
      <div 
        className="flex flex-col items-start relative shrink-0 w-full"
        style={{ gap: '12px' }}
        data-name="Section title, intro text"
      >
        <div className="flex flex-col font-medium justify-center relative shrink-0 text-[#192126] text-[18px] leading-[26px]">
          <p className="whitespace-pre m-0">{t.home.redefiningHealing}</p>
        </div>
        <div className="flex flex-col font-normal justify-center relative shrink-0 text-[#505050] text-[16px] leading-[22px] tracking-[0.25px] w-full">
          <p className="m-0">{t.home.redefiningSubtext}</p>
        </div>
      </div>
      <div 
        className="flex items-center relative shrink-0 w-full" 
        style={{ gap: 'clamp(8px, 1.3vw, 24px)' }}
        data-name="Content Cards"
      >
        <TrainingCard />
        <RehabilitationCard />
      </div>
    </div>
  );
}

