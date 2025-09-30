
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
import { type Investor } from '@/lib/investors';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  investmentStructure: z.string().min(1, 'Investment structure is required'),
  contact: z.string().min(1, 'Contact info is required'),
  people: z.string().optional(),
  industries: z.string().min(1, 'Industries are required'),
  startupsFunded: z.string().min(1, 'Startups funded are required'),
});

type AddInvestorFormProps = {
    children: React.ReactNode;
    initialData?: Investor;
}

export function AddInvestorForm({ children, initialData }: AddInvestorFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { toast } = useToast();
  const isEditMode = !!initialData;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      investmentStructure: '',
      contact: '',
      people: '',
      industries: '',
      startupsFunded: '',
    },
  });

  React.useEffect(() => {
    if (initialData && isOpen) {
      form.reset({
        ...initialData,
        people: initialData.people.join(', '),
        industries: initialData.industries.join(', '),
        startupsFunded: initialData.startupsFunded.join(', '),
      });
    } else if (!initialData) {
      form.reset();
    }
  }, [initialData, isOpen, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real application, you would make an API call here to save the data.
    if (isEditMode) {
        toast({
            title: 'Investor Updated (Simulated)',
            description: 'The investor data was prepared. A page refresh may be needed to see changes in a real app.',
        });
    } else {
        toast({
            title: 'Investor Added (Simulated)',
            description: 'The new investor data was prepared. A page refresh may be needed to see changes in a real app.',
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
          <DialogTitle>{isEditMode ? 'Edit Investor' : 'Add New Investor'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Edit the investor details.' : "Fill in the details for the new investor profile."}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Peak XV Partners" {...field} />
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
                      <Textarea rows={4} placeholder="A brief description of the investor." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="investmentStructure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Structure</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Multi-stage, from seed to growth." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Info</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., https://www.peakxv.com/" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="people"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>People (comma-separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Kunal Bahl, Rohit Bansal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industries"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industries (comma-separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., SaaS, Fintech, Consumer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startupsFunded"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Startups Funded (comma-separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Zomato, BYJU'S, OYO" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="sticky bottom-0 bg-background pt-4 pb-0 -mx-6 px-6">
                  <DialogClose asChild>
                      <Button type="button" variant="secondary">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save Investor</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

    