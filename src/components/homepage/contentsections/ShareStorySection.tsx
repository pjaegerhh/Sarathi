import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import heroShareStoryImage from '../../../assets/images/hero_sharestory.png';
import ChevronRightIcon from '../../../assets/svg/chevron_right.svg';
import WriteIcon from '../../../assets/svg/write.svg';
import MicrophoneIcon from '../../../assets/svg/microphone.svg';
import ImageIcon from '../../../assets/svg/image.svg';
import VideoIcon from '../../../assets/svg/video.svg';

// ===========================================
// SECTION 7: SHARE STORY
// ===========================================
interface ShareStorySectionProps {
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
}

export function ShareStorySectionDesktop({ onNavigate, isLoggedIn = false }: ShareStorySectionProps) {
  const { t } = useLanguage();
  const [shareHovered, setShareHovered] = React.useState(false);
  const handleButtonClick = () => onNavigate(isLoggedIn ? 'profile' : 'auth');
  const [writeHovered, setWriteHovered] = React.useState(false);
  const [microphoneHovered, setMicrophoneHovered] = React.useState(false);
  const [imageHovered, setImageHovered] = React.useState(false);
  const [videoHovered, setVideoHovered] = React.useState(false);
  
  return (
    <div 
      className="flex flex-col items-start"
      style={{ width: '1146px', height: '740px' }}
      data-name="Story content"
    >
      {/* Top Section with Gradient */}
      <div 
        className="bg-gradient-to-b box-border flex flex-col from-[#ffffff] from-[22.305%] gap-[10px] items-start px-[46px] py-[30px] relative rounded-tl-[30px] rounded-tr-[30px] shrink-0 w-full to-[#69b57c] to-[110.04%]"
        style={{ height: '571px' }}
        data-name="Top frame"
      >
        <div className="flex gap-[60px] items-center relative shrink-0 w-full" data-name="Text, buttons, image frame">
          {/* Left: Text and Buttons */}
          <div className="flex flex-col gap-[24px] items-start justify-end relative shrink-0 w-[531.576px]" data-name="Text and buttons frame">
            {/* Text Frame */}
            <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Text frame">
              <div className="flex flex-col text-h1 justify-center relative shrink-0 text-heading w-[411px]">
                <p className="leading-[60px]">{t.home.shareStoryTitle}</p>
              </div>
              <div className="flex flex-col text-h3 justify-center relative shrink-0 text-body-color w-[405px]">
                <p className="leading-[32px]">{t.home.shareStorySubtext}</p>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex gap-[24px] items-end relative shrink-0" data-name="Story sharing options">
              {/* Share Button */}
              <button 
                className="box-border flex gap-[12px] h-[46px] items-center justify-center px-[24px] py-[8px] relative rounded-[24px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 cursor-pointer transition-colors"
                style={{ 
                  backgroundColor: shareHovered ? '#8AC0AD' : 'white',
                  transition: 'background-color 300ms'
                }}
                onMouseEnter={() => setShareHovered(true)}
                onMouseLeave={() => setShareHovered(false)}
                onClick={handleButtonClick}
              >
                <span 
                  className="text-label text-nowrap leading-[24px] whitespace-pre"
                  style={{ 
                    color: shareHovered ? '#ffffff' : '#8AC0AD',
                    transition: 'color 300ms'
                  }}
                >
                  {t.home.shareYourStory}
                </span>
                <img 
                  src={ChevronRightIcon} 
                  alt="" 
                  className="w-4 h-4 shrink-0" 
                  style={{ 
                    display: 'block',
                    filter: shareHovered 
                      ? 'brightness(0) saturate(100%) invert(100%)' 
                      : 'brightness(0) saturate(100%) invert(73%) sepia(44%) saturate(650%) hue-rotate(110deg) brightness(94%) contrast(86%)',
                    transition: 'filter 300ms'
                  }} 
                />
              </button>
              
              {/* Icon Buttons */}
              <div className="flex gap-[12px] items-center relative shrink-0" data-name="Content upload options">
                {/* Write Icon Button (1st) */}
                <button 
                  className="box-border flex items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 transition-colors cursor-pointer"
                  style={{ 
                    backgroundColor: writeHovered ? '#8AC0AD' : 'white',
                    transition: 'background-color 300ms'
                  }}
                  onMouseEnter={() => setWriteHovered(true)}
                  onMouseLeave={() => setWriteHovered(false)}
                  onClick={handleButtonClick}
                >
                  <img 
                    src={WriteIcon} 
                    alt="" 
                    className="w-6 h-6 shrink-0" 
                    style={{ 
                      display: 'block',
                      filter: writeHovered ? 'brightness(0) saturate(100%) invert(100%)' : 'none',
                      transition: 'filter 300ms'
                    }} 
                  />
                </button>
                
                {/* Microphone Icon Button (2nd) */}
                <button 
                  className="box-border flex items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 transition-colors cursor-pointer"
                  style={{ 
                    backgroundColor: microphoneHovered ? '#8AC0AD' : 'white',
                    transition: 'background-color 300ms'
                  }}
                  onMouseEnter={() => setMicrophoneHovered(true)}
                  onMouseLeave={() => setMicrophoneHovered(false)}
                  onClick={handleButtonClick}
                >
                  <img 
                    src={MicrophoneIcon} 
                    alt="" 
                    className="w-6 h-6 shrink-0" 
                    style={{ 
                      display: 'block',
                      filter: microphoneHovered ? 'brightness(0) saturate(100%) invert(100%)' : 'none',
                      transition: 'filter 300ms'
                    }} 
                  />
                </button>
                
                {/* Image Icon Button (3rd) */}
                <button 
                  className="box-border flex items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 transition-colors cursor-pointer"
                  style={{ 
                    backgroundColor: imageHovered ? '#8AC0AD' : 'white',
                    transition: 'background-color 300ms'
                  }}
                  onMouseEnter={() => setImageHovered(true)}
                  onMouseLeave={() => setImageHovered(false)}
                  onClick={handleButtonClick}
                >
                  <img 
                    src={ImageIcon} 
                    alt="" 
                    className="w-6 h-6 shrink-0" 
                    style={{ 
                      display: 'block',
                      filter: imageHovered ? 'brightness(0) saturate(100%) invert(100%)' : 'none',
                      transition: 'filter 300ms'
                    }} 
                  />
                </button>
                
                {/* Video Icon Button (4th) */}
                <button 
                  className="box-border flex items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 transition-colors cursor-pointer"
                  style={{ 
                    backgroundColor: videoHovered ? '#8AC0AD' : 'white',
                    transition: 'background-color 300ms'
                  }}
                  onMouseEnter={() => setVideoHovered(true)}
                  onMouseLeave={() => setVideoHovered(false)}
                  onClick={handleButtonClick}
                >
                  <img 
                    src={VideoIcon} 
                    alt="" 
                    className="w-6 h-6 shrink-0" 
                    style={{ 
                      display: 'block',
                      filter: videoHovered ? 'brightness(0) saturate(100%) invert(100%)' : 'none',
                      transition: 'filter 300ms'
                    }} 
                  />
                </button>
              </div>
            </div>
          </div>
          
          {/* Right: Image Section */}
          <div className="relative shrink-0 w-[436px]" data-name="Image Section">
            <div className="h-[478px] mt-[32px] relative rounded-bl-[20px] rounded-br-[20px] overflow-hidden" data-name="Image">
              <img alt="" className="absolute h-[126.73%] left-[-30.91%] max-w-none top-[-17.74%] w-[138.94%] object-cover" src={heroShareStoryImage} />
            </div>
            <div className="absolute top-0 left-0 bg-gradient-to-b from-[#ffffff] from-[18.103%] h-[232px] rounded-bl-[20px] rounded-br-[20px] to-[rgba(255,255,255,0)] w-[436px]" data-name="Gradient overlay" />
          </div>
        </div>
      </div>
      
      {/* Bottom Section with Stats */}
      <div 
        className="bg-gradient-to-b border-[4px_0px_0px] border-solid border-white box-border flex flex-col from-[#69b57c] gap-[10px] items-center justify-center px-[41px] py-[26px] relative rounded-bl-[30px] rounded-br-[30px] shrink-0 w-full to-[#388896]"
        style={{ height: '169px' }}
        data-name="Bottom frame"
      >
        <div className="flex gap-[158px] items-center justify-center relative shrink-0 w-[895px]" data-name="Overview">
          {/* +2 million */}
          <div className="flex flex-col items-center justify-center relative shrink-0 w-[227px]" data-name="+2million">
            <div className="flex gap-[2px] items-center justify-center relative shrink-0 w-full">
              <p className="text-h1 text-center text-nowrap text-white leading-[60px] whitespace-pre">{t.home.statsBMVSS}</p>
            </div>
            <div className="flex flex-col text-h3 justify-center leading-[32px] relative shrink-0 text-nowrap text-white whitespace-pre">
              <p className="mb-0">{t.home.statsBMVSSDesc}</p>
              <p>{t.home.statsThroughRehabilitation}</p>
            </div>
          </div>
          
          {/* +700 centers */}
          <div className="flex flex-col gap-[22px] items-center justify-center relative shrink-0" data-name="Number of centers">
            <div className="flex flex-col items-center justify-center leading-[0] relative shrink-0 text-nowrap text-white w-[159px]">
              <p className="text-h1 leading-[60px] text-nowrap whitespace-pre">{t.home.statsCenters}</p>
              <div className="flex flex-col text-h3 justify-center leading-[32px] relative shrink-0 whitespace-pre">
                <p className="mb-0">{t.home.statsPrivateAndPublic}</p>
                <p>{t.home.statsCentersNationwide}</p>
              </div>
            </div>
          </div>
          
          {/* 380,000+ beneficiaries */}
          <div className="flex flex-col items-center justify-center leading-[0] relative shrink-0 text-nowrap text-white w-[193px]" data-name="Beneficiaries number">
            <p className="text-h1 leading-[60px] text-nowrap whitespace-pre">{t.home.statsBeneficiaries}</p>
            <div className="flex flex-col text-h3 justify-center leading-[32px] relative shrink-0 text-center whitespace-pre">
              <p className="mb-0">{t.home.statsBeneficiariesAssisted}</p>
              <p>{t.home.statsThroughCamps}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShareStorySectionMobile({ onNavigate, isLoggedIn = false }: ShareStorySectionProps) {
  const { t } = useLanguage();
  const [shareHovered, setShareHovered] = React.useState(false);
  const [writeHovered, setWriteHovered] = React.useState(false);
  const [microphoneHovered, setMicrophoneHovered] = React.useState(false);
  const [imageHovered, setImageHovered] = React.useState(false);
  const [videoHovered, setVideoHovered] = React.useState(false);
  const handleButtonClick = () => onNavigate(isLoggedIn ? 'profile' : 'auth');

  return (
    <div className="flex flex-col items-center gap-[24px] w-full" data-name="Story content">
      {/* First Card: Share Story Container */}
      <div 
        className="bg-gradient-to-b box-border flex flex-col from-[#ffffff] from-[22.305%] gap-[10px] items-center justify-center relative rounded-[15px] shrink-0 to-[#69b57c] to-[110.04%]"
        style={{ 
          width: 'calc(100% - 30px)',
//          minHeight: '500px',
//          aspectRatio: '455 / 685',
          paddingTop: '30px',
          paddingBottom: '30px',
          paddingLeft: '46px',
          paddingRight: '46px'
        }}
        data-name="Statistics container"
      >
        {/* Image Section */}
        <div 
          className="relative w-full"
          style={{
            marginLeft: '34px',
            marginRight: '34px',
            marginTop: '17.69px'
          }}
          data-name="Image container"
        >
          <div 
            className="relative rounded-bl-[20px] rounded-br-[20px] overflow-hidden"
            style={{ 
              width: '100%',
              paddingBottom: '95.4%'
            }}
            data-name="Image wrapper"
          >
            <img 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover rounded-bl-[20px] rounded-br-[20px]" 
              src={heroShareStoryImage} 
            />
            <div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#ffffff] from-[18.103%] rounded-bl-[20px] rounded-br-[20px] to-[rgba(255,255,255,0)]"
              style={{
                height: '48.5%',
                width: '100%'
              }}
              data-name="Gradient overlay"
            />
          </div>
        </div>
        
        {/* Text Details */}
        <div className="flex flex-col gap-[12px] items-center justify-center relative shrink-0 w-full" data-name="Text details">
          <div className="flex flex-col gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Text container">
            <div className="flex flex-col text-h1 justify-center relative shrink-0 text-heading w-full">
              <p className="leading-[24px] text-center">{t.home.shareStoryTitle}</p>
            </div>
            <div className="flex flex-col text-h3 justify-center relative shrink-0 text-body-color w-full">
              <p className="leading-[20px] text-center">{t.home.shareStorySubtext}</p>
            </div>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-name="Buttons container">
          {/* Share Button */}
          <button 
            className="box-border flex gap-[12px] h-[36px] items-center justify-center px-[24px] py-[8px] relative rounded-[24px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 cursor-pointer transition-colors"
            style={{ 
              backgroundColor: shareHovered ? '#8AC0AD' : 'white',
              transition: 'background-color 300ms'
            }}
            onMouseEnter={() => setShareHovered(true)}
            onMouseLeave={() => setShareHovered(false)}
            onClick={handleButtonClick}
          >
            <span 
              className="text-label text-nowrap leading-[20px] whitespace-pre"
              style={{ 
                color: shareHovered ? '#ffffff' : '#8AC0AD',
                transition: 'color 300ms'
              }}
            >
              {t.home.shareYourStory}
            </span>
            <img 
              src={ChevronRightIcon} 
              alt="" 
              className="w-4 h-4 shrink-0" 
              style={{ 
                display: 'block',
                filter: shareHovered 
                  ? 'brightness(0) saturate(100%) invert(100%)' 
                  : 'brightness(0) saturate(100%) invert(73%) sepia(44%) saturate(650%) hue-rotate(110deg) brightness(94%) contrast(86%)',
                transition: 'filter 300ms'
              }} 
            />
          </button>
          
          {/* Icon Buttons */}
          <div className="flex gap-[12px] items-center relative shrink-0" data-name="Icon buttons">
            {/* Write Icon Button */}
            <button 
              className="box-border flex items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 transition-colors cursor-pointer"
              style={{ 
                backgroundColor: writeHovered ? '#8AC0AD' : 'white',
                transition: 'background-color 300ms',
                width: '40px',
                height: '40px'
              }}
              onMouseEnter={() => setWriteHovered(true)}
              onMouseLeave={() => setWriteHovered(false)}
              onClick={handleButtonClick}
            >
              <img 
                src={WriteIcon} 
                alt="" 
                className="w-6 h-6 shrink-0" 
                style={{ 
                  display: 'block',
                  filter: writeHovered ? 'brightness(0) saturate(100%) invert(100%)' : 'none',
                  transition: 'filter 300ms'
                }} 
              />
            </button>
            
            {/* Microphone Icon Button */}
            <button 
              className="box-border flex items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 transition-colors cursor-pointer"
              style={{ 
                backgroundColor: microphoneHovered ? '#8AC0AD' : 'white',
                transition: 'background-color 300ms',
                width: '40px',
                height: '40px'
              }}
              onMouseEnter={() => setMicrophoneHovered(true)}
              onMouseLeave={() => setMicrophoneHovered(false)}
              onClick={handleButtonClick}
            >
              <img 
                src={MicrophoneIcon} 
                alt="" 
                className="w-6 h-6 shrink-0" 
                style={{ 
                  display: 'block',
                  filter: microphoneHovered ? 'brightness(0) saturate(100%) invert(100%)' : 'none',
                  transition: 'filter 300ms'
                }} 
              />
            </button>
            
            {/* Image Icon Button */}
            <button 
              className="box-border flex items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 transition-colors cursor-pointer"
              style={{ 
                backgroundColor: imageHovered ? '#8AC0AD' : 'white',
                transition: 'background-color 300ms',
                width: '40px',
                height: '40px'
              }}
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
              onClick={handleButtonClick}
            >
              <img 
                src={ImageIcon} 
                alt="" 
                className="w-6 h-6 shrink-0" 
                style={{ 
                  display: 'block',
                  filter: imageHovered ? 'brightness(0) saturate(100%) invert(100%)' : 'none',
                  transition: 'filter 300ms'
                }} 
              />
            </button>
            
            {/* Video Icon Button */}
            <button 
              className="box-border flex items-center justify-center p-[12px] relative rounded-[50px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 transition-colors cursor-pointer"
              style={{ 
                backgroundColor: videoHovered ? '#8AC0AD' : 'white',
                transition: 'background-color 300ms',
                width: '40px',
                height: '40px'
              }}
              onMouseEnter={() => setVideoHovered(true)}
              onMouseLeave={() => setVideoHovered(false)}
              onClick={handleButtonClick}
            >
              <img 
                src={VideoIcon} 
                alt="" 
                className="w-6 h-6 shrink-0" 
                style={{ 
                  display: 'block',
                  filter: videoHovered ? 'brightness(0) saturate(100%) invert(100%)' : 'none',
                  transition: 'filter 300ms'
                }} 
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* Second Card: Statistics Card */}
      <div 
        className="box-border flex flex-col gap-[10px] items-center justify-center relative rounded-[20px] shrink-0 bg-gradient-to-b from-[#69b57c] to-[#388896]"
        style={{ 
          width: 'calc(100% - 30px)',
          height: '445px',
          paddingTop: '26px',
          paddingBottom: '26px',
          paddingLeft: '41px',
          paddingRight: '41px'
        }}
        data-name="Statistics card"
      >
        <div className="flex flex-col gap-[40px] items-center justify-center relative shrink-0 w-full" data-name="Statistics content">
          {/* +2 million */}
          <div className="flex flex-col items-center justify-center relative shrink-0 w-full" data-name="Stat item">
            <div className="flex gap-[2px] items-center justify-center relative shrink-0 w-full" data-name="Stat header">
              <p className="text-center text-nowrap text-white leading-[30px] whitespace-pre" style={{ fontSize: '24px' }}>{t.home.statsBMVSS}</p>
            </div>
            <div className="flex flex-col justify-center leading-[20px] relative shrink-0 text-nowrap text-white whitespace-pre text-center">
              <p className="mb-0" style={{ fontSize: '14px' }}>{t.home.statsBMVSSDesc}</p>
              <p style={{ fontSize: '14px' }}>{t.home.statsThroughRehabilitation}</p>
            </div>
          </div>
          
          {/* +700 centers */}
          <div className="flex flex-col gap-[22px] items-center justify-center relative shrink-0 w-full" data-name="Stat item">
            <div className="flex flex-col items-center justify-center leading-[0] relative shrink-0 text-nowrap text-white w-full" data-name="Stat header">
              <p className="leading-[30px] text-nowrap whitespace-pre text-center" style={{ fontSize: '24px' }}>{t.home.statsCenters}</p>
              <div className="flex flex-col justify-center leading-[20px] relative shrink-0 whitespace-pre text-center">
                <p className="mb-0" style={{ fontSize: '14px' }}>{t.home.statsPrivateAndPublic}</p>
                <p style={{ fontSize: '14px' }}>{t.home.statsCentersNationwide}</p>
              </div>
            </div>
          </div>
          
          {/* 380,000+ beneficiaries */}
          <div className="flex flex-col items-center justify-center leading-[0] relative shrink-0 text-nowrap text-white w-full" data-name="Stat item">
            <p className="leading-[30px] text-nowrap whitespace-pre text-center" style={{ fontSize: '24px' }}>{t.home.statsBeneficiaries}</p>
            <div className="flex flex-col justify-center leading-[20px] relative shrink-0 text-center whitespace-pre">
              <p className="mb-0" style={{ fontSize: '14px' }}>{t.home.statsBeneficiariesAssisted}</p>
              <p style={{ fontSize: '14px' }}>{t.home.statsThroughCamps}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
