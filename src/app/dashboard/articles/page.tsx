
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
import { cn } from '@/lib/utils';
import { articles } from '@/lib/articles';
import { TrendingUp } from 'lucide-react';

export default function ArticlesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Articles for Founders</h1>
        <p className="text-muted-foreground">
          In-depth reading on startup strategy, mindset, and growth.
        </p>
      </div>

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
    </div>
  );
}
