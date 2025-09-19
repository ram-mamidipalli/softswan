
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
import { puzzles, type Puzzle } from '@/lib/puzzles';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function ProblemSolvingPage() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState<Record<number, string>>(
    {}
  );
  const [solvedPuzzles, setSolvedPuzzles] = React.useState<number[]>([]);
  const { toast } = useToast();

  const currentPuzzle = puzzles[currentPuzzleIndex];

  const handleAnswerChange = (index: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  const checkAnswer = (index: number) => {
    const puzzle = puzzles[index];
    const userAnswer = userAnswers[index];
    if (!userAnswer) {
      toast({
        variant: 'destructive',
        title: 'Please enter an answer.',
      });
      return;
    }

    const isCorrect =
      userAnswer.trim().toLowerCase() ===
      puzzle.expert_answer.trim().toLowerCase();

    if (isCorrect) {
      if (!solvedPuzzles.includes(index)) {
        setSolvedPuzzles([...solvedPuzzles, index]);
        toast({
          title: 'Correct! 🎉',
          description: `+10 points! You've solved ${
            solvedPuzzles.length + 1
          } out of ${puzzles.length} puzzles.`,
        });
      } else {
        toast({
          title: 'Already Solved!',
          description: 'You have already solved this puzzle correctly.',
        });
      }
    } else {
      toast({
        title: 'Incorrect, try again!',
        description: `Hint: The answer is not "${userAnswer}".`,
        variant: 'destructive',
      });
    }
  };

  const goToNextPuzzle = () => {
    setCurrentPuzzleIndex((prev) => (prev + 1) % puzzles.length);
  };

  const goToPreviousPuzzle = () => {
    setCurrentPuzzleIndex(
      (prev) => (prev - 1 + puzzles.length) % puzzles.length
    );
  };
  
  const isCurrentPuzzleSolved = solvedPuzzles.includes(currentPuzzleIndex);
  const progressPercentage = (solvedPuzzles.length / puzzles.length) * 100;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Problem Solving Quiz</h1>
        <p className="text-muted-foreground">
          Test your skills with these 10 challenges.
        </p>
      </div>
        
      <Card>
        <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>You have solved {solvedPuzzles.length} out of {puzzles.length} puzzles.</CardDescription>
        </CardHeader>
        <CardContent>
            <Progress value={progressPercentage} className="w-full" />
        </CardContent>
      </Card>

      <div className="relative">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <Badge variant="secondary">{currentPuzzle.category}</Badge>
                    <CardTitle className="mt-2">Challenge #{currentPuzzle.id}</CardTitle>
                </div>
                {isCurrentPuzzleSolved && <div className="flex items-center gap-2 text-green-600"><Check /> Solved</div>}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground">
              {currentPuzzle.problem}
            </p>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <div className="w-full flex gap-2">
                <Input
                  placeholder="Your answer..."
                  value={userAnswers[currentPuzzleIndex] || ''}
                  onChange={(e) =>
                    handleAnswerChange(currentPuzzleIndex, e.target.value)
                  }
                  disabled={isCurrentPuzzleSolved}
                />
                <Button onClick={() => checkAnswer(currentPuzzleIndex)} disabled={isCurrentPuzzleSolved}>
                  Submit
                </Button>
            </div>
             {isCurrentPuzzleSolved && <p className="text-sm text-green-600">Correct Answer: {currentPuzzle.expert_answer}</p>}
          </CardFooter>
        </Card>
        
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousPuzzle}
          className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full h-12 w-12 hidden md:flex"
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={goToNextPuzzle}
          className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-full h-12 w-12 hidden md:flex"
        >
          <ChevronRight />
        </Button>
      </div>

       <div className="flex md:hidden justify-between w-full max-w-2xl mx-auto">
             <Button
                variant="outline"
                onClick={goToPreviousPuzzle}
            >
                <ChevronLeft className="mr-2" /> Previous
            </Button>
             <Button
                variant="outline"
                onClick={goToNextPuzzle}
            >
                Next <ChevronRight className="ml-2" />
            </Button>
        </div>
    </div>
  );
}
