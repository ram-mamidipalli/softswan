import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex h-[calc(100dvh-4rem)] min-h-[500px] flex-col items-center justify-center overflow-hidden bg-background"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 items-center gap-12">
          <div className="text-center">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Sharpen Your Mind.
              <br />
              Master Your Voice.
              <br />
              <span className="relative inline-block">
                Start Your <span className="text-primary">Journey</span>.
                <span className="absolute -bottom-2 left-0 h-2 w-full bg-primary/30"></span>
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              SoftSwan is your personal growth hub for problem-solving riddles,
              puzzles, and communication tutorials—designed to make you confident
              and job-ready.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/auth?mode=signup">Start Learning Free</Link>
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
        </div>
      </div>
    </section>
  );
}
