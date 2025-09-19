
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
import { CheckCircle, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { lessons } from '@/lib/lessons';

export default function LessonsPage() {
  const [completedLessons, setCompletedLessons] = React.useState<string[]>([]);

  React.useEffect(() => {
    const storedCompleted = localStorage.getItem('completedLessons');
    if (storedCompleted) {
      setCompletedLessons(JSON.parse(storedCompleted));
    }
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Startup Lessons</h1>
        <p className="text-muted-foreground">
          Essential lessons and resources on how to build a successful startup from the ground up.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.title);
          return (
          <Link
            href={`/dashboard/lessons/${lesson.id}`}
            key={lesson.id}
            className="group"
          >
            <Card className="overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1 h-full">
              <CardHeader className="p-0 relative">
                <div className="relative aspect-video">
                  <Image
                    src={lesson.imageUrl}
                    alt={lesson.title}
                    fill
                    className={cn('object-cover', { 'opacity-50': isCompleted })}
                    data-ai-hint={lesson.imageHint}
                  />
                   {isCompleted && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                       <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 text-sm">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Completed
                      </Badge>
                    </div>
                  )}
                  {lesson.recommended && !isCompleted && (
                    <div className="absolute top-2 right-2">
                       <Badge variant="default" className="bg-primary/90 text-primary-foreground border-primary text-sm">
                        <Star className="mr-1 h-3 w-3" />
                        Recommended
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <Badge variant="secondary">{lesson.category}</Badge>
                <CardTitle className="mt-2 text-lg">{lesson.title}</CardTitle>
                <CardDescription className="mt-1 text-sm">
                  by {lesson.author}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        )})}
      </div>
    </div>
  );
}
