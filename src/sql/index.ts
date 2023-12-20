import SQLite, {SQLiteDatabase, SQLError} from 'react-native-sqlite-storage';

interface Record {
  [key: string]: any;
}

class SQLiteDb<T extends Record> {
  private db: SQLiteDatabase;

  constructor(databaseName: string) {
    this.db = SQLite.openDatabase(
      {
        name: databaseName,
        location: 'default',
      },
      this.openCB,
      this.errorCB,
    );
  }

  private openCB = () => {
    console.log('Database opened: db name>>', this.db.dbname);
  };

  private errorCB = (err: SQLError) => {
    console.log('SQL Error: ' + err.message);
  };

  createTable(
    tableName: string,
    columns: {name: string; type: string; constraints?: string}[],
  ) {
    const columnDefinitions = columns
      .map(column => {
        const {name, type, constraints} = column;
        const constraintsPart = constraints ? ` ${constraints}` : '';
        return `${name} ${type}${constraintsPart}`;
      })
      .join(', ');
    this.db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, ${columnDefinitions})`,
        [],
        res => {
          console.log(`Table '${tableName}' created successfully`);
        },
        (_, error: SQLError) => {
          console.log(`Error creating table '${tableName}': ${error.message}`);
        },
      );
    });
  }

  createRecord(tableName: string, data: T): Promise<number> {
    console.log('data: ', data);
    return new Promise((resolve, reject) => {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const placeholders = Array(keys.length).fill('?').join(', ');
      this.db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO ${tableName} (${keys.join(
            ', ',
          )}) VALUES (${placeholders})`,
          values,
          (_, results) => {
            resolve(results.insertId);
          },
          (_, error: SQLError) => {
            reject(_);
          },
        );
      });
    });
  }

  getAllRecords(tableName: string): Promise<T[]> {
    return this.getRecordsByQuery(`SELECT * FROM ${tableName}`);
  }

  getRecordsByQuery(query: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          query,
          params,
          (_, results) => {
            const rows = results.rows.raw() as T[];
            resolve(rows);
          },
          (_, error: SQLError) => {
            reject(_);
          },
        );
      });
    });
  }

  updateRecord(
    tableName: string,
    id: number,
    data: Partial<T>,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const setValues = keys.map(key => `${key} = ?`).join(', ');

      this.db.transaction(tx => {
        tx.executeSql(
          `UPDATE ${tableName} SET ${setValues} WHERE id = ?`,
          [...values, id],
          (_, results) => {
            resolve('Record updated successfully');
          },
          (_, error: SQLError) => {
            reject(_);
          },
        );
      });
    });
  }

  deleteRecord(tableName: string, id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `DELETE FROM ${tableName} WHERE id = ?`,
          [id],
          (_, results) => {
            resolve('Record deleted successfully');
          },
          (_, error: SQLError) => {
            reject(_);
          },
        );
      });
    });
  }
}

export default SQLiteDb;
