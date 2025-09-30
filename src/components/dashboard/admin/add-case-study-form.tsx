
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
import { caseStudies, type CaseStudy, type CaseStudyLink } from '@/lib/case-studies';

const formSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Must be a valid image URL'),
  imageHint: z.string().min(1, 'Image hint is required'),
  websiteUrl: z.string().url('Must be a valid URL'),
  links: z.string().min(1, 'Links are required. Enter one URL per line, or JSON for detailed links.'),
});

type AddCaseStudyFormProps = {
    children: React.ReactNode;
    initialData?: CaseStudy;
    onCaseStudyAdded?: (caseStudy: CaseStudy) => void;
    onCaseStudyUpdated?: (caseStudy: CaseStudy) => void;
}

export function AddCaseStudyForm({ children, initialData, onCaseStudyAdded, onCaseStudyUpdated }: AddCaseStudyFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { toast } = useToast();
  const isEditMode = !!initialData;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      title: '',
      description: '',
      imageUrl: '',
      imageHint: '',
      websiteUrl: '',
      links: '',
    },
  });

  React.useEffect(() => {
    if (initialData && isOpen) {
      let linksString = '';
      try {
        linksString = JSON.stringify(initialData.links, null, 2);
      } catch (e) {
        linksString = (initialData.links as string[]).join('\n');
      }

      form.reset({
        ...initialData,
        links: linksString,
      });
    } else {
      form.reset();
    }
  }, [initialData, isOpen, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    let parsedLinks: (string | CaseStudyLink)[];
    try {
      // Try parsing as JSON first
      parsedLinks = JSON.parse(values.links);
    } catch (e) {
      // If JSON parsing fails, treat as newline-separated strings
      parsedLinks = values.links.split('\n').filter(link => link.trim() !== '');
    }

    if (isEditMode && onCaseStudyUpdated && initialData) {
        const updatedCaseStudy: CaseStudy = {
            ...initialData,
            ...values,
            links: parsedLinks,
        };
        onCaseStudyUpdated(updatedCaseStudy);
        toast({
            title: 'Case Study Updated',
            description: 'The case study has been successfully updated.',
        });
    } else if (onCaseStudyAdded) {
        const newCaseStudy: CaseStudy = {
            id: caseStudies.length + 1, // simplified ID generation
            ...values,
            links: parsedLinks,
        };
        onCaseStudyAdded(newCaseStudy);
        toast({
            title: 'Case Study Added',
            description: 'The new case study has been added to the list.',
        });
    }
    
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Case Study' : 'Add New Case Study'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Edit the case study details.' : "Fill in the details for the new case study."}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Apple" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Apple at Work - Success Stories" {...field} />
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
                      <Textarea rows={3} placeholder="A brief description of the case study." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://images.unsplash.com/..." {...field} />
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
                      <Input placeholder="e.g., apple products" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.apple.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="links"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Links</FormLabel>
                     <FormControl>
                      <Textarea rows={5} placeholder="Enter one URL per line, or enter a JSON array of link objects." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="sticky bottom-0 bg-background pt-4 pb-0 -mx-6 px-6">
                  <DialogClose asChild>
                      <Button type="button" variant="secondary">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save Case Study</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
