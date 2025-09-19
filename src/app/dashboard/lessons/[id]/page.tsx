
'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import YouTube, { type YouTubeProps } from 'react-youtube';
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
      const newXP = currentXP + 50; // Lessons are worth more XP
      localStorage.setItem('swanXP', newXP.toString());
      window.dispatchEvent(new StorageEvent('storage', { key: 'swanXP', newValue: newXP.toString() }));

      // Update completed lessons
      const newCompleted = [...completedLessons, lesson.title];
      localStorage.setItem('completedLessons', JSON.stringify(newCompleted));
      window.dispatchEvent(new StorageEvent('storage', { key: 'completedLessons', newValue: JSON.stringify(newCompleted) }));
      
      toast({
        title: 'Lesson Completed!',
        description: 'You earned 50 XP! 🚀',
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

  const videoId = lesson.videoUrl.split('embed/')[1];

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

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
            <YouTube 
                videoId={videoId}
                opts={opts}
                className="w-full h-full rounded-lg overflow-hidden"
                iframeClassName="w-full h-full"
                onEnd={handleVideoEnd}
            />
          </div>
          <p className="text-muted-foreground">{lesson.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
