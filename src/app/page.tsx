import { Header } from '@/components/landing/header';
import { HeroSection } from '@/components/landing/hero-section';
import { ProblemSolvingSection } from '@/components/landing/problem-solving-section';
import { CommunicationSection } from '@/components/landing/communication-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { WhySoftSwanSection } from '@/components/landing/why-softswan-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { CtaSection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProblemSolvingSection />
        <CommunicationSection />
        <HowItWorksSection />
        <WhySoftSwanSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
