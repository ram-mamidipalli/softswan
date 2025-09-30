
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
import { CheckCircle, Star, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { lessons } from '@/lib/lessons';
import { articles } from '@/lib/articles';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
          Essential video lessons and articles on how to build a successful startup.
        </p>
      </div>
      
       <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="videos">Video Lessons</TabsTrigger>
          <TabsTrigger value="articles">Articles & Guides</TabsTrigger>
        </TabsList>
        <TabsContent value="videos" className="mt-6">
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
        </TabsContent>
        <TabsContent value="articles" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                href={`/dashboard/articles/${article.id}`}
                key={article.id}
                className="group"
              >
                <Card className="overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1 h-full flex flex-col">
                  <CardHeader className="p-0 relative">
                    <div className="relative aspect-video">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className={cn('object-cover')}
                        data-ai-hint={article.imageHint}
                      />
                       {article.trending && (
                        <div className="absolute top-2 right-2">
                           <Badge variant="default" className="bg-primary/90 text-primary-foreground border-primary text-sm">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            Trending
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                    <CardDescription className="mt-2 text-sm">
                      {article.summary}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
