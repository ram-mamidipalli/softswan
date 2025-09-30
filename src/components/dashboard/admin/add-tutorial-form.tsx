
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { tutorials, type Tutorial } from '@/lib/tutorials';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  category: z.string().min(1, 'Category is required'),
  videoUrl: z.string().url('Must be a valid YouTube URL'),
  description: z.string().min(1, 'Description is required'),
  imageHint: z.string().min(1, 'Image hint is required'),
});

function getYouTubeVideoId(url: string): string | null {
    let videoId = '';
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === 'youtu.be') {
        videoId = urlObj.pathname.slice(1);
      } else if (urlObj.hostname.includes('youtube.com')) {
        videoId = urlObj.searchParams.get('v') || '';
      }
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
    } catch (error) {
      return null;
    }
    return videoId;
}

export function AddTutorialForm({ children, onTutorialAdded }: { children: React.ReactNode, onTutorialAdded: (tutorial: Tutorial) => void }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      author: '',
      category: '',
      videoUrl: '',
      description: '',
      imageHint: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const videoId = getYouTubeVideoId(values.videoUrl);
    
    if (!videoId) {
        toast({
            variant: 'destructive',
            title: 'Invalid YouTube URL',
            description: 'Please provide a valid YouTube video link.'
        });
        return;
    }

    const newTutorial: Tutorial = {
        id: tutorials.length + 1, // simplified ID generation
        title: values.title,
        author: values.author,
        category: values.category,
        videoUrl: `https://www.youtube.com/embed/${videoId}`,
        imageUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        description: values.description,
        imageId: `tutorial${tutorials.length + 1}`,
        imageHint: values.imageHint,
    };
    
    // In a real app, you would make an API call here to save the tutorial
    // For now, we'll just show a success message and pass it to the parent.
    console.log('New tutorial data:', newTutorial);
    
    onTutorialAdded(newTutorial);
    toast({
        title: 'Tutorial Added',
        description: 'The new tutorial has been added to the list.',
    });
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Tutorial</DialogTitle>
          <DialogDescription>
            Fill in the details for the new tutorial. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., How to Speak with Confidence" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Julian Treasure" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Public Speaking" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube Video URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.youtube.com/watch?v=..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A brief summary of the tutorial." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Hint</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., public speaking" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save Tutorial</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

