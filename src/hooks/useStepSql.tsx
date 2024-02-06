import {useEffect, useState} from 'react';
import {RatingT, StepDesc, StepDescDB} from '../models/Model';
import SQLiteDb from '../sql';

export const useStepSql = () => {
  const [dbSteps, setStepDuas] = useState<StepDescDB[]>([]);

  const db = new SQLiteDb<StepDescDB>('HajjUmrahDB');

  const createTable = async () => {
    try {
      await db.createTable('stepDescTable', [
        {name: 'stepNo', type: 'INTEGER'},
        {name: 'step', type: 'TEXT'},
        {name: 'name', type: 'TEXT'},
        {name: 'arabic', type: 'TEXT'},
        {name: 'english', type: 'TEXT'},
        {name: 'translation', type: 'TEXT'},
        {name: 'type', type: 'TEXT'},
        {name: 'day', type: 'TEXT'},
      ]);
    } catch (error) {
      console.error('Error creating table:', error);
    }
  };

  const loadTable = async () => {
    try {
      await createTable();
      const allDua = await db.getAllRecords('stepDescTable');
      setStepDuas(allDua);
    } catch (error) {
      console.error('Error loading:', error);
    }
  };

  const addStep = async (stepDesc: StepDescDB) => {
    try {
      await db.createRecord('stepDescTable', stepDesc);
      loadTable();
    } catch (error) {
      console.error('Error while toggle:', error);
    }
  };

  useEffect(() => {
    loadTable();
  }, []);

  return {dbSteps, addStep, loadTable};
};
