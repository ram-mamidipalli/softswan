
'use server';

import {
  recommendTutorials,
  type RecommendTutorialsInput,
} from '@/ai/flows/recommend-tutorials';

import {
  generatePuzzles,
  type GeneratePuzzlesOutput,
} from '@/ai/flows/generate-puzzles';

export async function getRecommendedTutorials(data: {
  skills: string[];
  activity: string;
}): Promise<{ success: boolean; tutorials?: string[]; error?: string }> {
  try {
    const input: RecommendTutorialsInput = {
      userSkills: data.skills,
      userActivity: data.activity,
    };
    const result = await recommendTutorials(input);
    return { success: true, tutorials: result.recommendedTutorials };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'Failed to get recommendations. Please try again.',
    };
  }
}

export async function getPuzzles(): Promise<{
  success: boolean;
  puzzles?: GeneratePuzzlesOutput['puzzles'];
  error?: string;
}> {
  try {
    const result = await generatePuzzles();
    return { success: true, puzzles: result.puzzles };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'Failed to generate puzzles. Please try again.',
    };
  }
}
