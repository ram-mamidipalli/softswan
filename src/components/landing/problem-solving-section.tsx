import Link from 'next/link';
import { BarChart, CheckCircle, Lightbulb, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionSubtitle, SectionTitle } from './section-helpers';

const puzzles = [
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: 'Market Analysis',
    description: 'Analyze market trends and identify growth opportunities.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: 'Product Decisions',
    description: 'Make tough calls on feature prioritization and roadmaps.',
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'Growth Puzzles',
    description: 'Solve challenges related to user acquisition and scaling.',
  },
  {
    icon: <Handshake className="h-8 w-8 text-primary" />,
    title: 'Find Right Investor',
    description: 'Learn to identify and pitch to the right investors for your startup.',
  }
];

export function ProblemSolvingSection() {
  return (
    <section id="strategy" className="bg-secondary">
      <div className="container mx-auto px-4 py-24 sm:py-32 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionTitle>Strengthen Your Business Mindset</SectionTitle>
          <SectionSubtitle>
            Daily case studies, decision-making challenges, and logic-based
            exercises designed to sharpen your entrepreneurial thinking and
            prepare you for real-world business scenarios.
          </SectionSubtitle>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
            <Link href="#">Try a Challenge Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
