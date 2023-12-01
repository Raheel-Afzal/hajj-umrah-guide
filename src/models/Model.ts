import {Hajj, Umrah} from '../Enums';

export type HajjUmrah = `${Hajj}` | `${Umrah}`;

export type Position = {
  top: `${number}%`;
  right: `${number}%`;
};
