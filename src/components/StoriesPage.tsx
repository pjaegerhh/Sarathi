import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BookText } from 'lucide-react';

export function StoriesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pt-24 pb-24">
      <div className="w-full max-w-[1280px] mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <BookText className="text-primary" size={32} />
          <div>
            <h1 className="text-3xl">{t.nav.stories}</h1>
            <p className="text-sm text-muted-foreground">
              Inspiring journeys from our community
            </p>
          </div>
        </div>

        {/* Placeholder for stories */}
        <Card>
          <CardHeader>
            <CardTitle>User Stories</CardTitle>
            <CardDescription>
              Pre-recorded video, image, and audio stories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-4">Stories coming soon!</p>
              <p className="text-sm">
                This will showcase curated stories with video, images, and audio content.
              </p>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}
