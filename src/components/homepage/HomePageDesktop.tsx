import { useState, useEffect } from 'react';
import { DesktopNavigationBar } from '../DesktopNavigationBar';
import {
  HeroSection,
  QuoteSectionDesktop,
  ServicesSectionDesktop,
  ProsthesisSectionDesktop,
  HelpCenterFinderSectionDesktop,
  ServiceCentersSectionDesktop,
  ShareStorySectionDesktop,
  CommunitySectionDesktop,
  ClosingCTASectionDesktop,
  FooterSectionDesktop
} from './contentsections';

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

      {/* Main Canvas Container - 1280px centered, scales down on smaller viewports */}
      <div className="w-full overflow-hidden flex justify-center">
        <div 
          className="w-[1280px]"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          {/* All Sections - Centered on 1280px canvas with 75px vertical gap */}
          <div className="flex flex-col items-center w-full">
            {/* 1. HeroSection */}
            <section className="w-full flex justify-center">
              <div className="w-full max-w-[1280px] h-[840px] relative">
                <HeroSection />
              </div>
            </section>

            <div style={{ height: '75px' }} />

            {/* 2. QuoteSection */}
            <section className="w-full flex justify-center">
              <div className="w-full max-w-[1280px] flex items-center justify-center">
                <QuoteSectionDesktop />
              </div>
            </section>

            <div style={{ height: '75px' }} />

            {/* 3. ServicesSection */}
            <section className="w-full flex justify-center">
              <div className="w-full max-w-[1280px] flex items-center justify-center">
                <ServicesSectionDesktop />
              </div>
            </section>

            <div style={{ height: '75px' }} />

            {/* 4. ProsthesisSection */}
            <section className="w-full flex justify-center">
              <div className="w-full max-w-[1280px] flex items-center justify-center">
                <ProsthesisSectionDesktop />
              </div>
            </section>

            <div style={{ height: '75px' }} />

            {/* 5. HelpCenterFinderSection */}
            <section className="w-full flex justify-center">
              <div className="w-full max-w-[1280px] flex items-center justify-center">
                <HelpCenterFinderSectionDesktop />
              </div>
            </section>

            <div style={{ height: '75px' }} />

            {/* 6. ServiceCenters */}
            <section className="w-full flex justify-center">
              <div className="w-full max-w-[1280px] flex items-center justify-center">
                <ServiceCentersSectionDesktop />
              </div>
            </section>

            <div style={{ height: '75px' }} />

            {/* 7. ShareStorySection */}
            <section className="w-full flex justify-center">
              <div className="w-full max-w-[1280px] flex items-center justify-center">
                <ShareStorySectionDesktop />
              </div>
            </section>

            <div style={{ height: '75px' }} />

            {/* 8. CommunitySection */}
            <section className="w-full flex justify-center">
              <div className="w-full max-w-[1280px] flex items-center justify-center">
                <CommunitySectionDesktop />
              </div>
            </section>

            <div style={{ height: '75px' }} />

            {/* 9. ClosingCTASection */}
            <section className="w-full flex justify-center">
              <div className="w-full max-w-[1280px] flex items-center justify-center">
                <ClosingCTASectionDesktop />
              </div>
            </section>

            <div style={{ height: '75px' }} />

            {/* 10. FooterSection */}
            <section className="w-full flex justify-center">
              <div className="w-full max-w-[1280px] flex items-center justify-center">
                <FooterSectionDesktop />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

