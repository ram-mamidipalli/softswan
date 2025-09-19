import { Target, BrainCircuit, Zap, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionSubtitle, SectionTitle } from './section-helpers';

const features = [
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'Focused on Freshers',
    description: 'Skills recruiters actually test for entry-level roles.',
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'Brain + Voice Growth',
    description: 'Problem-solving &amp; communication combined in one platform.',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Fast &amp; Fun',
    description: 'Simple, bite-sized learning that fits into your busy schedule.',
  },
  {
    icon: <Smartphone className="h-8 w-8 text-primary" />,
    title: 'Accessible Anywhere',
    description: 'Seamless learning experience on both mobile and desktop.',
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
