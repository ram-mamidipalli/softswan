
import Link from 'next/link';
import { Linkedin, Instagram, Youtube } from 'lucide-react';
import { SwanLogo } from '@/components/icons/swan-logo';

const footerLinks = [
  { name: 'About', href: '#' },
  { name: 'Contact', href: '#' },
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Use', href: '#' },
];

const socialLinks = [
  {
    name: 'LinkedIn',
    href: '#',
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    name: 'YouTube',
    href: '#',
    icon: <Youtube className="h-5 w-5" />,
  },
];

export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-12 lg:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Link href="#home" className="flex items-center gap-2 text-2xl font-bold text-foreground">
              <SwanLogo />
            </Link>
            <p className="text-muted-foreground">
              Sharpen Your Strategy. Amplify Your Impact.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-8 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SoftSwan. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label={link.name}
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
