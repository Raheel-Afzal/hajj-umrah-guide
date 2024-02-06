import {StepDescDB} from '../models/Model';

export function transformArray(inputArray: StepDescDB[]) {
  return inputArray.map(item => {
    if (item.name || item.arabic || item.english || item.translation) {
      return {
        step: item.step,
        stepNo: item.stepNo,
        type: item.type,
        day: item.day,
        dua: {
          name: item.name,
          arabic: item.arabic,
          english: item.english,
          translation: item.translation,
        },
      };
    } else {
      return {
        step: item.step,
        stepNo: item.stepNo,
        type: item.type,
        day: item.day,
        dua: null,
      };
    }
  });
}
