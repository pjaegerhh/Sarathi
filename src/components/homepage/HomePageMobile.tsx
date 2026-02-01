 import {
  HeroSectionMobile,
  QuoteSectionMobile,
  ServicesSectionMobile,
  ProsthesisSectionMobile,
  ServiceCentersSectionMobile,
  HelpCenterFinderSectionMobile,
  ShareStorySectionMobile,
  CommunitySectionMobile,
  ClosingCTASectionMobile,
  FooterSectionMobile
} from './contentsections';
import { MobileTopNavigation } from '../MobileTopNavigation';

interface HomePageMobileProps {
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
}

export function HomePageMobile({ onNavigate, isLoggedIn = false }: HomePageMobileProps) {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Mobile Top Navigation - Sticky */}
      <MobileTopNavigation onNavigate={onNavigate} />
      
      {/* Hero Section Mobile */}
      <section className="w-full flex justify-center px-4" style={{ paddingTop: '66px', paddingBottom: '24px' }}>
        <HeroSectionMobile />
      </section>

      <div style={{ height: '50px' }} />

      {/* Content Sections */}
      <QuoteSectionMobile />

      <div style={{ height: '50px' }} />

      <ServicesSectionMobile />

      <div style={{ height: '50px' }} />

      <ProsthesisSectionMobile />

      <div style={{ height: '50px' }} />

      <HelpCenterFinderSectionMobile />

      <div style={{ height: '50px' }} />

      <ServiceCentersSectionMobile />

      <div style={{ height: '50px' }} />

      <ShareStorySectionMobile />

      <div style={{ height: '50px' }} />

      <CommunitySectionMobile onNavigate={onNavigate} isLoggedIn={isLoggedIn} />

      <div style={{ height: '50px' }} />

      <ClosingCTASectionMobile onNavigate={onNavigate} isLoggedIn={isLoggedIn} />

      <div style={{ height: '50px' }} />

      <FooterSectionMobile />
    </div>
  );
}

