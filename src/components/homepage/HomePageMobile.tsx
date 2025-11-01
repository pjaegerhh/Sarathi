import {
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

interface HomePageMobileProps {
  onNavigate: (page: string) => void;
}

export function HomePageMobile({ onNavigate }: HomePageMobileProps) {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Mobile Navigation - TBD */}
      
      {/* Hero Section Mobile - TBD */}
      
      {/* Content Sections */}
      <QuoteSectionMobile />
      <ServicesSectionMobile />
      <ProsthesisSectionMobile />
      <HelpCenterFinderSectionMobile />
      <ServiceCentersSectionMobile />
      <ShareStorySectionMobile />
      <CommunitySectionMobile />
      <ClosingCTASectionMobile />
      <FooterSectionMobile />
    </div>
  );
}

