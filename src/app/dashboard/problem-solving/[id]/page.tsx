
'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { getFeedback } from '@/app/actions';
import { type Puzzle, puzzles } from '@/lib/puzzles';
import { Loader2, ArrowLeft, Lightbulb, CheckCircle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function PuzzlePage() {
  const [puzzle, setPuzzle] = React.useState<Puzzle | null>(null);
  const [userAnswer, setUserAnswer] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSolved, setIsSolved] = React.useState(false);
  const [showHint, setShowHint] = React.useState(false);
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  const puzzleId = parseInt(params.id as string, 10);

  React.useEffect(() => {
    if (isNaN(puzzleId) || puzzleId < 1 || puzzleId > puzzles.length) {
      router.push('/dashboard/problem-solving');
      return;
    }
    const currentPuzzle = puzzles.find(p => p.id === puzzleId);
    if (currentPuzzle) {
        setPuzzle(currentPuzzle);
        const solvedPuzzles = JSON.parse(sessionStorage.getItem('solvedPuzzles') || '[]');
        if (solvedPuzzles.includes(puzzleId)) {
          setIsSolved(true);
        }
    } else {
        router.push('/dashboard/problem-solving');
    }
  }, [puzzleId, router]);

  const handleNextChallenge = () => {
    const currentIndex = puzzles.findIndex(p => p.id === puzzleId);
    if (currentIndex < puzzles.length - 1) {
        const nextPuzzleId = puzzles[currentIndex + 1].id;
        router.push(`/dashboard/problem-solving/${nextPuzzleId}`);
    } else {
        toast({ title: "Congratulations!", description: "You've completed all challenges."});
        router.push('/dashboard/problem-solving');
    }
  }

  const checkAnswer = async () => {
    if (!puzzle) return;
    if (!userAnswer) {
      toast({
        variant: 'destructive',
        title: 'Please enter an answer.',
      });
      return;
    }

    setIsLoading(true);

    const result = await getFeedback({
      problem: puzzle.problem,
      expertAnswer: puzzle.expert_answer,
      userAnswer: userAnswer,
    });

    setIsLoading(false);

    if (!result.success || !result.feedback) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
      return;
    }

    const { isCorrect, feedback } = result.feedback;
    
    toast({
      title: isCorrect ? 'Correct! +10 XP 🎉' : 'Not quite!',
      description: feedback,
      variant: isCorrect ? 'default' : 'destructive',
    });

    if (isCorrect) {
      setIsSolved(true);
      const solvedPuzzles = JSON.parse(sessionStorage.getItem('solvedPuzzles') || '[]');
      if (!solvedPuzzles.includes(puzzleId)) {
        const newSolvedPuzzles = [...solvedPuzzles, puzzleId];
        sessionStorage.setItem('solvedPuzzles', JSON.stringify(newSolvedPuzzles));
        
        // Update solved count
        const currentTotal = parseInt(localStorage.getItem('puzzlesSolvedCount') || '0', 10);
        const newTotal = currentTotal + 1;
        localStorage.setItem('puzzlesSolvedCount', newTotal.toString());
        
        // Update XP
        const currentXP = parseInt(localStorage.getItem('swanXP') || '0', 10);
        const newXP = currentXP + 10;
        localStorage.setItem('swanXP', newXP.toString());

        // Dispatch storage event to notify other tabs/components
        window.dispatchEvent(new StorageEvent('storage', { key: 'puzzlesSolvedCount', newValue: newTotal.toString() }));
        window.dispatchEvent(new StorageEvent('storage', { key: 'swanXP', newValue: newXP.toString() }));
      }
    }
  };

  if (!puzzle) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={() => router.push('/dashboard/problem-solving')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Challenges
        </Button>
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Challenge #{puzzle.id}</CardTitle>
                    {isSolved && <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="mr-1 h-3 w-3"/>Completed</Badge>}
                </div>
                <CardDescription className="text-base pt-4">{puzzle.problem}</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex w-full gap-2">
                  <Input
                    placeholder="Your answer..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    disabled={isSolved || isLoading}
                    className="text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && !isSolved && !isLoading && checkAnswer()}
                  />
                  <Button
                    onClick={checkAnswer}
                    disabled={isSolved || isLoading}
                    size="sm"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
                {isSolved ? (
                    <Button onClick={handleNextChallenge} className="w-full">
                        Next Challenge <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setShowHint(!showHint)}
                    >
                        <Lightbulb className="mr-2 h-4 w-4" />
                        {showHint ? "Hide" : "Show"} Expert Answer
                    </Button>
                )}

                 {showHint && !isSolved && (
                  <div className="p-4 bg-accent rounded-md w-full">
                    <p className="text-sm text-accent-foreground">
                        <span className="font-semibold">Expert's Answer: </span>
                        {puzzle.expert_answer}
                    </p>
                  </div>
                )}
                 {isSolved && (
                     <div className="p-4 bg-accent rounded-md w-full">
                        <p className="text-sm text-accent-foreground">
                            <span className="font-semibold">Expert's Answer: </span>
                            {puzzle.expert_answer}
                        </p>
                    </div>
                 )}
            </CardFooter>
        </Card>
    </div>
  );
}
