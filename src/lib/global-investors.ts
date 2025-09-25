
import data from './global-investors.json';

export type GlobalInvestor = {
  name: string;
  description: string;
  investmentStructure: string;
  industries: string[];
  notableInvestments: string[];
  website: string;
};

export const globalInvestors: GlobalInvestor[] = data.investors;
