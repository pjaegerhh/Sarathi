import {
  QuoteSectionMobile,
  ServicesSectionMobile,
  ProsthesisSectionMobile,
  ServiceCentersSectionMobile,
  HelpCenterSectionMobile,
  SharingSectionMobile,
  CommunitySectionMobile,
  ClosingCTASectionMobile,
  FooterSectionMobile
} from './ContentSections';

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
      <ServiceCentersSectionMobile />
      <HelpCenterSectionMobile />
      <SharingSectionMobile />
      <CommunitySectionMobile />
      <ClosingCTASectionMobile />
      <FooterSectionMobile />
    </div>
  );
}

