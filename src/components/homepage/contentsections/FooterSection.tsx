import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import heartIcon from '../../../assets/svg/heart.svg';

// ===========================================
// SECTION 10: FOOTER
// ===========================================
export function FooterSectionDesktop() {
  const { t } = useLanguage();
  
  return (
    <div 
      className="bg-[#f2f2f7] box-border flex flex-col gap-[10px] items-start justify-center pb-[39px] pt-[36px] px-[27px] relative" 
      style={{ width: '1280px', minHeight: 'auto' }}
      data-name="Footer"
    >
      <div className="flex gap-[20px] items-center justify-between relative shrink-0 w-full flex-wrap" data-name="Sarathi.co.in" style={{ maxWidth: '100%' }}>
        <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#505050] text-[18px]" style={{ flex: '0 0 auto', maxWidth: '220px' }}>
          <p className="leading-[28px]" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{t.footer.copyright}</p>
        </div>
        <div className="flex gap-[2px] items-center relative shrink-0 flex-1 justify-center min-w-0" data-name="Quotes" style={{ maxWidth: '600px', flex: '1 1 auto' }}>
          <div className="bg-clip-text bg-gradient-to-b flex flex-col from-[#69b57c] justify-center leading-[0] relative shrink-0 text-[18px] to-[#388896]" style={{ WebkitTextFillColor: "transparent", wordWrap: 'break-word', overflowWrap: 'break-word' }}>
            <p className="leading-[28px] whitespace-normal">{t.footer.designedForInclusion}</p>
          </div>
          <div className="relative shrink-0 w-[24px] h-[24px] flex-shrink-0" data-name="Icon">
            <img 
              src={heartIcon} 
              alt="" 
              className="w-6 h-6 shrink-0" 
              style={{ display: 'block' }} 
            />
          </div>
          <div className="bg-clip-text bg-gradient-to-b flex flex-col from-[#69b57c] justify-center leading-[0] relative shrink-0 text-[18px] to-[#388896]" style={{ WebkitTextFillColor: "transparent", wordWrap: 'break-word', overflowWrap: 'break-word' }}>
            <p className="leading-[28px] whitespace-normal">{t.footer.builtForChange}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#505050] text-[18px]" style={{ flex: '0 0 auto', maxWidth: '400px', textAlign: 'right' }}>
          <p className="leading-[28px] whitespace-normal" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{t.footer.about} • {t.footer.contact} • {t.footer.privacy} • {t.footer.exploreStories}</p>
        </div>
      </div>
    </div>
  );
}

export function FooterSectionMobile() {
  const { t } = useLanguage();
  
  return (
    <div className="bg-[#f2f2f7] box-border flex flex-col gap-4 items-center justify-center py-6 px-4 w-full" data-name="Footer">
      <div className="flex flex-col gap-4 items-center relative shrink-0 w-full" data-name="Sarathi.co.in">
        <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#505050] text-[18px] text-center">
          <p className="leading-[28px]">{t.footer.copyright}</p>
        </div>
        <div className="flex gap-[2px] items-center relative shrink-0" data-name="Quotes">
          <div className="bg-clip-text bg-gradient-to-b flex flex-col from-[#69b57c] justify-center leading-[0] relative shrink-0 text-[18px] to-[#388896]" style={{ WebkitTextFillColor: "transparent" }}>
            <p className="leading-[28px]">{t.footer.designedForInclusion}</p>
          </div>
          <div className="relative shrink-0 w-[24px] h-[24px]" data-name="Icon">
            <img 
              src={heartIcon} 
              alt="" 
              className="w-6 h-6 shrink-0" 
              style={{ display: 'block' }} 
            />
          </div>
          <div className="bg-clip-text bg-gradient-to-b flex flex-col from-[#69b57c] justify-center leading-[0] relative shrink-0 text-[18px] to-[#388896]" style={{ WebkitTextFillColor: "transparent" }}>
            <p className="leading-[28px]">{t.footer.builtForChange}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#505050] text-[18px] text-center">
          <p className="leading-[28px]">{t.footer.about} • {t.footer.contact} • {t.footer.privacy} • {t.footer.exploreStories}</p>
        </div>
      </div>
    </div>
  );
}
