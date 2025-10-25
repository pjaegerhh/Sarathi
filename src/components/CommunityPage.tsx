import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Users, Lock } from 'lucide-react';

interface CommunityPageProps {
  onNavigate: (page: string) => void;
}

export function CommunityPage({ onNavigate }: CommunityPageProps) {
  const { t } = useLanguage();
  const { user } = useAuth();

  // Check if user is allowed to access community
  if (!user || user.role === 'Guest') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 pt-24 pb-24">
        <div className="w-full max-w-[1280px] mx-auto px-4 flex justify-center">
          <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Lock className="text-muted-foreground" size={48} />
            </div>
            <CardTitle>{t.nav.community}</CardTitle>
            <CardDescription>
              {user 
                ? 'Your account is pending approval. An admin or content moderator needs to activate your account to access the community.'
                : 'Please login to access the community.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-4">
            {!user && (
              <Button onClick={() => onNavigate('auth')}>
                {t.auth.login}
              </Button>
            )}
            <Button variant="outline" onClick={() => onNavigate('home')}>
              {t.nav.home}
            </Button>
          </CardContent>
        </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pt-24 pb-24">
      <div className="w-full max-w-[1280px] mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Users className="text-primary" size={32} />
          <div>
            <h1 className="text-3xl">{t.nav.community}</h1>
            <p className="text-sm text-muted-foreground">
              Connect with others on their journey
            </p>
          </div>
        </div>

        {/* Placeholder for community feed */}
        <Card>
          <CardHeader>
            <CardTitle>Community Feed</CardTitle>
            <CardDescription>
              Share your story, connect with others, and find support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-4">Community feed coming soon!</p>
              <p className="text-sm">
                This will be a Facebook-like feed where users can share posts, images, and connect with each other.
              </p>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}
