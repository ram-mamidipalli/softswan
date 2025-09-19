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
import { getPuzzles } from '@/app/actions';
import { BrainCircuit, Loader2 } from 'lucide-react';
import type { Puzzle } from '@/ai/flows/generate-puzzles';

export default function ProblemSolvingPage() {
  const [puzzles, setPuzzles] = React.useState<Puzzle[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userAnswers, setUserAnswers] = React.useState<Record<number, string>>(
    {}
  );
  const { toast } = useToast();

  const handleGeneratePuzzles = async () => {
    setIsLoading(true);
    setPuzzles([]);
    const result = await getPuzzles();
    setIsLoading(false);
    if (result.success && result.puzzles) {
      setPuzzles(result.puzzles);
      setUserAnswers({});
    } else {
      toast({
        variant: 'destructive',
        title: 'Error generating puzzles',
        description:
          result.error || 'An unexpected error occurred. Please try again.',
      });
    }
  };

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

    // Simple case-insensitive and whitespace-trimmed comparison
    const isCorrect =
      userAnswer.trim().toLowerCase() === puzzle.answer.trim().toLowerCase();

    toast({
      title: isCorrect ? 'Correct! 🎉' : 'Incorrect, try again!',
      description: isCorrect
        ? `+10 points! Keep it up.`
        : `Hint: The answer is not "${userAnswer}".`,
      variant: isCorrect ? 'default' : 'destructive',
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Problem Solving</h1>
        <p className="text-muted-foreground">
          Sharpen your mind with AI-generated riddles and challenges.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Puzzle Hub</CardTitle>
          <CardDescription>
            Click the button below to generate a new set of 10 puzzles. Test
            your wit and see how many you can solve!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGeneratePuzzles} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <BrainCircuit className="mr-2 h-4 w-4" />
            )}
            Generate New Puzzles
          </Button>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}

      {puzzles.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {puzzles.map((puzzle, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Challenge #{index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{puzzle.question}</p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Input
                  placeholder="Your answer..."
                  value={userAnswers[index] || ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
                <Button onClick={() => checkAnswer(index)}>Submit</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
