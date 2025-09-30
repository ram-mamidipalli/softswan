
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
import Image from 'next/image';
import { AddTutorialForm } from '@/components/dashboard/admin/add-tutorial-form';
import { AddLessonForm } from '@/components/dashboard/admin/add-lesson-form';
import { AddArticleForm } from '@/components/dashboard/admin/add-article-form';
import { DeleteConfirmationDialog } from '@/components/dashboard/admin/delete-confirmation-dialog';
import { useToast } from '@/hooks/use-toast';

type ContentItem = Tutorial | Lesson | Article;

export default function AdminContentPage() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [allTutorials, setAllTutorials] = React.useState<Tutorial[]>(tutorials);
  const [allLessons, setAllLessons] = React.useState<Lesson[]>(lessons);
  const [allArticles, setAllArticles] = React.useState<Article[]>(articles);
  
  const [itemToDelete, setItemToDelete] = React.useState<ContentItem | null>(null);
  const [deleteType, setDeleteType] = React.useState<'tutorial' | 'lesson' | 'article' | null>(null);


  React.useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin, loading, router]);

  const handleTutorialAdded = (newTutorial: Tutorial) => {
    setAllTutorials(prev => [...prev, newTutorial]);
  };

  const handleLessonAdded = (newLesson: Lesson) => {
    setAllLessons(prev => [...prev, newLesson]);
  };

  const handleArticleAdded = (newArticle: Article) => {
    setAllArticles(prev => [...prev, newArticle]);
  };

  const handleTutorialUpdated = (updatedTutorial: Tutorial) => {
    setAllTutorials(prev => prev.map(t => t.id === updatedTutorial.id ? updatedTutorial : t));
  };
    
  const handleLessonUpdated = (updatedLesson: Lesson) => {
    setAllLessons(prev => prev.map(l => l.id === updatedLesson.id ? updatedLesson : l));
  };

  const handleArticleUpdated = (updatedArticle: Article) => {
    setAllArticles(prev => prev.map(a => a.id === updatedArticle.id ? updatedArticle : a));
  };

  const handleDeleteClick = (item: ContentItem, type: 'tutorial' | 'lesson' | 'article') => {
    setItemToDelete(item);
    setDeleteType(type);
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete || !deleteType) return;

    if (deleteType === 'tutorial') {
      setAllTutorials(prev => prev.filter(t => t.id !== itemToDelete.id));
    } else if (deleteType === 'lesson') {
      setAllLessons(prev => prev.filter(l => l.id !== itemToDelete.id));
    } else if (deleteType === 'article') {
      setAllArticles(prev => prev.filter(a => a.id !== itemToDelete.id));
    }

    toast({
      title: `${deleteType.charAt(0).toUpperCase() + deleteType.slice(1)} Deleted`,
      description: `The item has been removed.`,
    });

    setItemToDelete(null);
    setDeleteType(null);
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
                        <AddTutorialForm
                          initialData={tutorial}
                          onTutorialUpdated={handleTutorialUpdated}
                        >
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
                <AddLessonForm onLessonAdded={handleLessonAdded}>
                   <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Lesson
                    </Button>
                </AddLessonForm>
              </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                  {allLessons.map(lesson => (
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
                         <AddLessonForm
                          initialData={lesson}
                          onLessonUpdated={handleLessonUpdated}
                        >
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
                <AddArticleForm onArticleAdded={handleArticleAdded}>
                   <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Article
                    </Button>
                </AddArticleForm>
              </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                  {allArticles.map(article => (
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
                        <AddArticleForm
                          initialData={article}
                          onArticleUpdated={handleArticleUpdated}
                        >
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
              <CardTitle>Manage Case Studies</CardTitle>
              <CardDescription>
                Functionality to add, edit, and delete case studies will be built here.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <p className="text-muted-foreground">Case study management coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="investors" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Investors</CardTitle>
              <CardDescription>
                 Functionality to add, edit, and delete investor profiles will be built here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Investor management coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <DeleteConfirmationDialog
        isOpen={!!itemToDelete}
        onOpenChange={(isOpen) => !isOpen && setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemName={itemToDelete?.title || ''}
      />
    </div>
  );
}
