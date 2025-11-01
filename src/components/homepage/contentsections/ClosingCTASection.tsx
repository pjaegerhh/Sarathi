import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

// ===========================================
// SECTION 9: CLOSING CTA
// ===========================================
export function ClosingCTASectionDesktop() {
  const [registerHovered, setRegisterHovered] = React.useState(false);
  const [loginHovered, setLoginHovered] = React.useState(false);
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col gap-3 items-center justify-center w-full max-w-[864px]" data-name="Closing content">
      <div className="flex flex-col text-h1 justify-center leading-[0] min-w-full relative shrink-0 text-heading text-center w-[min-content]">
        <p className="leading-[60px]">{t.home.closingTitle}</p>
      </div>
      <div className="flex flex-col text-h3 justify-center leading-[0] min-w-full relative shrink-0 text-body-color text-center w-[min-content]">
        <p className="leading-[32px]">{t.home.closingSubtext}</p>
      </div>
      <div className="flex gap-[18px] items-center relative shrink-0" data-name="Buttons">
        <button 
          className="box-border flex gap-2 h-[48px] items-center justify-center px-6 py-2 relative rounded-[26px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[160px] cursor-pointer transition-colors"
          style={{ 
            backgroundColor: registerHovered ? '#388896' : '#ffffff',
            transition: 'background-color 300ms'
          }}
          onMouseEnter={() => setRegisterHovered(true)}
          onMouseLeave={() => setRegisterHovered(false)}
          data-name="Primary button desktop"
        >
          <div 
            className="flex flex-col text-label justify-center leading-[0] relative shrink-0 text-nowrap"
            style={{ 
              color: registerHovered ? '#ffffff' : '#388896',
              transition: 'color 300ms'
            }}
          >
            <p className="leading-[24px] whitespace-pre">{t.auth.register}</p>
          </div>
        </button>
        <button 
          className="box-border flex gap-2 h-[50px] items-center justify-center px-6 py-2 relative rounded-[26px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[160px] cursor-pointer transition-colors"
          style={{ 
            backgroundColor: loginHovered ? '#388896' : '#ffffff',
            transition: 'background-color 300ms'
          }}
          onMouseEnter={() => setLoginHovered(true)}
          onMouseLeave={() => setLoginHovered(false)}
          data-name="secondary button desktop"
        >
          <div 
            className="flex flex-col text-label justify-center leading-[0] relative shrink-0 text-nowrap"
            style={{ 
              color: loginHovered ? '#ffffff' : '#388896',
              transition: 'color 300ms'
            }}
          >
            <p className="leading-[24px] whitespace-pre">{t.auth.login}</p>
          </div>
        </button>
      </div>
    </div>
  );
}

export function ClosingCTASectionMobile() {
  const [registerHovered, setRegisterHovered] = React.useState(false);
  const [loginHovered, setLoginHovered] = React.useState(false);
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col gap-3 items-center justify-center w-full px-4" data-name="Closing content">
      <div className="flex flex-col text-h1 justify-center leading-[0] relative shrink-0 text-heading text-center w-full">
        <p className="leading-[60px]">{t.home.closingTitle}</p>
      </div>
      <div className="flex flex-col text-h3 justify-center leading-[0] relative shrink-0 text-body-color text-center w-full">
        <p className="leading-[32px]">{t.home.closingSubtext}</p>
      </div>
      <div className="flex gap-[18px] items-center relative shrink-0" data-name="Buttons">
        <button 
          className="box-border flex gap-2 h-[48px] items-center justify-center px-6 py-2 relative rounded-[26px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[160px] cursor-pointer transition-colors"
          style={{ 
            backgroundColor: registerHovered ? '#388896' : '#ffffff',
            transition: 'background-color 300ms'
          }}
          onMouseEnter={() => setRegisterHovered(true)}
          onMouseLeave={() => setRegisterHovered(false)}
        >
          <div 
            className="flex flex-col text-label justify-center leading-[0] relative shrink-0 text-nowrap"
            style={{ 
              color: registerHovered ? '#ffffff' : '#388896',
              transition: 'color 300ms'
            }}
          >
            <p className="leading-[24px] whitespace-pre">{t.auth.register}</p>
          </div>
        </button>
        <button 
          className="box-border flex gap-2 h-[50px] items-center justify-center px-6 py-2 relative rounded-[26px] shadow-[0px_0px_10px_0px_#dddddd] shrink-0 w-[160px] cursor-pointer transition-colors"
          style={{ 
            backgroundColor: loginHovered ? '#388896' : '#ffffff',
            transition: 'background-color 300ms'
          }}
          onMouseEnter={() => setLoginHovered(true)}
          onMouseLeave={() => setLoginHovered(false)}
        >
          <div 
            className="flex flex-col text-label justify-center leading-[0] relative shrink-0 text-nowrap"
            style={{ 
              color: loginHovered ? '#ffffff' : '#388896',
              transition: 'color 300ms'
            }}
          >
            <p className="leading-[24px] whitespace-pre">{t.auth.login}</p>
          </div>
        </button>
      </div>
    </div>
  );
}
