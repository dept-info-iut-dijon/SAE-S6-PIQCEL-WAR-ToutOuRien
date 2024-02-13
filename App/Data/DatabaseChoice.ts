import { IDatabase } from './IDatabase';

// Import database types here
import { SQLiteDatabase as SqliteDB } from './sqlite/databaseSqlite.js';
import { MySqlDatabase as MySqlDB } from './mysql/databaseMySQL.js';

// Database factory
export function CreateDatabase(type : string) : IDatabase {
    let database = null;
    if (type === 'sqlite') {
        database = new SqliteDB();
    } else if (type === 'mysql') {
        database = new MySqlDB();
    } else {
        throw new Error('Type de base de données non pris en charge');
    }
    return database;
}
