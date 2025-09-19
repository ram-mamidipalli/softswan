
import data from './puzzles.json';

export type Puzzle = {
  id: number;
  category: string;
  problem: string;
  expert_answer: string;
};

export const puzzles: Puzzle[] = data.puzzles;
