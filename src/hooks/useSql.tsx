import {useState} from 'react';
import SQLiteDb from '../sql';

export const useSQLite = () => {
  type CheckedValue = {
    id: number;
    checked_value: number;
  };

  const [checkedValues, setCheckedValues] = useState<Number[]>([]);

  const db = new SQLiteDb<CheckedValue>('HajjUmrahDB');

  const createTable = async () => {
    try {
      await db.createTable('checkedValues', [
        {name: 'checked_value', type: 'INTEGER'},
      ]);
    } catch (error) {
      console.error('Error creating table:', error);
    }
  };

  const loadTable = async () => {
    try {
      await createTable();
      const checkedValues = await db.getAllRecords('checkedValues');
      setCheckedValues(() => checkedValues.map(item => item.id));
    } catch (error) {
      console.error('Error loading:', error);
    }
  };

  const toggleCheck = async (checked_value: number) => {
    try {
      const isFound = await db.getRecordsByQuery(
        `select * from checkedValues where checked_value== ${checked_value}`,
      );
      isFound.length
        ? await db.deleteRecord('checkedValues', isFound[0].id)
        : await db.createRecord('checkedValues', {
            checked_value,
            id: checked_value,
          });
      loadTable();
    } catch (error) {
      console.error('Error while toggle:', error);
    }
  };

  return {loadTable, toggleCheck, checkedValues};
};
