
import data from './case-studies.json';

export type CaseStudyLink = {
  title: string;
  url: string;
  description: string;
};

export type CaseStudy = {
  id: number;
  companyName: string;
  title: string;
  links: (string | CaseStudyLink)[];
  websiteUrl?: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const caseStudies: CaseStudy[] = data.caseStudies;
