import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { DesktopNavigation } from './components/DesktopNavigation';
import { MobileNavigation } from './components/MobileNavigation';
import { HomePageDesktop } from './components/HomePageDesktop';
import { HomePageMobile } from './components/HomePageMobile';
import { AuthPage } from './components/AuthPage';
import { CommunityPage } from './components/CommunityPage';
import { StoriesPage } from './components/StoriesPage';
import { ProfilePage } from './components/ProfilePage';
import { AdminDashboard } from './components/AdminDashboard';
import { Toaster } from './components/ui/sonner';

type Page = 'home' | 'auth' | 'community' | 'stories' | 'profile' | 'daily-tips' | 'help-center' | 'tutorial' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if mobile based on screen width
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add PWA meta tags
  useEffect(() => {
    // Add manifest link
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    document.head.appendChild(manifestLink);

    // Add theme color meta - read from CSS variable
    const themeColorMeta = document.createElement('meta');
    themeColorMeta.name = 'theme-color';
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    themeColorMeta.content = primaryColor || 'rgba(56, 136, 150, 1)';
    document.head.appendChild(themeColorMeta);

    // Add apple mobile web app capable
    const appleMeta = document.createElement('meta');
    appleMeta.name = 'apple-mobile-web-app-capable';
    appleMeta.content = 'yes';
    document.head.appendChild(appleMeta);

    // Add viewport meta
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      const newViewportMeta = document.createElement('meta');
      newViewportMeta.name = 'viewport';
      newViewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover';
      document.head.appendChild(newViewportMeta);
    }

    return () => {
      document.head.removeChild(manifestLink);
      document.head.removeChild(themeColorMeta);
      document.head.removeChild(appleMeta);
    };
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return isMobile ? (
          <HomePageMobile onNavigate={handleNavigate} />
        ) : (
          <HomePageDesktop onNavigate={handleNavigate} />
        );
      case 'auth':
        return <AuthPage onNavigate={handleNavigate} />;
      case 'community':
        return <CommunityPage onNavigate={handleNavigate} />;
      case 'stories':
        return <StoriesPage />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'daily-tips':
      case 'help-center':
      case 'tutorial':
        return (
          <div className="min-h-screen flex items-center justify-center bg-background pt-spacing-5xl pb-spacing-5xl">
            <div className="w-full max-w-[1280px] mx-auto px-spacing-xl">
              <div className="text-center">
                <h2 className="mb-spacing-xl capitalize">{currentPage.replace('-', ' ')}</h2>
                <p className="text-muted-foreground mb-spacing-4xl">Coming soon!</p>
                <button
                  onClick={() => handleNavigate('home')}
                  className="px-spacing-4xl py-spacing-sm bg-primary text-primary-foreground rounded-button"
                >
                  Go to Home
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return isMobile ? (
          <HomePageMobile onNavigate={handleNavigate} />
        ) : (
          <HomePageDesktop onNavigate={handleNavigate} />
        );
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          {/* Navigation - Hidden only on auth and admin pages */}
          {currentPage !== 'auth' && currentPage !== 'admin' && (
            <>
              {isMobile ? (
                <MobileNavigation onNavigate={handleNavigate} currentPage={currentPage} />
              ) : (
                currentPage === 'home' ? null : (
                  <DesktopNavigation onNavigate={handleNavigate} currentPage={currentPage} />
                )
              )}
            </>
          )}

          {/* Page Content */}
          <main className={currentPage !== 'auth' && currentPage !== 'admin' && currentPage !== 'home' && !isMobile ? 'pt-[72px]' : ''}>
            {renderPage()}
          </main>

          {/* Toast Notifications */}
          <Toaster />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}
