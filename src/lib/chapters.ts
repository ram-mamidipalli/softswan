
import data from './chapters.json';

export type Chapter = {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  imageHint: string;
  content: string[];
};

export const chapters: Chapter[] = data.chapters;
