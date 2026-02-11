import FigmaHomepage from '../imports/Homepage';
import { useLanguage } from '../contexts/LanguageContext';

interface HomePageMobileProps {
  onNavigate: (page: string) => void;
}

export function HomePageMobile({ onNavigate: _onNavigate }: HomePageMobileProps) {
  const { t: _t } = useLanguage();

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* Use Figma imported design */}
      <FigmaHomepage />
    </div>
  );
}
