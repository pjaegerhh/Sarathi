import { useState, useEffect } from 'react';
import { DesktopNavigationBar } from '../DesktopNavigationBar';
import HeroSection from './HeroSection';
import {
  QuoteSectionDesktop,
  ServicesSectionDesktop,
  ProsthesisSectionDesktop,
  ServiceCentersSectionDesktop,
  HelpCenterSectionDesktop,
  SharingSectionDesktop,
  CommunitySectionDesktop,
  ClosingCTASectionDesktop,
  FooterSectionDesktop
} from './ContentSections';

interface HomePageDesktopProps {
  onNavigate: (page: string) => void;
}

export function HomePageDesktop({ onNavigate }: HomePageDesktopProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const viewportWidth = window.innerWidth;
      const canvasWidth = 1280;
      // Scale down if viewport is smaller than 1280px
      const newScale = Math.min(1, viewportWidth / canvasWidth);
      setScale(newScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Sticky Navigation Bar - Centered, respects canvas width */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1025px] h-[72px] px-4">
        <div className="w-full h-full">
          <DesktopNavigationBar onNavigate={onNavigate} />
        </div>
      </div>

      {/* Hero Section - Max 1280px width, centered, 100% width on smaller screens */}
      <div className="w-full flex justify-center">
        <section className="w-full max-w-[1280px] h-[840px] relative">
          <HeroSection />
        </section>
      </div>

      {/* Main Canvas Container - 1280px centered, scales down on smaller viewports */}
      <div className="w-full overflow-hidden flex justify-center">
        <div 
          className="w-[1280px]"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          {/* Main Content Sections - Quote, Services, Prosthesis, Help Center, Service Centers */}
          <section className="relative w-full h-[2322.72px]">
            <QuoteSectionDesktop />
            <ServicesSectionDesktop />
            <ProsthesisSectionDesktop />
            <ServiceCentersSectionDesktop />
            <HelpCenterSectionDesktop />
          </section>

          {/* Story Sharing, Statistics, Community, Closing CTA, Footer */}
          <section className="relative w-full h-[2322.72px]">
            <SharingSectionDesktop />
            <CommunitySectionDesktop />
            <ClosingCTASectionDesktop />
            <FooterSectionDesktop />
          </section>
        </div>
      </div>
    </div>
  );
}

