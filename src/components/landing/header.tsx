
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { signOut } from 'firebase/auth';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SwanLogo } from '@/components/icons/swan-logo';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAuth } from '@/hooks/use-auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

const navigationLinks = [
  { name: 'Puzzles', href: '/#puzzles' },
  { name: 'Tutorials', href: '/#tutorials' },
  { name: 'Features', href: '/#features' },
  { name: 'Testimonials', href: '/#testimonials' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

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
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      router.push('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
      });
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-transparent bg-background/80 backdrop-blur-sm transition-all',
        { 'border-border': isScrolled }
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
          <SwanLogo />
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
          {user && (
             <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
          )}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          {!loading &&
            (user ? (
              <Button onClick={handleSignOut}>Sign Out</Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/auth">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth?mode=signup">Sign Up Free</Link>
                </Button>
              </>
            ))}
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
                  href="/"
                  className="flex items-center gap-2 text-xl font-bold text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <SwanLogo />
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
                    onClick={() => setIsMobileMenuopen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {user && (
                  <Link
                    href="/dashboard"
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
              </nav>
              {!loading &&
                (user ? (
                  <Button onClick={handleSignOut} size="lg" className="mt-8 w-full">Sign Out</Button>
                ) : (
                  <div className="mt-8 grid w-full grid-cols-2 gap-4">
                    <Button asChild size="lg" variant="outline">
                      <Link href="/auth">Login</Link>
                    </Button>
                    <Button asChild size="lg">
                      <Link href="/auth?mode=signup">Sign Up</Link>
                    </Button>
                  </div>
                ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
