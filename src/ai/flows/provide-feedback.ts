'use server';

/**
 * @fileOverview Provides AI-driven feedback on user answers to puzzles.
 *
 * - provideFeedback - A function that evaluates a user's answer and provides feedback.
 * - ProvideFeedbackInput - The input type for the provideFeedback function.
 * - ProvideFeedbackOutput - The return type for the provideFeedback function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProvideFeedbackInputSchema = z.object({
  problem: z.string().describe('The puzzle or riddle question.'),
  expertAnswer: z.string().describe('The correct or ideal answer.'),
  userAnswer: z.string().describe("The user's submitted answer."),
});
export type ProvideFeedbackInput = z.infer<typeof ProvideFeedbackInputSchema>;

const ProvideFeedbackOutputSchema = z.object({
  isCorrect: z.boolean().describe('Whether the user answer is correct.'),
  feedback: z.string().describe('Constructive feedback for the user.'),
});
export type ProvideFeedbackOutput = z.infer<
  typeof ProvideFeedbackOutputSchema
>;

export async function provideFeedback(
  input: ProvideFeedbackInput
): Promise<ProvideFeedbackOutput> {
  return provideFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideFeedbackPrompt',
  input: { schema: ProvideFeedbackInputSchema },
  output: { schema: ProvideFeedbackOutputSchema },
  prompt: `You are a helpful and encouraging quiz assistant. Your goal is to provide feedback on a user's answer to a puzzle or riddle.

Analyze the user's answer and compare it to the expert's answer. Determine if the user's answer is correct. The user's answer doesn't have to be an exact match to be considered correct, as long as it captures the main idea.

Then, provide a short, single-sentence feedback message.
- If the answer is correct, be encouraging (e.g., "Great job!", "That's exactly right!", "You nailed it!").
- If the answer is incorrect, be gentle and provide a subtle hint without giving away the answer (e.g., "Not quite, think about...", "You're on the right track, but consider...").

Problem:
{{{problem}}}

Expert Answer:
{{{expertAnswer}}}

User's Answer:
{{{userAnswer}}}
`,
});

const provideFeedbackFlow = ai.defineFlow(
  {
    name: 'provideFeedbackFlow',
    inputSchema: ProvideFeedbackInputSchema,
    outputSchema: ProvideFeedbackOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
