import { useLanguage } from '../contexts/LanguageContext';
import { Home, Users, BookText, User } from 'lucide-react';

interface MobileNavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function MobileNavigation({ onNavigate, currentPage }: MobileNavigationProps) {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'community', label: t.nav.community, icon: Users },
    { id: 'stories', label: t.nav.stories, icon: BookText },
    { id: 'profile', label: t.nav.profile, icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-border z-50 safe-area-pb">
      <div className="flex items-center justify-around h-full px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center gap-1 min-w-[60px]"
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                isActive ? 'bg-primary text-primary-foreground' : 'text-sidebar-foreground'
              }`}>
                <Icon size={20} />
              </div>
              <span className={`text-xs ${isActive ? 'text-primary' : 'text-sidebar-foreground'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
