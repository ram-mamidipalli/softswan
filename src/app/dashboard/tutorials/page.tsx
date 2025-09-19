
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

const tutorials = [
  {
    title: 'How to speak so that people want to listen',
    author: 'Julian Treasure',
    category: 'Public Speaking',
    imageId: 'tutorial1',
    imageHint: 'public speaking',
    imageUrl: 'https://picsum.photos/seed/tut1/600/400',
    videoUrl: 'https://www.youtube.com/watch?v=eIho2S0ZahI',
  },
  {
    title: 'The 3 Magic Ingredients of Amazing Talks',
    author: 'Phil Waknell',
    category: 'Storytelling',
    imageId: 'tutorial2',
    imageHint: 'presentation skills',
    imageUrl: 'https://picsum.photos/seed/tut2/600/400',
    videoUrl: 'https://www.youtube.com/watch?v=S2dJu8p4_pA',
  },
  {
    title: 'How to Nail Your Job Interview',
    author: 'Google',
    category: 'Interview Prep',
    imageId: 'tutorial3',
    imageHint: 'job interview',
    imageUrl: 'https://picsum.photos/seed/tut3/600/400',
    videoUrl: 'https://www.youtube.com/watch?v=a-A_io-y34I',
  },
  {
    title: 'Body Language, the Hidden Language',
    author: 'BBC REEL',
    category: 'Body Language',
    imageId: 'tutorial4',
    imageHint: 'body language',
    imageUrl: 'https://picsum.photos/seed/tut4/600/400',
    videoUrl: 'https://www.youtube.com/watch?v=cWIi8f_22j4',
  },
  {
    title: 'Think Fast, Talk Smart: Communication Techniques',
    author: 'Matt Abrahams',
    category: 'Public Speaking',
    imageId: 'tutorial5',
    imageHint: 'communication',
    imageUrl: 'https://picsum.photos/seed/tut5/600/400',
    videoUrl: 'https://www.youtube.com/watch?v=HAnw168huqA',
  },
  {
    title: 'How to Win a Group Discussion',
    author: 'Anubhav Singh',
    category: 'Group Discussion',
    imageId: 'tutorial6',
    imageHint: 'team meeting',
    imageUrl: 'https://picsum.photos/seed/tut6/600/400',
    videoUrl: 'https://www.youtube.com/watch?v=84wVbU3bBwE',
  },
];

export default function TutorialsPage() {
  const [completedTutorials, setCompletedTutorials] = React.useState<string[]>([]);

  React.useEffect(() => {
    const storedCompleted = localStorage.getItem('completedTutorials');
    if (storedCompleted) {
      setCompletedTutorials(JSON.parse(storedCompleted));
    }
  }, []);

  const handleTutorialClick = (tutorialTitle: string) => {
    if (completedTutorials.includes(tutorialTitle)) {
      return;
    }

    // Award XP
    const currentXP = parseInt(localStorage.getItem('swanXP') || '0', 10);
    const newXP = currentXP + 30;
    localStorage.setItem('swanXP', newXP.toString());
    window.dispatchEvent(new StorageEvent('storage', { key: 'swanXP', newValue: newXP.toString() }));

    // Update completed tutorials
    const newCompleted = [...completedTutorials, tutorialTitle];
    setCompletedTutorials(newCompleted);
    localStorage.setItem('completedTutorials', JSON.stringify(newCompleted));
  };


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
            href={tutorial.videoUrl}
            key={tutorial.title}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            onClick={() => handleTutorialClick(tutorial.title)}
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
