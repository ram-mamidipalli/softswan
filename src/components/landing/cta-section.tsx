import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionSubtitle, SectionTitle } from './section-helpers';

export function CtaSection() {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-24 sm:py-32 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionTitle>Ready to Sharpen Your Skills?</SectionTitle>
          <SectionSubtitle>
            Join thousands of learners building problem-solving and communication
            mastery with SoftSwan. Your journey to confidence starts here.
          </SectionSubtitle>
          <div className="mt-10">
            <Button asChild size="lg" className="h-12 px-8 text-lg">
              <Link href="#">Join SoftSwan Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
