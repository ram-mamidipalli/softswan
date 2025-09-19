'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SwanLogo } from '@/components/icons/swan-logo';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const navigationLinks = [
  { name: 'Puzzles', href: '#puzzles' },
  { name: 'Tutorials', href: '#tutorials' },
  { name: 'Features', href: '#features' },
  { name: 'Testimonials', href: '#testimonials' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-transparent bg-background/80 backdrop-blur-sm transition-all',
        { 'border-border': isScrolled }
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="#home" className="flex items-center gap-2">
          <SwanLogo className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">SoftSwan</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navigationLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <Button asChild>
            <Link href="#">Join SoftSwan Free</Link>
          </Button>
        </div>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b pb-4">
                <Link
                  href="#home"
                  className="flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <SwanLogo className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold text-foreground">
                    SoftSwan
                  </span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="mt-8 flex flex-1 flex-col items-start gap-4">
                {navigationLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <Button asChild size="lg" className="mt-8 w-full">
                <Link href="#">Join SoftSwan Free</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
