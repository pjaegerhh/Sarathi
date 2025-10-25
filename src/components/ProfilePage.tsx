import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User as UserIcon, Mail, Shield, Calendar } from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 pt-24 pb-24">
        <div className="w-full max-w-[1280px] mx-auto px-4 flex justify-center">
          <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>{t.nav.profile}</CardTitle>
            <CardDescription>
              Please login to view your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-4">
            <Button onClick={() => onNavigate('auth')}>
              {t.auth.login}
            </Button>
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
        <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <UserIcon className="text-primary" size={32} />
          <div>
            <h1 className="text-3xl">{t.nav.profile}</h1>
            <p className="text-sm text-muted-foreground">
              Manage your account and preferences
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Account Information</CardTitle>
              <Badge variant={user.status === 'active' ? 'default' : 'outline'}>
                {user.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <UserIcon className="text-muted-foreground mt-1" size={20} />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p>{user.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="text-muted-foreground mt-1" size={20} />
              <div>
                <p className="text-sm text-muted-foreground">{t.auth.email}</p>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="text-muted-foreground mt-1" size={20} />
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p>{t.roles[user.role.toLowerCase() as keyof typeof t.roles]}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="text-muted-foreground mt-1" size={20} />
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p>{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {user.status === 'pending' && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Your account is pending approval. An admin or content moderator will review your account soon.
                </p>
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <Button
                variant="destructive"
                onClick={async () => {
                  await logout();
                  onNavigate('home');
                }}
              >
                {t.auth.logout}
              </Button>
              {(user.role === 'Admin' || user.role === 'ContentModerator') && (
                <Button
                  variant="outline"
                  onClick={() => onNavigate('admin')}
                >
                  {t.admin.title}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}
