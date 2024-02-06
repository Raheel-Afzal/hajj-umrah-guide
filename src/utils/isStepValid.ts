import {StepDescDB} from '../models/Model';

export const isStepValid = (step: StepDescDB): boolean => {
  // Check if every field has a truthy value
  return step.stepNo !== undefined && step.step !== '';
};
