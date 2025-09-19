'use server';

/**
 * @fileOverview Recommends tutorials to users based on their past activity.
 *
 * - recommendTutorials - A function that recommends tutorials.
 * - RecommendTutorialsInput - The input type for the recommendTutorials function.
 * - RecommendTutorialsOutput - The return type for the recommendTutorials function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendTutorialsInputSchema = z.object({
  userActivity: z
    .string()
    .describe(
      'A description of the user\'s past activity on the platform, including completed tutorials, search history, and quiz scores.'
    ),
  userSkills: z
    .array(z.string())
    .describe('A list of the user\'s current skills.'),
});
export type RecommendTutorialsInput = z.infer<typeof RecommendTutorialsInputSchema>;

const RecommendTutorialsOutputSchema = z.object({
  recommendedTutorials: z
    .array(z.string())
    .describe('A list of recommended tutorial titles.'),
});
export type RecommendTutorialsOutput = z.infer<typeof RecommendTutorialsOutputSchema>;

export async function recommendTutorials(input: RecommendTutorialsInput): Promise<RecommendTutorialsOutput> {
  return recommendTutorialsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendTutorialsPrompt',
  input: {schema: RecommendTutorialsInputSchema},
  output: {schema: RecommendTutorialsOutputSchema},
  prompt: `You are a tutorial recommendation system.

  Based on the user's past activity and current skills, recommend a list of tutorials that will help them improve their skills.

  User Activity: {{{userActivity}}}
  User Skills: {{#if userSkills}}
    {{#each userSkills}}
      - {{{this}}}
    {{/each}}
  {{else}}
    No skills listed.
  {{/if}}

  Return only a list of tutorial titles.`,
});

const recommendTutorialsFlow = ai.defineFlow(
  {
    name: 'recommendTutorialsFlow',
    inputSchema: RecommendTutorialsInputSchema,
    outputSchema: RecommendTutorialsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
