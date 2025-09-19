
'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { articles, type Article } from '@/lib/articles';
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
import Image from 'next/image';

// This component will render the paragraphs and handle bold text.
const ArticleContent: React.FC<{ content: string[] }> = ({ content }) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-full">
      {content.map((paragraph, pIndex) => {
        // Split by the bold marker and reconstruct with <strong> tags
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


export default function ArticlePage() {
  const [article, setArticle] = React.useState<Article | null>(null);
  const params = useParams();
  const router = useRouter();
  const articleId = parseInt(params.id as string, 10);

  React.useEffect(() => {
    if (isNaN(articleId)) {
      router.push('/dashboard/articles');
      return;
    }
    const currentArticle = articles.find((a) => a.id === articleId);
    if (currentArticle) {
      setArticle(currentArticle);
    } else {
      router.push('/dashboard/articles');
    }
  }, [articleId, router]);

  if (!article) {
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
        onClick={() => router.push('/dashboard/articles')}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Articles
      </Button>
      <Card>
         <CardHeader>
          <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
             <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className={'object-cover'}
                data-ai-hint={article.imageHint}
              />
          </div>
          <Badge variant="secondary" className="w-fit mb-2">{article.category}</Badge>
          <CardTitle className="text-3xl leading-tight">{article.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ArticleContent content={article.content} />
        </CardContent>
      </Card>
    </div>
  );
}
