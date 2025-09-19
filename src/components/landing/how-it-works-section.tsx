import Link from 'next/link';
import { Map, BookOpenCheck, TrendingUp, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionSubtitle, SectionTitle } from './section-helpers';

const steps = [
  {
    icon: <Map className="h-10 w-10 text-primary" />,
    title: 'Choose Your Track',
    description: 'Strategy, communication, or both.',
  },
  {
    icon: <BookOpenCheck className="h-10 w-10 text-primary" />,
    title: 'Learn & Apply',
    description:
      'Daily challenges, tutorials, and frameworks.',
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: 'Implement & Grow',
    description: 'Track progress, apply insights, build momentum.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="process" className="bg-secondary">
      <div className="container mx-auto px-4 py-24 sm:py-32 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionTitle>How SoftSwan Works</SectionTitle>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden items-center lg:flex"
          >
            <div className="h-0.5 w-full border-t-2 border-dashed border-border" />
          </div>
          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/20 bg-background shadow-lg">
                  {step.icon}
                </div>
                <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <Link href="#">Get Started Today</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
