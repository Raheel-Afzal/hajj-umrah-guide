import {Hajj, Umrah} from '../Enums';

export type HajjUmrah = `${Hajj}` | `${Umrah}`;

export type Position = {
  top: `${number}%`;
  right: `${number}%`;
};



export interface CheckListItemT {
  id: number;
  itemName: string;
  desc: string[];
  image: any;
}