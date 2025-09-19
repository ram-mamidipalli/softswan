
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { type Puzzle } from '@/ai/flows/generate-puzzles';
import { Loader2 } from 'lucide-react';
import { getPuzzles } from '@/app/actions';
import Link from 'next/link';

export default function ProblemSolvingPage() {
  const [puzzles, setPuzzles] = React.useState<Puzzle[]>([]);
  const [pageLoading, setPageLoading] = React.useState(true);
  const { toast } = useToast();

  const fetchPuzzles = React.useCallback(async () => {
    setPageLoading(true);
    const result = await getPuzzles();
    if (result.success && result.puzzles) {
      setPuzzles(result.puzzles);
      // Store puzzles in session storage to persist across pages
      sessionStorage.setItem('puzzles', JSON.stringify(result.puzzles));
    } else {
      toast({
        variant: 'destructive',
        title: 'Failed to load puzzles',
        description: result.error,
      });
    }
    setPageLoading(false);
  }, [toast]);

  React.useEffect(() => {
    // Try to load puzzles from session storage first
    const storedPuzzles = sessionStorage.getItem('puzzles');
    if (storedPuzzles) {
      setPuzzles(JSON.parse(storedPuzzles));
      setPageLoading(false);
    } else {
      fetchPuzzles();
    }
  }, [fetchPuzzles]);

  if (pageLoading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="text-muted-foreground">
          Generating new challenges for you...
        </span>
      </div>
    );
  }

  if (!puzzles.length) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">Could not load any puzzles.</p>
        <Button onClick={fetchPuzzles} className="mt-4">
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Problem Solving Challenges
          </h1>
          <p className="text-sm text-muted-foreground">
            A fresh set of {puzzles.length} AI-generated puzzles to test your
            skills.
          </p>
        </div>
        <Button onClick={fetchPuzzles} disabled={pageLoading}>
          {pageLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Regenerate
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {puzzles.map((puzzle, index) => {
          return (
            <Link
              href={`/dashboard/problem-solving/${index}`}
              key={index}
              className="group"
            >
              <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">
                    Challenge #{index + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {puzzle.question}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
