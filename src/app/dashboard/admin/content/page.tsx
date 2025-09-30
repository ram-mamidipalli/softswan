
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
import { tutorials, type Tutorial } from '@/lib/tutorials';
import Image from 'next/image';
import { AddTutorialForm } from '@/components/dashboard/admin/add-tutorial-form';

export default function AdminContentPage() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [allTutorials, setAllTutorials] = React.useState<Tutorial[]>(tutorials);

  React.useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin, loading, router]);

  const handleTutorialAdded = (newTutorial: Tutorial) => {
    // This is a optimistic update for the UI.
    // In a real app, you'd refetch or get the new list from the server.
    setAllTutorials(prev => [...prev, newTutorial]);
    setIsAddModalOpen(false);
  }

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
          <h1 className="text-3xl font-bold tracking-tight">Manage Content</h1>
          <p className="text-muted-foreground">
            Add, edit, and delete content across the application.
          </p>
        </div>
        <Button variant="ghost" onClick={() => router.push('/dashboard/admin')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin
        </Button>
      </div>

      <Tabs defaultValue="tutorials" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="lessons">Startup Lessons</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
        </TabsList>
        <TabsContent value="tutorials" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>All Tutorials</CardTitle>
                  <CardDescription>
                    Browse and manage all video tutorials.
                  </CardDescription>
                </div>
                <AddTutorialForm onTutorialAdded={handleTutorialAdded}>
                   <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Tutorial
                    </Button>
                </AddTutorialForm>
              </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                  {allTutorials.map(tutorial => (
                    <div key={tutorial.id} className="flex items-center gap-4 p-2 rounded-md border">
                        <div className="relative h-16 w-28 rounded-md overflow-hidden">
                             <Image 
                                src={tutorial.imageUrl}
                                alt={tutorial.title}
                                fill
                                className="object-cover"
                             />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold">{tutorial.title}</p>
                            <p className="text-sm text-muted-foreground">by {tutorial.author}</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                         <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  ))}
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="lessons" className="mt-6">
          <p className="text-muted-foreground">
            Startup lesson management functionality will be built here.
          </p>
        </TabsContent>
        <TabsContent value="articles" className="mt-6">
          <p className="text-muted-foreground">
            Article management functionality will be built here.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
