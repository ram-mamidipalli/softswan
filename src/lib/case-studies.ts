
import data from './case-studies.json';

export type CaseStudy = {
  id: number;
  companyName: string;
  title: string;
  links: string[];
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const caseStudies: CaseStudy[] = data.caseStudies;
