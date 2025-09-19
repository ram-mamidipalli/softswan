import Link from 'next/link';
import { Lightbulb, Puzzle, BrainCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionSubtitle, SectionTitle } from './section-helpers';

const puzzles = [
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'Daily Riddles',
    description: 'Test your wit with our curated daily brain-teasers.',
  },
  {
    icon: <Puzzle className="h-8 w-8 text-primary" />,
    title: 'Logical Puzzles',
    description: 'Enhance your deduction skills with complex logical challenges.',
  },
  {
    icon: <BrainCog className="h-8 w-8 text-primary" />,
    title: 'Aptitude Exercises',
    description: 'Practice questions modeled after real placement tests.',
  },
];

export function ProblemSolvingSection() {
  return (
    <section id="puzzles" className="bg-secondary">
      <div className="container mx-auto px-4 py-24 sm:py-32 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionTitle>Boost Your IQ with Engaging Challenges</SectionTitle>
          <SectionSubtitle>
            Daily riddles, logical puzzles, and aptitude exercises that sharpen
            your reasoning and help you crack interviews.
          </SectionSubtitle>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {puzzles.map((puzzle, index) => (
            <Card
              key={index}
              className="transform-gpu transition-transform duration-300 hover:-translate-y-2"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                {puzzle.icon}
                <CardTitle>{puzzle.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{puzzle.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <Link href="#">Try a Puzzle Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
