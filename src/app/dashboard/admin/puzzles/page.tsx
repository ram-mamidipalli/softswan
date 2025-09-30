
'use client';

import * as React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { puzzles, type Puzzle } from '@/lib/puzzles';
import { startupChallenges, type StartupChallenge } from '@/lib/startup-challenges';
import { AddPuzzleForm } from '@/components/dashboard/admin/add-puzzle-form';
import { AddStartupChallengeForm } from '@/components/dashboard/admin/add-startup-challenge-form';
import { DeleteConfirmationDialog } from '@/components/dashboard/admin/delete-confirmation-dialog';
import { useToast } from '@/hooks/use-toast';

type Challenge = Puzzle | StartupChallenge;

export default function AdminPuzzlesPage() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [itemToDelete, setItemToDelete] = React.useState<{item: Challenge, type: string} | null>(null);

  React.useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin, loading, router]);

  const handleDeleteClick = (item: Challenge, type: 'puzzle' | 'startup-challenge') => {
    setItemToDelete({item, type});
  };
  
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;

    // This is a client-side simulation. A real implementation would require a backend call.
    toast({
      title: `${itemToDelete.type.charAt(0).toUpperCase() + itemToDelete.type.slice(1)} Deleted (Simulated)`,
      description: `The item "${itemToDelete.item.problem}" would be removed. Refresh to see original state.`,
    });

    setItemToDelete(null);
  };

  if (loading || !isAdmin) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Puzzles</h1>
          <p className="text-muted-foreground">
            Add, edit, and delete problem-solving challenges.
          </p>
        </div>
        <Button variant="ghost" onClick={() => router.push('/dashboard/admin')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin
        </Button>
      </div>

      <Tabs defaultValue="classic" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-lg">
          <TabsTrigger value="classic">Classic Puzzles</TabsTrigger>
          <TabsTrigger value="startup">Startup Challenges</TabsTrigger>
        </TabsList>
        <TabsContent value="classic" className="mt-6">
          <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Classic Puzzles</CardTitle>
                        <CardDescription>
                            Riddles, logic puzzles, and brain teasers.
                        </CardDescription>
                    </div>
                    <AddPuzzleForm>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Puzzle
                        </Button>
                    </AddPuzzleForm>
                </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                  {puzzles.map(puzzle => (
                    <div key={puzzle.id} className="flex flex-col gap-2 p-4 rounded-md border">
                        <div className="flex justify-between items-start">
                             <p className="font-semibold">{puzzle.problem}</p>
                             <div className="flex gap-2 flex-shrink-0">
                                <AddPuzzleForm initialData={puzzle}>
                                    <Button variant="outline" size="sm">Edit</Button>
                                </AddPuzzleForm>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(puzzle, 'puzzle')}>Delete</Button>
                             </div>
                        </div>
                        <p className="text-sm text-muted-foreground"><span className="font-semibold">Answer: </span>{puzzle.expert_answer}</p>
                        <p className="text-xs text-muted-foreground pt-2">Category: {puzzle.category}</p>
                    </div>
                  ))}
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="startup" className="mt-6">
          <Card>
            <CardHeader>
                 <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Startup Challenges</CardTitle>
                        <CardDescription>
                            Real-world business scenarios and case studies.
                        </CardDescription>
                    </div>
                     <AddStartupChallengeForm>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Challenge
                        </Button>
                    </AddStartupChallengeForm>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                  {startupChallenges.map(challenge => (
                    <div key={challenge.id} className="flex flex-col gap-2 p-4 rounded-md border">
                        <div className="flex justify-between items-start">
                             <p className="font-semibold">{challenge.problem}</p>
                             <div className="flex gap-2 flex-shrink-0">
                                <AddStartupChallengeForm initialData={challenge}>
                                    <Button variant="outline" size="sm">Edit</Button>
                                </AddStartupChallengeForm>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(challenge, 'startup-challenge')}>Delete</Button>
                             </div>
                        </div>
                        <p className="text-sm text-muted-foreground"><span className="font-semibold">Answer: </span>{challenge.expert_answer}</p>
                        <p className="text-xs text-muted-foreground pt-2">Category: {challenge.category}</p>
                    </div>
                  ))}
                </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
        <DeleteConfirmationDialog
            isOpen={!!itemToDelete}
            onOpenChange={(isOpen) => !isOpen && setItemToDelete(null)}
            onConfirm={handleConfirmDelete}
            itemName={itemToDelete?.item.problem || ''}
        />
    </div>
  );
}

    