import {useEffect, useState} from 'react';
import SQLiteDb from '../sql';
import {CheckListItemT, Dua} from '../models/Model';

export const useCheckList = () => {
  const [getDbItems, setGetDbItems] = useState<CheckListItemT[]>([]);

  const db = new SQLiteDb<CheckListItemT>('HajjUmrahDB');

  const createTable = async () => {
    try {
      await db.createTable('checkListItems', [
        {name: 'itemName', type: 'text'},
      ]);
    } catch (error) {
      console.error('Error creating table:', error);
    }
  };

  const loadTable = async () => {
    try {
      await createTable();
      const allDua = await db.getAllRecords('checkListItems');
      setGetDbItems(allDua);
    } catch (error) {
      console.error('Error loading:', error);
    }
  };

  const addCheckListItem = async (checkListItem: CheckListItemT) => {
    try {
      await db.createRecord('checkListItems', checkListItem);
      loadTable();
    } catch (error) {
      console.error('Error while toggle:', error);
    }
  };

  useEffect(() => {
    loadTable();
  }, []);

  return {getDbItems, addCheckListItem};
};
