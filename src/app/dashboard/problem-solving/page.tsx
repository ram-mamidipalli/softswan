
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
import { type StartupChallenge, startupChallenges } from '@/lib/startup-challenges';
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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const PUZZLES_PER_PAGE = 9;

type Challenge = Puzzle | StartupChallenge;

export default function ProblemSolvingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const view = searchParams.get('view') || 'classic';
  const currentPage = Number(searchParams.get('page')) || 1;

  const [solvedPuzzles, setSolvedPuzzles] = React.useState<number[]>([]);
  const [solvedStartupChallenges, setSolvedStartupChallenges] = React.useState<number[]>([]);
  const [pageLoading, setPageLoading] = React.useState(true);

  const challenges: Challenge[] = view === 'startup' ? startupChallenges : puzzles;
  const solvedChallenges = view === 'startup' ? solvedStartupChallenges : solvedPuzzles;
  const totalPages = Math.ceil(challenges.length / PUZZLES_PER_PAGE);

  const currentChallenges = challenges.slice(
    (currentPage - 1) * PUZZLES_PER_PAGE,
    currentPage * PUZZLES_PER_PAGE
  );
  
  const handleViewChange = (isStartup: boolean) => {
    const newView = isStartup ? 'startup' : 'classic';
    router.push(`/dashboard/problem-solving?view=${newView}&page=1`);
  };

  React.useEffect(() => {
    const storedSolvedPuzzles = localStorage.getItem('solvedPuzzles');
    if (storedSolvedPuzzles) {
      setSolvedPuzzles(JSON.parse(storedSolvedPuzzles));
    }
    const storedSolvedStartupChallenges = localStorage.getItem('solvedStartupChallenges');
    if (storedSolvedStartupChallenges) {
      setSolvedStartupChallenges(JSON.parse(storedSolvedStartupChallenges));
    }
    setPageLoading(false);
  }, [view]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    router.push(`/dashboard/problem-solving?view=${view}&page=${page}`);
  };

  const resetPuzzles = () => {
    const solvedKey = view === 'startup' ? 'solvedStartupChallenges' : 'solvedPuzzles';
    localStorage.setItem(solvedKey, JSON.stringify([]));
    if (view === 'startup') {
        setSolvedStartupChallenges([]);
    } else {
        setSolvedPuzzles([]);
    }
    // Note: We are not resetting the total XP count, just the solved status for this category
    toast({
      title: 'Progress Reset',
      description: `Your progress on ${view === 'startup' ? 'Startup' : 'Classic'} Challenges has been cleared.`,
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
            A set of {challenges.length} challenges to test your skills.
          </p>
        </div>
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
                <Label htmlFor="challenge-toggle">Classic</Label>
                <Switch 
                    id="challenge-toggle" 
                    checked={view === 'startup'}
                    onCheckedChange={handleViewChange}
                />
                <Label htmlFor="challenge-toggle">Startup</Label>
            </div>
            <Button onClick={resetPuzzles} variant="outline">
                Reset Progress
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentChallenges.map((challenge) => {
          const isSolved = solvedChallenges.includes(challenge.id);
          const isHard = challenge.category.includes('Hard') || challenge.category.includes('Deep') || challenge.category.includes('Advanced') || challenge.category.includes('Tough') || challenge.category.includes('Critical');
          return (
            <Link
              href={`/dashboard/problem-solving/${challenge.id}?type=${view}`}
              key={challenge.id}
              className={cn('group', { 'pointer-events-none': isSolved })}
            >
              <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1 relative flex flex-col">
                <CardHeader className="flex-grow p-4">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <CardTitle className="text-sm font-semibold leading-snug">
                      Challenge #{challenge.id}
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
                  <CardDescription className="text-xs">{challenge.category}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p
                    className={cn('text-xs text-muted-foreground line-clamp-3', {
                      'opacity-60': isSolved,
                    })}
                  >
                    {challenge.problem}
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
