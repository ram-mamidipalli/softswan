
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

export const caseStudies: CaseStudy[] = data.caseStudies.map(study => ({
  ...study,
  links: study.links.map(link => {
    if (typeof link === 'string') {
      // Find the title from the full case studies list if it's a simple URL
      // This is a bit of a hack to maintain compatibility with the old format
      const matchingNewLink = (data.caseStudies.find(s => s.id === study.id)?.links.find(l => typeof l === 'object' && l.url === link) as CaseStudyLink | undefined);
      return {
        url: link,
        title: matchingNewLink ? matchingNewLink.title : `Read Full Case Study`,
        description: matchingNewLink ? matchingNewLink.description : ''
      };
    }
    return link;
  })
}));
