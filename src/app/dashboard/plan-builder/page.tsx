
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateStartupPlan } from '@/app/actions';
import { Loader2, Wand2, PartyPopper } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function PlanBuilderPage() {
  const [idea, setIdea] = React.useState('');
  const [plan, setPlan] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [lastGenerationTime, setLastGenerationTime] = React.useState<number | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    const storedTime = localStorage.getItem('lastPlanGeneration');
    if (storedTime) {
      setLastGenerationTime(Number(storedTime));
    }
  }, []);

  const canGenerate = () => {
    if (!lastGenerationTime) {
      return true;
    }
    const twentyFourHours = 24 * 60 * 60 * 1000;
    return Date.now() - lastGenerationTime > twentyFourHours;
  };
  
  const handleGeneratePlan = async () => {
    if (!idea) {
      toast({
        variant: 'destructive',
        title: 'Idea is empty',
        description: 'Please describe your startup idea.',
      });
      return;
    }

    if (!canGenerate()) {
        toast({
            variant: 'destructive',
            title: 'Limit Reached',
            description: 'You can only generate one plan per day. Please try again later.',
        });
        return;
    }

    setIsLoading(true);
    setPlan(null);

    const result = await generateStartupPlan(idea);

    setIsLoading(false);

    if (result.success && result.plan) {
      setPlan(result.plan);
      const currentTime = Date.now();
      setLastGenerationTime(currentTime);
      localStorage.setItem('lastPlanGeneration', String(currentTime));
      toast({
        title: 'Plan Generated!',
        description: 'Your startup plan is ready.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: result.error,
      });
    }
  };

  const renderPlan = (text: string) => {
    const sections = text.split(/(\*\*.*?\*\*)/g).filter(Boolean);
    return sections.map((section, index) => {
        if (section.startsWith('**') && section.endsWith('**')) {
            return (
                <p key={index} className="font-bold text-lg mt-4">{section.replace(/\*\*/g, '')}</p>
            );
        }
        return (
             <p key={index} className="whitespace-pre-wrap">{section}</p>
        );
    });
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">AI Startup Plan Builder</h1>
        <p className="text-muted-foreground mt-2">
          Turn your idea into an actionable plan. Describe your startup concept, and let our AI create a roadmap for you.
        </p>
      </div>

       {!canGenerate() && (
         <Alert>
          <PartyPopper className="h-4 w-4" />
          <AlertTitle>You've Generated Your Plan!</AlertTitle>
          <AlertDescription>
            You can generate a new plan in 24 hours. Come back tomorrow to explore another idea!
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Your Startup Idea</CardTitle>
          <CardDescription>
            Provide a clear and concise description of your business idea. What problem are you solving, and for whom?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="e.g., 'A subscription box service for rare, indoor plants targeting urban millennials.'"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={4}
            disabled={!canGenerate()}
          />
          <Button onClick={handleGeneratePlan} disabled={isLoading || !canGenerate()} className="w-full">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Generate Plan
          </Button>
        </CardContent>
      </Card>

       {isLoading && (
        <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {plan && (
        <Card>
          <CardHeader>
            <CardTitle>Your Generated Startup Plan</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg dark:prose-invert max-w-full">
            {renderPlan(plan)}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
