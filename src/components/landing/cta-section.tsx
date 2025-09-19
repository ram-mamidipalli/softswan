import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionSubtitle, SectionTitle } from './section-helpers';

export function CtaSection() {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-24 sm:py-32 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionTitle>Ready to Build Smarter?</SectionTitle>
          <SectionSubtitle>
            Join thousands of entrepreneurs mastering strategy and communication
            with SoftSwan.
          </SectionSubtitle>
          <div className="mt-10">
            <Button asChild size="lg" className="h-12 px-8 text-lg">
              <Link href="/auth?mode=signup">Join SoftSwan Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
