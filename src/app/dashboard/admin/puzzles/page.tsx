
'use client';

import * as React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AdminPuzzlesPage() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin, loading, router]);

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
              <CardTitle>Classic Puzzles</CardTitle>
              <CardDescription>
                Riddles, logic puzzles, and brain teasers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Puzzle management functionality will be built here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="startup" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Startup Challenges</CardTitle>
              <CardDescription>
                Real-world business scenarios and case studies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Startup challenge management functionality will be built here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
