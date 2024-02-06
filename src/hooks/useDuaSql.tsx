import {useEffect, useState} from 'react';
import SQLiteDb from '../sql';
import { Dua } from '../models/Model';

export const useDuaSql = () => {



  const [getAllDuas, setAllDuas] = useState<Dua[]>([]);

  const db = new SQLiteDb<Dua>('HajjUmrahDB');

  const createTable = async () => {
    try {
      await db.createTable('dua_table_new', [
        {name: 'dua', type: 'text'},
        {name: 'personName', type: 'text'},
        {name: 'step', type: 'text'},
      ]);
    } catch (error) {
      console.error('Error creating table:', error);
    }
  };

  const loadTable = async () => {
    try {
      await createTable();
      const allDua = await db.getAllRecords('dua_table_new');
      setAllDuas(allDua);
    } catch (error) {
      console.error('Error loading:', error);
    }
  };

  const addDua = async (dua: Dua) => {
    try {
      await db.createRecord('dua_table_new', dua);
      loadTable();
    } catch (error) {
      console.error('Error while toggle:', error);
    }
  };

  useEffect(() => {
    loadTable();
  }, []);

  return {getAllDuas, addDua};
};
