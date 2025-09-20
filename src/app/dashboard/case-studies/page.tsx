import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { caseStudies } from '@/lib/case-studies';

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Business Case Studies
        </h1>
        <p className="text-muted-foreground">
          Learn from the strategies of the world's most successful companies.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study) => (
          <Link
            href={`/dashboard/case-studies/${study.id}`}
            key={study.id}
            className="group"
          >
            <Card className="overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1 h-full">
              <CardHeader className="p-0 relative">
                <div className="relative aspect-video">
                  <Image
                    src={study.imageUrl}
                    alt={study.title}
                    fill
                    className={cn('object-cover')}
                    data-ai-hint={study.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <Badge variant="secondary">{study.companyName}</Badge>
                <CardTitle className="mt-2 text-lg">{study.title}</CardTitle>
                <CardDescription className="mt-1 text-sm">
                  Click to learn more
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
