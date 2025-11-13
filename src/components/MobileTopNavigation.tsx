import { useLanguage } from '../contexts/LanguageContext';
import sarathiMobileLogo from '../assets/images/Sarathi-mobile.png';
import svgPaths from "../imports/svg-zth38xejxm";

interface MobileTopNavigationProps {
  onNavigate: (page: string) => void;
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
          fontSize: 14, 
          fontFamily: 'Roboto', 
          fontWeight: 500, 
          lineHeight: '20px'
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
          fontSize: 14, 
          fontFamily: 'Roboto', 
          fontWeight: 500, 
          lineHeight: '20px'
        }}>हि</span>
      </div>
    </button>
  );
}

function ProfileIcon({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick} 
      className="relative shrink-0 size-[33px] cursor-pointer"
      aria-label="Profile"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path 
            clipRule="evenodd" 
            d={svgPaths.p18fb9000} 
            fill="#C7C8D5" 
            fillRule="evenodd"
          />
        </g>
      </svg>
    </button>
  );
}

export function MobileTopNavigation({ onNavigate }: MobileTopNavigationProps) {
  const { language, setLanguage } = useLanguage();

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 bg-white"
      style={{ 
        boxShadow: '0px 0px 10px 0px rgba(20,20,20,0.35)',
        padding: '8px 16px',
        height: '50px',
        display: 'flex',
        alignItems: 'center'
      }}
      data-name="Top navigation mobile"
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <button 
          onClick={() => onNavigate('home')} 
          className="h-[22.432px] relative shrink-0 cursor-pointer"
          style={{ width: '88.53px' }}
        >
          <img 
            alt="Sarathi" 
            src={sarathiMobileLogo} 
            className="block max-w-none size-full object-contain"
          />
        </button>
        
        {/* Right side: Profile icon and Language toggle */}
        <div className="flex gap-[12px] items-center relative shrink-0">
          <ProfileIcon onClick={() => onNavigate('profile')} />
          <LanguageToggle currentLanguage={language} onToggle={handleLanguageToggle} />
        </div>
      </div>
    </div>
  );
}

