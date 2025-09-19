'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Wand2, Lightbulb, ChevronRight } from 'lucide-react';

import { getRecommendedTutorials } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '../ui/card';

const skills = [
  { id: 'public-speaking', label: 'Public Speaking' },
  { id: 'interview-prep', label: 'Interview Prep' },
  { id: 'storytelling', label: 'Storytelling' },
  { id: 'body-language', label: 'Body Language' },
];

const FormSchema = z.object({
  skills: z.array(z.string()),
});

export function TutorialRecommender() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [recommendations, setRecommendations] = React.useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      skills: [],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setRecommendations([]);

    const result = await getRecommendedTutorials({
      skills: data.skills,
      activity: 'User is interested in improving communication skills.',
    });

    setIsLoading(false);

    if (result.success && result.tutorials) {
      setRecommendations(result.tutorials);
    } else {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: result.error,
      });
    }
  }

  return (
    <Card className="bg-secondary">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Wand2 className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-bold text-foreground">
              Get Personalized Recommendations
            </h4>
            <p className="text-sm text-muted-foreground">
              Tell us what you want to learn, and our AI will suggest the best
              tutorials for you.
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {skills.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Lightbulb className="mr-2 h-4 w-4" />
              )}
              Suggest Tutorials
            </Button>
          </form>
        </Form>
        {recommendations.length > 0 && (
          <div className="mt-6">
            <h5 className="font-semibold">Recommended for you:</h5>
            <ul className="mt-2 space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
