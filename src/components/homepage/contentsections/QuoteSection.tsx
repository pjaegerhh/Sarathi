import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

// ===========================================
// SECTION 2: INTRODUCTORY QUOTE
// ===========================================
export function QuoteSectionDesktop() {
  const { t } = useLanguage();
  
  return (
    <div className="w-[967px] h-[140px] flex flex-col gap-3 items-center justify-center" data-name="Introductory Quote">
      <div className="flex flex-col text-h3 justify-center leading-[0] relative shrink-0 text-body-color text-center w-[967px]">
        <p className="leading-[32px]">{t.home.heroQuote}</p>
      </div>
      <div className="flex flex-col text-body-lg gap-2 items-center text-center" data-name="Author, detail">
        <div className="flex flex-col justify-center relative shrink-0 text-primary w-[269px]">
          <p className="leading-[28px]">{t.home.heroAuthor}</p>
        </div>
        <div className="flex flex-col justify-center min-w-full relative shrink-0 text-tertiary w-[min-content]">
          <p className="leading-[28px]">{t.home.heroAuthorDetail}</p>
        </div>
      </div>
    </div>
  );
}

export function QuoteSectionMobile() {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col gap-3 items-center justify-center w-full px-4" data-name="Introductory Quote">
      <div className="flex flex-col text-h3 justify-center leading-[0] relative shrink-0 text-body-color text-center w-full">
        <p className="leading-[32px]">{t.home.heroQuote}</p>
      </div>
      <div className="flex flex-col text-body-lg gap-2 items-center text-center" data-name="Author, detail">
        <div className="flex flex-col justify-center relative shrink-0 text-primary">
          <p className="leading-[28px]">{t.home.heroAuthor}</p>
        </div>
        <div className="flex flex-col justify-center min-w-full relative shrink-0 text-tertiary w-[min-content]">
          <p className="leading-[28px]">{t.home.heroAuthorDetail}</p>
        </div>
      </div>
    </div>
  );
}
