
'use client';

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
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { tutorials } from '@/lib/tutorials';

export default function TutorialsPage() {
  const [completedTutorials, setCompletedTutorials] = React.useState<string[]>([]);

  React.useEffect(() => {
    const storedCompleted = localStorage.getItem('completedTutorials');
    if (storedCompleted) {
      setCompletedTutorials(JSON.parse(storedCompleted));
    }
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tutorials</h1>
        <p className="text-muted-foreground">
          Master your communication skills with these curated videos. Earn 30 XP for each tutorial you watch.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tutorials.map((tutorial) => {
          const isCompleted = completedTutorials.includes(tutorial.title);
          return (
          <Link
            href={`/dashboard/tutorials/${tutorial.id}`}
            key={tutorial.id}
            className="group"
          >
            <Card className="overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1 h-full">
              <CardHeader className="p-0 relative">
                <div className="relative aspect-video">
                  <Image
                    src={tutorial.imageUrl}
                    alt={tutorial.title}
                    fill
                    className={cn('object-cover', { 'opacity-50': isCompleted })}
                    data-ai-hint={tutorial.imageHint}
                  />
                   {isCompleted && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                       <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 text-sm">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Completed
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <Badge variant="secondary">{tutorial.category}</Badge>
                <CardTitle className="mt-2 text-lg">{tutorial.title}</CardTitle>
                <CardDescription className="mt-1 text-sm">
                  by {tutorial.author}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        )})}
      </div>
    </div>
  );
}
