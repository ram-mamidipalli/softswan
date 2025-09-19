
'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import YouTube, { type YouTubeProps } from 'react-youtube';
import { tutorials, type Tutorial } from '@/lib/tutorials';
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

export default function TutorialPage() {
  const [tutorial, setTutorial] = React.useState<Tutorial | null>(null);
  const params = useParams();
  const router = useRouter();
  const tutorialId = parseInt(params.id as string, 10);
  const { toast } = useToast();

  React.useEffect(() => {
    if (isNaN(tutorialId)) {
      router.push('/dashboard/tutorials');
      return;
    }
    const currentTutorial = tutorials.find((t) => t.id === tutorialId);
    if (currentTutorial) {
      setTutorial(currentTutorial);
    } else {
      router.push('/dashboard/tutorials');
    }
  }, [tutorialId, router]);
  
  const handleVideoEnd = () => {
    if (!tutorial) return;

    const completedTutorials = JSON.parse(localStorage.getItem('completedTutorials') || '[]');
    if (!completedTutorials.includes(tutorial.title)) {
      // Award XP
      const currentXP = parseInt(localStorage.getItem('swanXP') || '0', 10);
      const newXP = currentXP + 30;
      localStorage.setItem('swanXP', newXP.toString());
      window.dispatchEvent(new StorageEvent('storage', { key: 'swanXP', newValue: newXP.toString() }));

      // Update completed tutorials
      const newCompleted = [...completedTutorials, tutorial.title];
      localStorage.setItem('completedTutorials', JSON.stringify(newCompleted));
      window.dispatchEvent(new StorageEvent('storage', { key: 'completedTutorials', newValue: JSON.stringify(newCompleted) }));
      
      toast({
        title: 'Tutorial Completed!',
        description: 'You earned 30 XP! 🚀',
      });
    }
  };

  if (!tutorial) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const videoId = tutorial.videoUrl.split('embed/')[1];

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
        onClick={() => router.push('/dashboard/tutorials')}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Tutorials
      </Button>
      <Card>
        <CardHeader>
          <Badge variant="secondary" className="w-fit mb-2">{tutorial.category}</Badge>
          <CardTitle className="text-2xl">{tutorial.title}</CardTitle>
          <CardDescription>by {tutorial.author}</CardDescription>
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
          <p className="text-muted-foreground">{tutorial.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
