
'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { lessons, type Lesson } from '@/lib/lessons';
import { Loader2, ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { VideoPlayer } from '@/components/dashboard/video-player';

export default function LessonPage() {
  const [lesson, setLesson] = React.useState<Lesson | null>(null);
  const params = useParams();
  const router = useRouter();
  const lessonId = parseInt(params.id as string, 10);
  const { toast } = useToast();

  React.useEffect(() => {
    if (isNaN(lessonId)) {
      router.push('/dashboard/lessons');
      return;
    }
    const currentLesson = lessons.find((t) => t.id === lessonId);
    if (currentLesson) {
      setLesson(currentLesson);
    } else {
      router.push('/dashboard/lessons');
    }
  }, [lessonId, router]);
  
  const handleVideoEnd = () => {
    if (!lesson) return;

    const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    if (!completedLessons.includes(lesson.title)) {
      // Award XP
      const currentXP = parseInt(localStorage.getItem('swanXP') || '0', 10);
      const newXP = currentXP + 30; // Award 30 XP for lessons
      localStorage.setItem('swanXP', newXP.toString());
      window.dispatchEvent(new StorageEvent('storage', { key: 'swanXP', newValue: newXP.toString() }));

      // Update completed lessons
      const newCompleted = [...completedLessons, lesson.title];
      localStorage.setItem('completedLessons', JSON.stringify(newCompleted));
      window.dispatchEvent(new StorageEvent('storage', { key: 'completedLessons', newValue: JSON.stringify(newCompleted) }));
      
      toast({
        title: 'Lesson Completed!',
        description: 'You earned 30 XP! 🚀',
      });
    }
  };

  if (!lesson) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => router.push('/dashboard/lessons')}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Lessons
      </Button>
      <Card>
        <CardHeader>
          <Badge variant="secondary" className="w-fit mb-2">{lesson.category}</Badge>
          <CardTitle className="text-2xl">{lesson.title}</CardTitle>
          <CardDescription>by {lesson.author}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video mb-6">
            <VideoPlayer
              videoUrl={lesson.videoUrl}
              title={lesson.title}
              onVideoEnd={handleVideoEnd}
            />
          </div>
          <p className="text-muted-foreground">{lesson.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
