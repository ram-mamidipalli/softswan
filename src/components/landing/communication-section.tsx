import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SectionSubtitle, SectionTitle } from './section-helpers';
import { TutorialRecommender } from './tutorial-recommender';

export function CommunicationSection() {
  return (
    <section id="tutorials" className="bg-background">
      <div className="container mx-auto px-4 py-24 sm:py-32 lg:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="relative">
            <Card>
              <CardContent className="p-4">
                <div className="relative aspect-video overflow-hidden rounded-md">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/eIho2S0ZahI"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
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
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-foreground/50 text-foreground"
              >
                <Link href="#">Watch More Tutorials</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
