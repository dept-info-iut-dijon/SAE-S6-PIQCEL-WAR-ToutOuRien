import { IDatabase } from './iDatabase';

// Import database types here
import { SQLiteDatabase as SqliteDB } from './sqlite/databaseSqlite';
import { MySqlDatabase as MySqlDB } from './mysql/databaseMySQL';

// Database factory
export function createDatabase(type : string) : IDatabase {
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
