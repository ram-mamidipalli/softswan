
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
import { CheckCircle, Star, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { lessons } from '@/lib/lessons';
import { chapters } from '@/lib/chapters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function VideoLessonCard({ lesson }: { lesson: (typeof lessons)[0] }) {
  const [isCompleted, setIsCompleted] = React.useState(false);

  React.useEffect(() => {
    const storedCompleted = localStorage.getItem('completedLessons');
    if (storedCompleted) {
      setIsCompleted(JSON.parse(storedCompleted).includes(lesson.title));
    }
  }, [lesson.title]);

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
  )
}

function ChapterCard({ chapter }: { chapter: (typeof chapters)[0] }) {
  return (
    <Link
      href={`/dashboard/lessons/chapters/${chapter.id}`}
      key={chapter.id}
      className="group"
    >
      <Card className="overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1 h-full flex flex-col">
        <CardHeader className="p-0 relative">
          <div className="relative aspect-video">
            <Image
              src={chapter.imageUrl}
              alt={chapter.title}
              fill
              className={cn('object-cover')}
              data-ai-hint={chapter.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg">{chapter.title}</CardTitle>
          <CardDescription className="mt-2 text-sm">
            {chapter.summary}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}


export default function LessonsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Startup Lessons</h1>
        <p className="text-muted-foreground">
          Essential content on how to build a successful startup.
        </p>
      </div>
      
       <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="videos">Video Lessons</TabsTrigger>
          <TabsTrigger value="chapters">Book Chapters</TabsTrigger>
        </TabsList>
        <TabsContent value="videos" className="mt-6">
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {lessons.map((lesson) => (
                <VideoLessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
        </TabsContent>
        <TabsContent value="chapters" className="mt-6">
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {chapters.map((chapter) => (
                <ChapterCard key={chapter.id} chapter={chapter} />
              ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
