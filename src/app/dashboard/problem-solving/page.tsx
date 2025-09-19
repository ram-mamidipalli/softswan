
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
import { type Puzzle, puzzles } from '@/lib/puzzles';
import { Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams, useRouter } from 'next/navigation';

const PUZZLES_PER_PAGE = 9;

export default function ProblemSolvingPage() {
  const [solvedPuzzles, setSolvedPuzzles] = React.useState<number[]>([]);
  const [pageLoading, setPageLoading] = React.useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(puzzles.length / PUZZLES_PER_PAGE);

  const currentPuzzles = puzzles.slice(
    (currentPage - 1) * PUZZLES_PER_PAGE,
    currentPage * PUZZLES_PER_PAGE
  );

  React.useEffect(() => {
    const storedSolvedPuzzles = sessionStorage.getItem('solvedPuzzles');
    if (storedSolvedPuzzles) {
      setSolvedPuzzles(JSON.parse(storedSolvedPuzzles));
    }
    setPageLoading(false);
  }, []);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    router.push(`/dashboard/problem-solving?page=${page}`);
  };

  const { toast } = useToast();

  const resetPuzzles = () => {
    sessionStorage.setItem('solvedPuzzles', JSON.stringify([]));
    localStorage.setItem('puzzlesSolvedCount', '0');
    setSolvedPuzzles([]);
    window.dispatchEvent(new StorageEvent('storage', {
        key: 'puzzlesSolvedCount',
        newValue: '0',
    }));
    toast({
      title: 'Progress Reset',
      description: 'Your progress on the puzzles has been cleared.',
    });
  };

  if (pageLoading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="text-muted-foreground">Loading challenges...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Problem Solving Challenges
          </h1>
          <p className="text-sm text-muted-foreground">
            A set of {puzzles.length} challenges to test your skills.
          </p>
        </div>
        <Button onClick={resetPuzzles} variant="outline">
          Reset Progress
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPuzzles.map((puzzle) => {
          const isSolved = solvedPuzzles.includes(puzzle.id);
          const isHard = puzzle.category.includes('Hard') || puzzle.category.includes('Deep') || puzzle.category.includes('Advanced') || puzzle.category.includes('Tough') || puzzle.category.includes('Critical');
          return (
            <Link
              href={`/dashboard/problem-solving/${puzzle.id}`}
              key={puzzle.id}
              className={cn('group', { 'pointer-events-none': isSolved })}
            >
              <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1 relative flex flex-col">
                <CardHeader className="flex-grow p-4">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <CardTitle className="text-sm font-semibold leading-snug">
                      Challenge #{puzzle.id}
                    </CardTitle>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      {isSolved && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 border-green-200 text-xs"
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Completed
                        </Badge>
                      )}
                      {isHard && !isSolved && (
                        <Badge variant="destructive" className="text-xs">
                          Hard
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-xs">{puzzle.category}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p
                    className={cn('text-xs text-muted-foreground line-clamp-3', {
                      'opacity-60': isSolved,
                    })}
                  >
                    {puzzle.problem}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                className={cn({ 'pointer-events-none opacity-50': currentPage === 1 })}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) handlePageChange(currentPage + 1);
                }}
                className={cn({ 'pointer-events-none opacity-50': currentPage === totalPages })}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
