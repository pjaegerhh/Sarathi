import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import svgPaths from "../imports/svg-zth38xejxm";

interface DesktopNavigationBarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const navColors = (isActive: boolean, isHovered: boolean) => {
  if (isActive) {
    return {
      icon: isHovered ? '#c7c8d5' : '#69b57c',
      text: isHovered ? '#c7c8d5' : '#69b57c',
    };
  }
  return {
    icon: isHovered ? '#69b57c' : 'var(--icon-inactive)',
    text: isHovered ? 'var(--secondary)' : 'var(--icon-inactive)',
  };
};

const textClassBase = 'flex flex-col justify-center leading-[0] min-w-full relative shrink-0 text-center w-[min-content] transition-colors whitespace-nowrap';

function ProfileNavItem({ label, onClick, isActive, onHover, hoveredItem }: { label: string; onClick: () => void; isActive: boolean; onHover: (item: string | null) => void; hoveredItem: string | null }) {
  const { icon, text } = navColors(isActive, hoveredItem === 'profile');
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHover('profile')}
      onMouseLeave={() => onHover(null)}
      className="content-stretch flex flex-col gap-[4px] h-[50px] items-center relative shrink-0 w-[60px] cursor-pointer group"
    >
      <div className="relative shrink-0 size-[24px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g>
            <path clipRule="evenodd" d={svgPaths.p18fb9000} fillRule="evenodd" fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
          </g>
        </svg>
      </div>
      <div className={textClassBase} style={{ color: text, fontFamily: "'Roboto', sans-serif", fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--text-desktop-body)', fontVariationSettings: "'wdth' 100" }}>
        <p style={{ lineHeight: 'var(--text-desktop-body-lh)' }}>{label}</p>
      </div>
    </button>
  );
}

function CommunityNavItem({ label, onClick, isActive, onHover, hoveredItem }: { label: string; onClick: () => void; isActive: boolean; onHover: (item: string | null) => void; hoveredItem: string | null }) {
  const { icon, text } = navColors(isActive, hoveredItem === 'community');
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHover('community')}
      onMouseLeave={() => onHover(null)}
      className="content-stretch flex flex-col gap-[4px] h-[50px] items-center relative shrink-0 w-[80px] cursor-pointer group"
    >
      <div className="h-[24px] relative shrink-0 w-[26px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 24">
          <path d={svgPaths.p3983d80} fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
        </svg>
      </div>
      <div className={textClassBase} style={{ color: text, fontFamily: "'Roboto', sans-serif", fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--text-desktop-body)', fontVariationSettings: "'wdth' 100" }}>
        <p style={{ lineHeight: 'var(--text-desktop-body-lh)' }}>{label}</p>
      </div>
    </button>
  );
}

function DailyTipsNavItem({ label, onClick, isActive, onHover, hoveredItem }: { label: string; onClick: () => void; isActive: boolean; onHover: (item: string | null) => void; hoveredItem: string | null }) {
  const { icon, text } = navColors(isActive, hoveredItem === 'daily-tips');
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHover('daily-tips')}
      onMouseLeave={() => onHover(null)}
      className="content-stretch flex flex-col gap-[4px] h-[50px] items-center justify-center relative shrink-0 w-[85px] cursor-pointer group"
    >
      <div className="relative shrink-0 size-[24px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g>
            <path d={svgPaths.p3bdb8380} fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
          </g>
        </svg>
      </div>
      <div className={textClassBase} style={{ color: text, fontFamily: "'Roboto', sans-serif", fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--text-desktop-body)', fontVariationSettings: "'wdth' 100" }}>
        <p style={{ lineHeight: 'var(--text-desktop-body-lh)' }}>{label}</p>
      </div>
    </button>
  );
}

function HelpCenterNavItem({ label, onClick, isActive, onHover, hoveredItem }: { label: string; onClick: () => void; isActive: boolean; onHover: (item: string | null) => void; hoveredItem: string | null }) {
  const { icon, text } = navColors(isActive, hoveredItem === 'help-center');
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHover('help-center')}
      onMouseLeave={() => onHover(null)}
      className="content-stretch flex flex-col gap-[4px] h-[50px] items-center justify-center relative shrink-0 w-[100px] cursor-pointer group"
    >
      <div className="relative shrink-0 size-[24px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g>
            <path d={svgPaths.pdd1b780} fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
          </g>
        </svg>
      </div>
      <div className={textClassBase} style={{ color: text, fontFamily: "'Roboto', sans-serif", fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--text-desktop-body)', fontVariationSettings: "'wdth' 100" }}>
        <p style={{ lineHeight: 'var(--text-desktop-body-lh)' }}>{label}</p>
      </div>
    </button>
  );
}

function TutorialNavItem({ label, onClick, isActive, onHover, hoveredItem }: { label: string; onClick: () => void; isActive: boolean; onHover: (item: string | null) => void; hoveredItem: string | null }) {
  const { icon, text } = navColors(isActive, hoveredItem === 'tutorial');
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHover('tutorial')}
      onMouseLeave={() => onHover(null)}
      className="content-stretch flex flex-col gap-[4px] h-[50px] items-center relative shrink-0 w-[90px] cursor-pointer group"
    >
      <div className="relative shrink-0 size-[24px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g>
            <path d={svgPaths.p331abd00} fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
          </g>
        </svg>
      </div>
      <div className={textClassBase} style={{ color: text, fontFamily: "'Roboto', sans-serif", fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--text-desktop-body)', fontVariationSettings: "'wdth' 100" }}>
        <p style={{ lineHeight: 'var(--text-desktop-body-lh)' }}>{label}</p>
      </div>
    </button>
  );
}

function Logo({ onClick, isActive, onHover, hoveredItem }: { onClick: () => void; isActive: boolean; onHover: (item: string | null) => void; hoveredItem: string | null }) {
  const { icon } = navColors(isActive, hoveredItem === 'home');
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHover('home')}
      onMouseLeave={() => onHover(null)}
      className="h-[43.014px] relative shrink-0 w-[39.238px] cursor-pointer hover:scale-110 transition-transform group"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 44">
        <g>
          <path d={svgPaths.p2d64900} fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
          <path d={svgPaths.p42620c0} fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
          <path d={svgPaths.p77ea100} fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
          <path d={svgPaths.p1262cb00} fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
          <path d={svgPaths.peaad480} fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
          <path d={svgPaths.p1e943e00} fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
          <path d={svgPaths.p3a30b300} fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
          <path d={svgPaths.p27f6c000} fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
          <path d={svgPaths.p11eb3cc0} fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
          <path d={svgPaths.p1be64400} fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
          <path d={svgPaths.p28cbaef2} fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
          <path d={svgPaths.p155df500} fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
          <path d={svgPaths.pad5f000} fill={icon} style={{ transition: 'fill 150ms ease, color 150ms ease' }} />
        </g>
      </svg>
    </button>
  );
}

function LanguageToggle({ currentLanguage, onToggle }: { currentLanguage: string; onToggle: () => void }) {
  const isEnglish = currentLanguage === 'en';
  
  return (
    <button 
      onClick={onToggle} 
      style={{ 
        width: 97.33,
        height: 50, 
        padding: 4, 
        background: '#69B57C', 
        borderRadius: 25, 
        display: 'flex',
        alignItems: 'center', 
        gap: 4, 
        border: 'none',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      <div style={{ 
        width: 42.67, 
        height: 42.86, 
        background: isEnglish ? 'white' : '#69B57C', 
        borderRadius: 9999,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ 
          color: isEnglish ? '#69B57C' : '#8AC0AD', 
          fontSize: 16, 
          fontFamily: 'Roboto', 
          fontWeight: 700, 
          lineHeight: '24px'
        }}>EN</span>
      </div>
      <div style={{ 
        width: 42.67, 
        height: 42.86, 
        background: isEnglish ? '#69B57C' : 'white', 
        borderRadius: 9999,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ 
          color: isEnglish ? '#8AC0AD' : '#69B57C', 
          fontSize: 16, 
          fontFamily: 'Roboto', 
          fontWeight: 700, 
          lineHeight: '24px'
        }}>हि</span>
      </div>
    </button>
  );
}

export function DesktopNavigationBar({ onNavigate, currentPage }: DesktopNavigationBarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [logoGap, setLogoGap] = useState(138);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const updateLogoGap = () => {
      const containerWidth = window.innerWidth;
      // At 1280px and above: use 138px gap
      // Below 1280px: reduce gap proportionally
      if (containerWidth >= 1280) {
        setLogoGap(138);
      } else if (containerWidth >= 1025) {
        // Scale gap from 138px down to 60px as width goes from 1280px to 1025px
        const ratio = (containerWidth - 1025) / (1280 - 1025);
        setLogoGap(Math.floor(60 + ratio * 78)); // 60 + ratio * (138 - 60)
      } else {
        setLogoGap(60);
      }
    };

    updateLogoGap();
    window.addEventListener('resize', updateLogoGap);
    return () => window.removeEventListener('resize', updateLogoGap);
  }, []);

  useEffect(() => {
    if (hoveredItem) {
      console.debug('[desktop-nav] hovering item', hoveredItem);
    }
  }, [hoveredItem]);

  useEffect(() => {
    if (currentPage) {
      console.debug('[desktop-nav] active item', currentPage);
    }
  }, [currentPage]);

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="bg-background overflow-clip relative rounded-[50px] size-full" style={{ boxShadow: 'var(--elevation-sm)' }}>
      <div className="absolute content-stretch flex items-center left-[31px] top-[11px]" style={{ width: 'calc(100% - 63px)' }} data-node-id="321:15375">
        <div className="content-stretch flex items-center relative shrink-0" style={{ gap: `${logoGap}px` }} data-node-id="321:15376">
          <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-node-id="321:15377">
            <ProfileNavItem label={t.nav.profile} onClick={() => onNavigate('profile')} isActive={currentPage === 'profile'} onHover={setHoveredItem} hoveredItem={hoveredItem} />
            <CommunityNavItem label={t.nav.community} onClick={() => onNavigate('community')} isActive={currentPage === 'community'} onHover={setHoveredItem} hoveredItem={hoveredItem} />
            <DailyTipsNavItem label={t.nav.dailyTips} onClick={() => onNavigate('all-stories')} isActive={currentPage === 'all-stories'} onHover={setHoveredItem} hoveredItem={hoveredItem} />
            <HelpCenterNavItem label={t.nav.helpCenter} onClick={() => onNavigate('all-stories')} isActive={currentPage === 'all-stories'} onHover={setHoveredItem} hoveredItem={hoveredItem} />
          </div>
          <Logo onClick={() => onNavigate('home')} isActive={currentPage === 'home'} onHover={setHoveredItem} hoveredItem={hoveredItem} />
        </div>
        <div className="flex-1" />
        <div className="content-stretch flex gap-[24px] items-center justify-center relative shrink-0" data-node-id="321:15383">
          <TutorialNavItem label={t.nav.tutorial} onClick={() => onNavigate('tutorial')} isActive={currentPage === 'tutorial'} onHover={setHoveredItem} hoveredItem={hoveredItem} />
          <LanguageToggle currentLanguage={language} onToggle={handleLanguageToggle} />
        </div>
      </div>
    </div>
  );
}
