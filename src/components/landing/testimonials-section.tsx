import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { SectionSubtitle, SectionTitle } from './section-helpers';
import { User } from 'lucide-react';

const testimonials = [
  {
    quote:
      'SoftSwan helped me refine my pitch and land my first investor. The communication tutorials were a game-changer.',
    name: 'Alex Carter',
    title: 'Founder & CEO, Innovate Inc.',
    avatarId: 'avatar1',
  },
  {
    quote:
      'The strategy challenges gave me clarity on my product roadmap. I feel much more confident in my business decisions.',
    name: 'Jessica Chen',
    title: 'Startup Founder',
    avatarId: 'avatar2',
  },
];

export function TestimonialsSection() {

  return (
    <section id="testimonials" className="bg-secondary">
      <div className="container mx-auto px-4 py-24 sm:py-32 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionTitle>What Founders Say</SectionTitle>
          <SectionSubtitle>
            Entrepreneurs are already sharpening their skills with us.
          </SectionSubtitle>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => {
            return (
              <Card key={index} className="flex flex-col justify-between">
                <CardContent className="p-6">
                  <p className="text-lg text-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </CardContent>
                <div className="flex items-center gap-4 border-t bg-background/50 p-6">
                  <Avatar>
                    <AvatarFallback>
                      <User className="h-5 w-5 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
