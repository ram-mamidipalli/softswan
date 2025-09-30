
'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { chapters, type Chapter } from '@/lib/chapters';
import { Loader2, ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const ChapterContent: React.FC<{ content: string[] }> = ({ content }) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-full">
      {content.map((paragraph, pIndex) => {
        const parts = paragraph.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={pIndex}>
            {parts.map((part, partIndex) =>
              partIndex % 2 === 1 ? (
                <strong key={partIndex}>{part}</strong>
              ) : (
                part
              )
            )}
          </p>
        );
      })}
    </div>
  );
};

export default function ChapterPage() {
  const [chapter, setChapter] = React.useState<Chapter | null>(null);
  const params = useParams();
  const router = useRouter();
  const chapterId = parseInt(params.id as string, 10);

  React.useEffect(() => {
    if (isNaN(chapterId)) {
      router.push('/dashboard/lessons');
      return;
    }
    const currentChapter = chapters.find((c) => c.id === chapterId);
    if (currentChapter) {
      setChapter(currentChapter);
    } else {
      router.push('/dashboard/lessons');
    }
  }, [chapterId, router]);

  if (!chapter) {
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
          <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
             <Image
                src={chapter.imageUrl}
                alt={chapter.title}
                fill
                className={'object-cover'}
                data-ai-hint={chapter.imageHint}
              />
          </div>
          <CardTitle className="text-3xl leading-tight">{chapter.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChapterContent content={chapter.content} />
        </CardContent>
      </Card>
    </div>
  );
}
