
'use server';

/**
 * @fileOverview Generates a startup plan using AI.
 *
 * - generateStartupPlanFlow - A function that generates a startup plan based on a user's idea.
 * - GenerateStartupPlanInput - The input type for the generateStartupPlanFlow function.
 * - GenerateStartupPlanOutput - The return type for the generateStartupPlanFlow function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateStartupPlanInputSchema = z.object({
  idea: z.string().describe('The user\'s startup idea.'),
});
export type GenerateStartupPlanInput = z.infer<typeof GenerateStartupPlanInputSchema>;

const GenerateStartupPlanOutputSchema = z.object({
  plan: z.string().describe('A comprehensive, well-structured startup plan in markdown format.'),
});
export type GenerateStartupPlanOutput = z.infer<
  typeof GenerateStartupPlanOutputSchema
>;

export async function generateStartupPlanFlow(
  input: GenerateStartupPlanInput
): Promise<GenerateStartupPlanOutput> {
  const prompt = ai.definePrompt({
    name: 'generateStartupPlanPrompt',
    input: { schema: GenerateStartupPlanInputSchema },
    output: { schema: GenerateStartupPlanOutputSchema },
    prompt: `You are a world-class startup consultant. Based on the user's idea, generate a structured, actionable startup plan.

The plan should cover the following sections, using markdown for formatting (bold for titles):
- **Executive Summary:** A brief overview of the business.
- **Problem Statement:** The core problem you are solving.
- **Solution:** Your proposed product or service.
- **Target Market:** Your ideal customer profile.
- **Marketing & Sales Strategy:** How you will reach customers.
- **Key Milestones (First 90 Days):** Actionable steps to get started.

User Idea:
{{{idea}}}
`,
  });

  const { output } = await prompt(input);
  return output!;
}
