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
  {
    id:4,
    itemName: 'Saudi Riyals',
    desc: [
      'Take a minimum of about 450 riyals (£100, $120), which will help you with your immediate expenses upon arrival in Saudi Arabia, until you become familiar with getting your money exchanged locally.',
    ],
    image: IMAGES.saudi_riyals,
  },
  {
    id:5,
    itemName: 'Money',
    desc: [
      'Take a sufficient amount of money to cover your expenditure.',
      'Draw up a budget before departure.',
      'You can exchange your money at the airport upon arrival in Saudi Arabia, at local banks or money exchangers (Sarraf) in Makkah and Madinah (recommended).',
    ],
    image: IMAGES.money,
  },
  {
    id:6,
    itemName: 'Debit / Credit Card',
    desc: [
      'Can be used to withdraw money from an ATM machine if your money runs out.',
    ],
    image: IMAGES.debit_card,
  },
  {
    id:7,
    itemName: 'Emergency Contact Numbers',
    desc: [
      'Group leader.',
      'Your country’s consulate.',
    ],
    image: IMAGES.emergency_contactnumber,
  },
  {
    id:8,
    itemName: 'Photocopy of Passport',
    desc: [

    ],
    image: IMAGES.photocopy_passport,
  },
  {
    id:9,
    itemName: 'Valid Tickets',
    desc: [

    ],
    image: IMAGES.valid,
  },
  {
    id:10,
    itemName: 'Full Travel Itinerary',
    desc: [

    ],
    image: IMAGES.itinerary,
  },
  {
    id:11,
    itemName: 'Pocket Quran',
    desc: [
      'Although copies of the Quran will be available in the mosque, it’s more convenient to have your own. This will allow you to remain seated without the need to get up and find a copy or return it, possibly causing you to lose your spot in the mosque.',
      'Don’t forget to remove it from your pocket before you go to the bathroom.',
    ],
    image: IMAGES.pocket_quran,
  },
  
];
