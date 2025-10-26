import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import svgPaths from "../imports/svg-zth38xejxm";

interface DesktopNavigationBarProps {
  onNavigate: (page: string) => void;
}

function ProfileNavItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="content-stretch flex flex-col gap-[4px] h-[50px] items-center relative shrink-0 w-[60px] cursor-pointer group">
      <div className="relative shrink-0 size-[24px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g>
            <path clipRule="evenodd" d={svgPaths.p18fb9000} fill="var(--icon-inactive)" fillRule="evenodd" className="group-hover:fill-secondary transition-colors" />
          </g>
        </svg>
      </div>
      <div className="flex flex-col justify-center leading-[0] min-w-full relative shrink-0 text-icon-inactive text-center w-[min-content] group-hover:text-secondary transition-colors whitespace-nowrap" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--text-desktop-body)', fontVariationSettings: "'wdth' 100" }}>
        <p style={{ lineHeight: 'var(--text-desktop-body-lh)' }}>{label}</p>
      </div>
    </button>
  );
}

function CommunityNavItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="content-stretch flex flex-col gap-[4px] h-[50px] items-center relative shrink-0 w-[80px] cursor-pointer group">
      <div className="h-[24px] relative shrink-0 w-[26px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 24">
          <path d={svgPaths.p3983d80} fill="var(--icon-inactive)" className="group-hover:fill-secondary transition-colors" />
        </svg>
      </div>
      <div className="flex flex-col justify-center leading-[0] min-w-full relative shrink-0 text-icon-inactive text-center w-[min-content] group-hover:text-secondary transition-colors whitespace-nowrap" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--text-desktop-body)', fontVariationSettings: "'wdth' 100" }}>
        <p style={{ lineHeight: 'var(--text-desktop-body-lh)' }}>{label}</p>
      </div>
    </button>
  );
}

function DailyTipsNavItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="content-stretch flex flex-col gap-[4px] h-[50px] items-center justify-center relative shrink-0 w-[85px] cursor-pointer group">
      <div className="relative shrink-0 size-[24px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g>
            <path d={svgPaths.p3bdb8380} fill="var(--icon-inactive)" className="group-hover:fill-secondary transition-colors" />
          </g>
        </svg>
      </div>
      <div className="flex flex-col justify-center leading-[0] min-w-full relative shrink-0 text-icon-inactive text-center w-[min-content] group-hover:text-secondary transition-colors whitespace-nowrap" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--text-desktop-body)', fontVariationSettings: "'wdth' 100" }}>
        <p style={{ lineHeight: 'var(--text-desktop-body-lh)' }}>{label}</p>
      </div>
    </button>
  );
}

function HelpCenterNavItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="content-stretch flex flex-col gap-[4px] h-[50px] items-center justify-center relative shrink-0 w-[100px] cursor-pointer group">
      <div className="relative shrink-0 size-[24px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g>
            <path d={svgPaths.pdd1b780} fill="var(--icon-inactive)" className="group-hover:fill-secondary transition-colors" />
          </g>
        </svg>
      </div>
      <div className="flex flex-col justify-center leading-[0] min-w-full relative shrink-0 text-icon-inactive text-center w-[min-content] group-hover:text-secondary transition-colors whitespace-nowrap" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--text-desktop-body)', fontVariationSettings: "'wdth' 100" }}>
        <p style={{ lineHeight: 'var(--text-desktop-body-lh)' }}>{label}</p>
      </div>
    </button>
  );
}

function TutorialNavItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="content-stretch flex flex-col gap-[4px] h-[50px] items-center relative shrink-0 w-[90px] cursor-pointer group">
      <div className="relative shrink-0 size-[24px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g>
            <path d={svgPaths.p331abd00} fill="var(--icon-inactive)" className="group-hover:fill-secondary transition-colors" />
          </g>
        </svg>
      </div>
      <div className="flex flex-col justify-center leading-[0] min-w-full relative shrink-0 text-icon-inactive text-center w-[min-content] group-hover:text-secondary transition-colors whitespace-nowrap" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--text-desktop-body)', fontVariationSettings: "'wdth' 100" }}>
        <p style={{ lineHeight: 'var(--text-desktop-body-lh)' }}>{label}</p>
      </div>
    </button>
  );
}

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="h-[43.014px] relative shrink-0 w-[39.238px] cursor-pointer hover:scale-110 transition-transform">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 44">
        <g>
          <path d={svgPaths.p2d64900} fill="var(--secondary)" />
          <path d={svgPaths.p42620c0} fill="var(--secondary)" />
          <path d={svgPaths.p77ea100} fill="var(--secondary)" />
          <path d={svgPaths.p1262cb00} fill="var(--secondary)" />
          <path d={svgPaths.peaad480} fill="var(--secondary)" />
          <path d={svgPaths.p1e943e00} fill="var(--secondary)" />
          <path d={svgPaths.p3a30b300} fill="var(--secondary)" />
          <path d={svgPaths.p27f6c000} fill="var(--secondary)" />
          <path d={svgPaths.p11eb3cc0} fill="var(--secondary)" />
          <path d={svgPaths.p1be64400} fill="var(--secondary)" />
          <path d={svgPaths.p28cbaef2} fill="var(--secondary)" />
          <path d={svgPaths.p155df500} fill="var(--secondary)" />
          <path d={svgPaths.pad5f000} fill="var(--secondary)" />
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

export function DesktopNavigationBar({ onNavigate }: DesktopNavigationBarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [logoGap, setLogoGap] = useState(138);

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

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="bg-background overflow-clip relative rounded-[50px] size-full" style={{ boxShadow: 'var(--elevation-sm)' }}>
      <div className="absolute content-stretch flex items-center left-[31px] top-[11px]" style={{ width: 'calc(100% - 63px)' }} data-node-id="321:15375">
        <div className="content-stretch flex items-center relative shrink-0" style={{ gap: `${logoGap}px` }} data-node-id="321:15376">
          <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-node-id="321:15377">
            <ProfileNavItem label={t.nav.profile} onClick={() => onNavigate('profile')} />
            <CommunityNavItem label={t.nav.community} onClick={() => onNavigate('community')} />
            <DailyTipsNavItem label={t.nav.dailyTips} onClick={() => onNavigate('daily-tips')} />
            <HelpCenterNavItem label={t.nav.helpCenter} onClick={() => onNavigate('help-center')} />
          </div>
          <Logo onClick={() => onNavigate('home')} />
        </div>
        <div className="flex-1" />
        <div className="content-stretch flex gap-[24px] items-center justify-center relative shrink-0" data-node-id="321:15383">
          <TutorialNavItem label={t.nav.tutorial} onClick={() => onNavigate('tutorial')} />
          <LanguageToggle currentLanguage={language} onToggle={handleLanguageToggle} />
        </div>
      </div>
    </div>
  );
}
