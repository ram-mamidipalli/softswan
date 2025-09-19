
import data from './tutorials.json';

export type Tutorial = {
  id: number;
  title: string;
  author: string;
  category: string;
  imageId: string;
  imageHint: string;
  imageUrl: string;
  videoUrl: string;
  description: string;
};

export const tutorials: Tutorial[] = data.tutorials;
