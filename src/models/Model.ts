import {Hajj, Umrah} from '../Enums';

export type HajjUmrah = `${Hajj}` | `${Umrah}`;

export type Position = {
  top: `${number}%`;
  right: `${number}%`;
};

export type GroupedArray = Record<string, Dua[]>;

export interface CheckListItemT {
  id?: number;
  itemName: string;
  desc?: string[];
  image?: any;
}

export type Dua = {
  dua: string;
  personName: string;
  step: string;
};

export type RatingT = {
  rating: number;
};

export type RatingSummary = {
  star: string;
  progress: number;
  totalRating: number;
};

export type StepDua = {
  name: string;
  arabic: string;
  english: string;
  translation: string;
};

export type StepDesc = {
  step: string;
  dua: StepDua | null;
};
export type StepDescDB = {
  stepNo: number;
  step: string;
  name: string;
  arabic: string;
  english: string;
  translation: string;
  type: HajjUmrah;
  day: number;
};
