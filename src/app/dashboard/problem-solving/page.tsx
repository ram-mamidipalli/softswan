
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { type Puzzle } from '@/ai/flows/generate-puzzles';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { getFeedback, getPuzzles } from '@/app/actions';

type PuzzleState = {
  userAnswer: string;
  isCorrect: boolean | null;
  isLoading: boolean;
};

export default function ProblemSolvingPage() {
  const [puzzles, setPuzzles] = React.useState<Puzzle[]>([]);
  const [pageLoading, setPageLoading] = React.useState(true);
  const [puzzleStates, setPuzzleStates] = React.useState<
    Record<number, PuzzleState>
  >({});
  const { toast } = useToast();

  const fetchPuzzles = React.useCallback(async () => {
    setPageLoading(true);
    const result = await getPuzzles();
    if (result.success && result.puzzles) {
      setPuzzles(result.puzzles);
      // Initialize states for new puzzles
      const newStates: Record<number, PuzzleState> = {};
      result.puzzles.forEach((_, index) => {
        newStates[index] = {
          userAnswer: '',
          isCorrect: null,
          isLoading: false,
        };
      });
      setPuzzleStates(newStates);
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
    fetchPuzzles();
  }, [fetchPuzzles]);

  const handleAnswerChange = (index: number, answer: string) => {
    setPuzzleStates((prev) => ({
      ...prev,
      [index]: { ...prev[index], userAnswer: answer },
    }));
  };

  const checkAnswer = async (index: number) => {
    const puzzle = puzzles[index];
    const state = puzzleStates[index];

    if (!state.userAnswer) {
      toast({
        variant: 'destructive',
        title: 'Please enter an answer.',
      });
      return;
    }

    setPuzzleStates((prev) => ({
      ...prev,
      [index]: { ...prev[index], isLoading: true },
    }));

    const result = await getFeedback({
      problem: puzzle.question,
      expertAnswer: puzzle.answer,
      userAnswer: state.userAnswer,
    });

    if (!result.success || !result.feedback) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
      setPuzzleStates((prev) => ({
        ...prev,
        [index]: { ...prev[index], isLoading: false },
      }));
      return;
    }

    const { isCorrect, feedback } = result.feedback;

    setPuzzleStates((prev) => ({
      ...prev,
      [index]: { ...prev[index], isLoading: false, isCorrect },
    }));

    toast({
      title: isCorrect ? 'Correct! 🎉' : 'Not quite!',
      description: feedback,
      variant: isCorrect ? 'default' : 'destructive',
    });
  };

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

      <div className="grid gap-6 md:grid-cols-2">
        {puzzles.map((puzzle, index) => {
          const state = puzzleStates[index] || {
            userAnswer: '',
            isCorrect: null,
            isLoading: false,
          };
          const isSolved = state.isCorrect === true;

          return (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-base font-semibold">
                    Challenge #{index + 1}
                  </CardTitle>
                  {state.isCorrect !== null && (
                    <div className="flex items-center gap-1 text-xs">
                      {isSolved ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                      <span
                        className={
                          isSolved ? 'text-green-500' : 'text-destructive'
                        }
                      >
                        {isSolved ? 'Solved' : 'Incorrect'}
                      </span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {puzzle.question}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2">
                <div className="flex w-full gap-2">
                  <Input
                    placeholder="Your answer..."
                    value={state.userAnswer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    disabled={isSolved || state.isLoading}
                    className="h-9 text-sm"
                  />
                  <Button
                    onClick={() => checkAnswer(index)}
                    disabled={isSolved || state.isLoading}
                    size="sm"
                  >
                    {state.isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </div>
                {isSolved && (
                  <p className="text-xs text-green-600">
                    Correct Answer: {puzzle.answer}
                  </p>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
