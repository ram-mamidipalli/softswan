import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

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
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tutorials</h1>
        <p className="text-muted-foreground">
          Master your communication skills with these curated videos.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tutorials.map((tutorial) => (
          <Link
            href={tutorial.videoUrl}
            key={tutorial.title}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Card className="overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1">
              <CardHeader className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={tutorial.imageUrl}
                    alt={tutorial.title}
                    fill
                    className="object-cover"
                    data-ai-hint={tutorial.imageHint}
                  />
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
        ))}
      </div>
    </div>
  );
}
