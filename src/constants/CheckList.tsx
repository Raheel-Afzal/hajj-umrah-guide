import {CheckListItemT} from '../models/Model';
import {IMAGES} from './Images';
export const checkListData: CheckListItemT[] = [
  {
    id: 1,
    itemName: 'Passport including Visa Documentation',
    desc: [
      'The Hajj authorities will take your passport upon arrival in Saudi Arabia and will return it to you when departing.',
    ],
    image: IMAGES.passport,
  },
  {
    id: 2,
    itemName: 'Proof of Vaccination',
    desc: [
      'All pilgrims from all countries must produce a valid certificate of vaccination against quadrivalent (A/C/Y/W135) meningococcal meningitis.',
      'Depending on what country you are from, you may also need to have valid certificates of vaccinations against yellow fever and polio.',
    ],
    image: IMAGES.vaccination_proof,
  },
  {
    id: 3,
    itemName: 'Passport Sized Photos',
    desc: [
      'All pilgrims from all countries must produce a valid certificate of vaccination against quadrivalent (A/C/Y/W135) meningococcal meningitis.',
      'Depending on what country you are from, you may also need to have valid certificates of vaccinations against yellow fever and polio.',
    ],
    image: IMAGES.vaccination_proof,
  },
];
