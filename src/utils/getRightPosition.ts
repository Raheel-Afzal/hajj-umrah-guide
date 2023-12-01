import {Hajj, Umrah} from '../Enums';

type HajjUmrah = `${Hajj}` | `${Umrah}`;

export const getRightValue = (type: HajjUmrah): `${number}%`  => {
  switch (type) {
    case 'Umrah Al Mufradah':
    case 'Umrah Al Tammatu':
      return '-16.5%';
    case 'Hajj ul Tamattu':
      return '-10.5%';
    case 'Hajj ul Ifrad':
      return '-5%';
    default:
      return '-5.5%';
  }
};
