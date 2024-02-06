import { useEffect, useState } from 'react';
import { RatingT } from '../models/Model';
import SQLiteDb from '../sql';

export const useRatingSql = () => {
  const [getAllRating, setAllRating] = useState<RatingT[]>([]);

  const db = new SQLiteDb<RatingT>('HajjUmrahDB');

  const createTable = async () => {
    try {
      await db.createTable('ratingTable', [{name: 'rating', type: 'INTEGER'}]);
    } catch (error) {
      console.error('Error creating table:', error);
    }
  };

  const loadTable = async () => {
    try {
      await createTable();
      const allDua = await db.getAllRecords('ratingTable');
      setAllRating(allDua);
    } catch (error) {
      console.error('Error loading:', error);
    }
  };

  const addRating = async (rating: RatingT) => {
    try {
      await db.createRecord('ratingTable', rating);
      loadTable();
    } catch (error) {
      console.error('Error while toggle:', error);
    }
  };

  useEffect(() => {
    loadTable();
  }, []);

  return {getAllRating, addRating};
};
