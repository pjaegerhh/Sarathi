import { useState, useEffect } from 'react';
import { DesktopNavigationBar } from './DesktopNavigationBar';
import HeroSection from '../imports/HeroSection';
import Group56612Complete from '../imports/Group56612-1-8138';
import Group56613 from '../imports/Group56613';

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
          {/* Hero Section */}
          <section className="w-full h-[840px]">
            <HeroSection />
          </section>

          {/* Main Content Sections - Quote, Services, Prosthesis, Help Center, Service Centers */}
          <section className="relative w-full h-[2322.72px]">
            <Group56612Complete />
          </section>

          {/* Story Sharing, Statistics, Community, Closing CTA, Footer */}
          <section className="relative w-full h-[2322.72px]">
            <Group56613 />
          </section>
        </div>
      </div>
    </div>
  );
}
