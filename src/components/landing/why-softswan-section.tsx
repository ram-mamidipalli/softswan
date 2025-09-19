import { Target, BrainCircuit, Zap, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionSubtitle, SectionTitle } from './section-helpers';

const features = [
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'Built for Founders',
    description: 'Real-world skills for startup and business success.',
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'Mind + Voice Mastery',
    description: 'Strategic thinking meets persuasive communication.',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Fast & Actionable',
    description: 'Bite-sized lessons with immediate application.',
  },
  {
    icon: <Smartphone className="h-8 w-8 text-primary" />,
    title: 'Accessible Anywhere',
    description: 'Learn on mobile, desktop, or in between meetings.',
  },
];

export function WhySoftSwanSection() {
  return (
    <section id="features" className="bg-background">
      <div className="container mx-auto px-4 py-24 sm:py-32 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionTitle>Why SoftSwan?</SectionTitle>
          <SectionSubtitle>
            We bridge the gap between academic knowledge and real-world implementation.
          </SectionSubtitle>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-transparent bg-secondary shadow-none transition-shadow duration-300 hover:shadow-lg"
            >
              <CardHeader>
                {feature.icon}
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
