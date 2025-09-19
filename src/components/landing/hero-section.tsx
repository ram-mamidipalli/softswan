import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BrainCircuit, MessageSquare } from 'lucide-react';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-visual');

  return (
    <section id="home" className="relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 py-24 sm:py-32 lg:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Sharpen Your Mind.
              <br />
              <span className="relative inline-block">
                Master Your Voice.
                <span className="absolute -bottom-2 left-0 h-2 w-full bg-primary/30"></span>
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground lg:mx-0">
              SoftSwan is your personal growth hub for problem-solving riddles,
              puzzles, and communication tutorials—designed to make you confident
              and job-ready.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button asChild size="lg">
                <Link href="#">Start Learning Free</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-foreground/50 text-foreground"
              >
                <Link href="#tutorials">Explore Tutorials</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {heroImage && (
              <div className="relative rounded-lg shadow-xl">
                <div className="absolute -left-4 -top-4 z-10 animate-pulse rounded-full bg-primary/20 p-3">
                  <BrainCircuit className="h-8 w-8 text-primary" />
                </div>
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={800}
                  height={600}
                  className="rounded-lg object-cover"
                  data-ai-hint={heroImage.imageHint}
                />
                 <div className="absolute -bottom-4 -right-4 z-10 animate-pulse rounded-full bg-accent p-3">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
