
import data from './investors.json';

export type Investor = {
  id: number;
  name: string;
  description: string;
  people: string[];
  investmentStructure: string;
  industries: string[];
  startupsFunded: string[];
  contact: string;
};

export const investors: Investor[] = data.investors;
