import data from './lessons.json';

export type Lesson = {
  id: number;
  title: string;
  author: string;
  category: string;
  imageHint: string;
  imageUrl: string;
  videoUrl: string;
  description: string;
};

export const lessons: Lesson[] = data.lessons;
