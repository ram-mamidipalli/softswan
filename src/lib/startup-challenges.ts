
import data from './startup-challenges.json';

export type StartupChallenge = {
  id: number;
  category: string;
  problem: string;
  expert_answer: string;
};

export const startupChallenges: StartupChallenge[] = data.startupChallenges;
