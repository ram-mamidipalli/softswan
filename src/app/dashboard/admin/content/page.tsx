
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
import { lessons, type Lesson } from '@/lib/lessons';
import { articles, type Article } from '@/lib/articles';
import { caseStudies, type CaseStudy } from '@/lib/case-studies';
import { investors, type Investor } from '@/lib/investors';
import Image from 'next/image';
import { AddTutorialForm } from '@/components/dashboard/admin/add-tutorial-form';
import { AddLessonForm } from '@/components/dashboard/admin/add-lesson-form';
import { AddArticleForm } from '@/components/dashboard/admin/add-article-form';
import { AddCaseStudyForm } from '@/components/dashboard/admin/add-case-study-form';
import { AddInvestorForm } from '@/components/dashboard/admin/add-investor-form';
import { DeleteConfirmationDialog } from '@/components/dashboard/admin/delete-confirmation-dialog';
import { useToast } from '@/hooks/use-toast';

type ContentItem = Tutorial | Lesson | Article | CaseStudy | Investor;

export default function AdminContentPage() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [itemToDelete, setItemToDelete] = React.useState<{item: ContentItem, type: string} | null>(null);

  React.useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin, loading, router]);

  const handleDeleteClick = (item: ContentItem, type: 'tutorial' | 'lesson' | 'article' | 'casestudy' | 'investor') => {
    setItemToDelete({item, type});
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;

    // This is a client-side simulation. A real implementation would require a backend call.
    // For now, we just close the dialog and show a toast.
    
    toast({
      title: `${itemToDelete.type.charAt(0).toUpperCase() + itemToDelete.type.slice(1)} Deleted (Simulated)`,
      description: `The item "${(itemToDelete.item as any).title || (itemToDelete.item as any).name}" would be removed. Refresh to see original state.`,
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
        <TabsList className="grid w-full grid-cols-5 max-w-2xl">
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="lessons">Startup Lessons</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
          <TabsTrigger value="investors">Investors</TabsTrigger>
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
                <AddTutorialForm>
                   <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Tutorial
                    </Button>
                </AddTutorialForm>
              </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                  {tutorials.map(tutorial => (
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
                        <AddTutorialForm initialData={tutorial}>
                           <Button variant="outline" size="sm">Edit</Button>
                        </AddTutorialForm>
                         <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(tutorial, 'tutorial')}>Delete</Button>
                    </div>
                  ))}
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="lessons" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>All Startup Lessons</CardTitle>
                  <CardDescription>
                    Browse and manage all startup lesson videos.
                  </CardDescription>
                </div>
                <AddLessonForm>
                   <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Lesson
                    </Button>
                </AddLessonForm>
              </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                  {lessons.map(lesson => (
                    <div key={lesson.id} className="flex items-center gap-4 p-2 rounded-md border">
                        <div className="relative h-16 w-28 rounded-md overflow-hidden">
                             <Image 
                                src={lesson.imageUrl}
                                alt={lesson.title}
                                fill
                                className="object-cover"
                             />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold">{lesson.title}</p>
                            <p className="text-sm text-muted-foreground">by {lesson.author}</p>
                        </div>
                         <AddLessonForm initialData={lesson}>
                            <Button variant="outline" size="sm">Edit</Button>
                        </AddLessonForm>
                         <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(lesson, 'lesson')}>Delete</Button>
                    </div>
                  ))}
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="articles" className="mt-6">
           <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>All Articles</CardTitle>
                  <CardDescription>
                    Browse and manage all articles.
                  </CardDescription>
                </div>
                <AddArticleForm>
                   <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Article
                    </Button>
                </AddArticleForm>
              </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                  {articles.map(article => (
                    <div key={article.id} className="flex items-center gap-4 p-2 rounded-md border">
                        <div className="relative h-16 w-28 rounded-md overflow-hidden">
                             <Image 
                                src={article.imageUrl}
                                alt={article.title}
                                fill
                                className="object-cover"
                             />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold">{article.title}</p>
                            <p className="text-sm text-muted-foreground">{article.category}</p>
                        </div>
                        <AddArticleForm initialData={article}>
                            <Button variant="outline" size="sm">Edit</Button>
                        </AddArticleForm>
                         <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(article, 'article')}>Delete</Button>
                    </div>
                  ))}
                </div>
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="case-studies" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>All Case Studies</CardTitle>
                  <CardDescription>
                    Browse and manage all case studies.
                  </CardDescription>
                </div>
                <AddCaseStudyForm>
                   <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Case Study
                    </Button>
                </AddCaseStudyForm>
              </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                  {caseStudies.map(study => (
                    <div key={study.id} className="flex items-center gap-4 p-2 rounded-md border">
                        <div className="relative h-16 w-28 rounded-md overflow-hidden">
                             <Image 
                                src={study.imageUrl}
                                alt={study.title}
                                fill
                                className="object-cover"
                             />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold">{study.title}</p>
                            <p className="text-sm text-muted-foreground">{study.companyName}</p>
                        </div>
                        <AddCaseStudyForm initialData={study}>
                            <Button variant="outline" size="sm">Edit</Button>
                        </AddCaseStudyForm>
                         <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(study, 'casestudy')}>Delete</Button>
                    </div>
                  ))}
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="investors" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>All Investors</CardTitle>
                  <CardDescription>
                    Browse and manage all investor profiles.
                  </CardDescription>
                </div>
                <AddInvestorForm>
                   <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Investor
                    </Button>
                </AddInvestorForm>
              </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                  {investors.map(investor => (
                    <div key={investor.id} className="flex items-center gap-4 p-2 rounded-md border">
                        <div className="flex-1">
                            <p className="font-semibold">{investor.name}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">{investor.description}</p>
                        </div>
                        <AddInvestorForm initialData={investor}>
                            <Button variant="outline" size="sm">Edit</Button>
                        </AddInvestorForm>
                         <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(investor, 'investor')}>Delete</Button>
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
        itemName={itemToDelete ? (itemToDelete.item as any).title || (itemToDelete.item as any).name || '' : ''}
      />
    </div>
  );
}

    