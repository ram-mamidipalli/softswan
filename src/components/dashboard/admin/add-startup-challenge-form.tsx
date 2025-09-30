
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
import { startupChallenges, type StartupChallenge } from '@/lib/startup-challenges';

const formSchema = z.object({
  problem: z.string().min(1, 'Problem is required'),
  expert_answer: z.string().min(1, 'Expert answer is required'),
  category: z.string().min(1, 'Category is required'),
});

type AddStartupChallengeFormProps = {
    children: React.ReactNode;
    initialData?: StartupChallenge;
    onStartupChallengeAdded?: (challenge: StartupChallenge) => void;
    onStartupChallengeUpdated?: (challenge: StartupChallenge) => void;
}

export function AddStartupChallengeForm({ children, initialData, onStartupChallengeAdded, onStartupChallengeUpdated }: AddStartupChallengeFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { toast } = useToast();
  const isEditMode = !!initialData;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problem: '',
      expert_answer: '',
      category: '',
    },
  });

  React.useEffect(() => {
    if (initialData && isOpen) {
      form.reset(initialData);
    } else {
      form.reset();
    }
  }, [initialData, isOpen, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isEditMode && onStartupChallengeUpdated && initialData) {
        const updatedChallenge: StartupChallenge = {
            ...initialData,
            ...values,
        };
        onStartupChallengeUpdated(updatedChallenge);
        toast({
            title: 'Startup Challenge Updated',
            description: 'The challenge has been successfully updated.',
        });
    } else if (onStartupChallengeAdded) {
        const newChallenge: StartupChallenge = {
            id: startupChallenges.length + 1, // simplified ID generation
            ...values,
        };
        onStartupChallengeAdded(newChallenge);
        toast({
            title: 'Startup Challenge Added',
            description: 'The new challenge has been added to the list.',
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
          <DialogTitle>{isEditMode ? 'Edit Startup Challenge' : 'Add New Startup Challenge'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Edit the challenge details.' : "Fill in the details for the new challenge. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="problem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Problem</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="Enter the challenge question." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="expert_answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expert Answer</FormLabel>
                    <FormControl>
                      <Textarea rows={3} placeholder="Enter the correct answer." {...field} />
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
                      <Input placeholder="e.g., Customer Retention" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="sticky bottom-0 bg-background pt-4 pb-0 -mx-6 px-6">
                  <DialogClose asChild>
                      <Button type="button" variant="secondary">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save Challenge</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
