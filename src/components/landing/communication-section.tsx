import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { SectionSubtitle, SectionTitle } from './section-helpers';
import { TutorialRecommender } from './tutorial-recommender';

export function CommunicationSection() {
  const videoImage = PlaceHolderImages.find(
    (img) => img.id === 'video-preview'
  );

  return (
    <section id="tutorials" className="bg-background">
      <div className="container mx-auto px-4 py-24 sm:py-32 lg:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="relative">
            <Card>
              <CardContent className="p-4">
                {videoImage && (
                  <div className="relative aspect-video overflow-hidden rounded-md">
                    <Image
                      src={videoImage.imageUrl}
                      alt={videoImage.description}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      data-ai-hint={videoImage.imageHint}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <PlayCircle className="h-20 w-20 text-white/70" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="text-center lg:text-left">
            <SectionTitle>Speak with Confidence</SectionTitle>
            <SectionSubtitle>
              Curated tutorials on public speaking, interview skills, and
              effective communication—all in one place.
            </SectionSubtitle>
            <div className="mt-8">
              <TutorialRecommender />
            </div>
            <div className="mt-8 flex justify-center lg:justify-start">
              <Button asChild size="lg" variant="outline" className="border-foreground/50 text-foreground">
                <Link href="#">Watch Tutorials</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
