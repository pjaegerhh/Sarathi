import { DesktopNavigationBar } from './DesktopNavigationBar';

interface DesktopNavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function DesktopNavigation({ onNavigate }: DesktopNavigationProps) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1025px] h-[72px] px-4">
      <div className="w-full h-full">
        <DesktopNavigationBar onNavigate={onNavigate} />
      </div>
    </div>
  );
}
