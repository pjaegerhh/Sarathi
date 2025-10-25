import { useLanguage } from '../contexts/LanguageContext';
import svgPaths from "../imports/svg-zth38xejxm";

interface DesktopNavigationBarProps {
  onNavigate: (page: string) => void;
}

function ProfileNavItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="content-stretch flex flex-col gap-[4px] h-[50px] items-center relative shrink-0 w-[45px] cursor-pointer group">
      <div className="relative shrink-0 size-[24px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g>
            <path clipRule="evenodd" d={svgPaths.p18fb9000} fill="var(--icon-inactive)" fillRule="evenodd" className="group-hover:fill-secondary transition-colors" />
          </g>
        </svg>
      </div>
      <div className="flex flex-col justify-center leading-[0] min-w-full relative shrink-0 text-icon-inactive text-center w-[min-content] group-hover:text-secondary transition-colors" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--text-desktop-body)', fontVariationSettings: "'wdth' 100" }}>
        <p style={{ lineHeight: 'var(--text-desktop-body-lh)' }}>{label}</p>
      </div>
    </button>
  );
}

function CommunityNavItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="content-stretch flex flex-col gap-[4px] h-[50px] items-center relative shrink-0 w-[72px] cursor-pointer group">
      <div className="h-[24px] relative shrink-0 w-[26px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 24">
          <path d={svgPaths.p3983d80} fill="var(--icon-inactive)" className="group-hover:fill-secondary transition-colors" />
        </svg>
      </div>
      <div className="flex flex-col justify-center leading-[0] min-w-full relative shrink-0 text-icon-inactive text-center w-[min-content] group-hover:text-secondary transition-colors" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--text-desktop-body)', fontVariationSettings: "'wdth' 100" }}>
        <p style={{ lineHeight: 'var(--text-desktop-body-lh)' }}>{label}</p>
      </div>
    </button>
  );
}

function DailyTipsNavItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="content-stretch flex flex-col gap-[4px] h-[50px] items-center justify-center relative shrink-0 w-[61px] cursor-pointer group">
      <div className="relative shrink-0 size-[24px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g>
            <path d={svgPaths.p3bdb8380} fill="var(--icon-inactive)" className="group-hover:fill-secondary transition-colors" />
          </g>
        </svg>
      </div>
      <div className="flex flex-col justify-center leading-[0] min-w-full relative shrink-0 text-icon-inactive text-center w-[min-content] group-hover:text-secondary transition-colors" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--text-desktop-body)', fontVariationSettings: "'wdth' 100" }}>
        <p style={{ lineHeight: 'var(--text-desktop-body-lh)' }}>{label}</p>
      </div>
    </button>
  );
}

function HelpCenterNavItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="content-stretch flex flex-col gap-[4px] h-[50px] items-center justify-center relative shrink-0 w-[74px] cursor-pointer group">
      <div className="relative shrink-0 size-[24px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g>
            <path d={svgPaths.pdd1b780} fill="var(--icon-inactive)" className="group-hover:fill-secondary transition-colors" />
          </g>
        </svg>
      </div>
      <div className="flex flex-col justify-center leading-[0] min-w-full relative shrink-0 text-icon-inactive text-center w-[min-content] group-hover:text-secondary transition-colors" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--text-desktop-body)', fontVariationSettings: "'wdth' 100" }}>
        <p style={{ lineHeight: 'var(--text-desktop-body-lh)' }}>{label}</p>
      </div>
    </button>
  );
}

function TutorialNavItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="content-stretch flex flex-col gap-[4px] h-[50px] items-center relative shrink-0 w-[72px] cursor-pointer group">
      <div className="relative shrink-0 size-[24px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g>
            <path d={svgPaths.p331abd00} fill="var(--icon-inactive)" className="group-hover:fill-secondary transition-colors" />
          </g>
        </svg>
      </div>
      <div className="flex flex-col justify-center leading-[0] min-w-full relative shrink-0 text-icon-inactive text-center w-[min-content] group-hover:text-secondary transition-colors" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--text-desktop-body)', fontVariationSettings: "'wdth' 100" }}>
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
    <button onClick={onToggle} className="bg-secondary box-border content-stretch flex gap-[4px] h-[50px] items-center leading-[0] p-[4px] relative rounded-[25px] shrink-0 cursor-pointer">
      {isEnglish ? (
        <>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] h-[42.857px] ml-0 mt-0 relative w-[42.667px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 43">
                <ellipse cx="21.3333" cy="21.4286" fill="var(--background)" rx="21.3333" ry="21.4286" />
              </svg>
            </div>
            <div className="[grid-area:1_/_1] flex flex-col h-[23.256px] justify-center leading-[0] ml-[21.392px] mt-[21.47px] relative text-secondary text-center translate-x-[-50%] translate-y-[-50%] w-[20.784px]" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--text-desktop-label)', fontVariationSettings: "'wdth' 100" }}>
              <p style={{ lineHeight: 'var(--text-desktop-label-lh)' }}>EN</p>
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] h-[42.857px] ml-0 mt-0 relative w-[42.667px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 43">
                <ellipse cx="21.3333" cy="21.4286" fill="var(--secondary)" rx="21.3333" ry="21.4286" />
              </svg>
            </div>
            <div className="[grid-area:1_/_1] flex flex-col h-[18.605px] justify-center leading-[0] ml-[21.333px] mt-[21.47px] relative text-muted text-center translate-x-[-50%] translate-y-[-50%] w-[42.667px]" style={{ fontFamily: "'Roboto', 'Noto Sans Devanagari', sans-serif", fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--text-desktop-label)', fontVariationSettings: "'wdth' 100" }}>
              <p style={{ lineHeight: 'var(--text-desktop-label-lh)' }}>हि</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] h-[42.857px] ml-0 mt-0 relative w-[42.667px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 43">
                <ellipse cx="21.3333" cy="21.4286" fill="var(--secondary)" rx="21.3333" ry="21.4286" />
              </svg>
            </div>
            <div className="[grid-area:1_/_1] flex flex-col h-[23.256px] justify-center leading-[0] ml-[21.392px] mt-[21.47px] relative text-muted text-center translate-x-[-50%] translate-y-[-50%] w-[20.784px]" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--text-desktop-label)', fontVariationSettings: "'wdth' 100" }}>
              <p style={{ lineHeight: 'var(--text-desktop-label-lh)' }}>EN</p>
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] h-[42.857px] ml-0 mt-0 relative w-[42.667px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 43">
                <ellipse cx="21.3333" cy="21.4286" fill="var(--background)" rx="21.3333" ry="21.4286" />
              </svg>
            </div>
            <div className="[grid-area:1_/_1] flex flex-col h-[18.605px] justify-center leading-[0] ml-[21.333px] mt-[21.47px] relative text-secondary text-center translate-x-[-50%] translate-y-[-50%] w-[42.667px]" style={{ fontFamily: "'Roboto', 'Noto Sans Devanagari', sans-serif", fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--text-desktop-label)', fontVariationSettings: "'wdth' 100" }}>
              <p style={{ lineHeight: 'var(--text-desktop-label-lh)' }}>हि</p>
            </div>
          </div>
        </>
      )}
    </button>
  );
}

export function DesktopNavigationBar({ onNavigate }: DesktopNavigationBarProps) {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="bg-background overflow-clip relative rounded-[50px] size-full" style={{ boxShadow: 'var(--elevation-sm)' }}>
      <div className="absolute content-stretch flex items-center justify-between left-[31px] top-[11px] w-[962.333px]">
        <div className="content-stretch flex gap-[138px] items-center relative shrink-0">
          <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
            <ProfileNavItem label={t.nav.profile} onClick={() => onNavigate('profile')} />
            <CommunityNavItem label={t.nav.community} onClick={() => onNavigate('community')} />
            <DailyTipsNavItem label={t.nav.dailyTips} onClick={() => onNavigate('daily-tips')} />
            <HelpCenterNavItem label={t.nav.helpCenter} onClick={() => onNavigate('help-center')} />
          </div>
          <Logo onClick={() => onNavigate('home')} />
        </div>
        <div className="content-stretch flex gap-[24px] items-center justify-center relative shrink-0">
          <TutorialNavItem label={t.nav.tutorial} onClick={() => onNavigate('tutorial')} />
          <LanguageToggle currentLanguage={language} onToggle={handleLanguageToggle} />
        </div>
      </div>
    </div>
  );
}
