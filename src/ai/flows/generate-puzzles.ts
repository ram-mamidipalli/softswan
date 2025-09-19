'use server';

/**
 * @fileOverview Generates problem-solving puzzles and riddles using AI.
 *
 * - generatePuzzles - A function that generates a list of puzzles.
 * - GeneratePuzzlesOutput - The return type for the generatePuzzles function.
 * - Puzzle - The type for a single puzzle object.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PuzzleSchema = z.object({
  question: z
    .string()
    .describe('The puzzle or riddle question. Should be challenging but solvable.'),
  answer: z.string().describe('The correct answer to the puzzle or riddle.'),
});

export type Puzzle = z.infer<typeof PuzzleSchema>;

const GeneratePuzzlesOutputSchema = z.object({
  puzzles: z
    .array(PuzzleSchema)
    .length(10)
    .describe('An array of 10 unique puzzles and riddles.'),
});
export type GeneratePuzzlesOutput = z.infer<
  typeof GeneratePuzzlesOutputSchema
>;

export async function generatePuzzles(): Promise<GeneratePuzzlesOutput> {
  return generatePuzzlesFlow();
}

const prompt = ai.definePrompt({
  name: 'generatePuzzlesPrompt',
  output: { schema: GeneratePuzzlesOutputSchema },
  prompt: `You are an expert puzzle master. Your task is to generate a list of 10 unique and engaging problem-solving challenges and riddles.

The puzzles should vary in type, including logic puzzles, lateral thinking problems, and classic riddles. They should be suitable for students and professionals looking to sharpen their critical thinking skills for job interviews.

Please provide exactly 10 puzzles. For each puzzle, provide a clear question and a concise answer.`,
});

const generatePuzzlesFlow = ai.defineFlow(
  {
    name: 'generatePuzzlesFlow',
    outputSchema: GeneratePuzzlesOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    return output!;
  }
);
