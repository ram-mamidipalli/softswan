
import data from './articles.json';

export type Article = {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  imageHint: string;
  category: string;
  content: string[];
  trending?: boolean;
};

export const articles: Article[] = data.articles;
