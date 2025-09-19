import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        'font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl',
        className
      )}
    >
      {children}
    </h2>
  );
}

export function SectionSubtitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'mt-4 max-w-3xl text-lg leading-8 text-muted-foreground',
        className
      )}
    >
      {children}
    </p>
  );
}
