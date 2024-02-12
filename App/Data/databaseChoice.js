"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabase = void 0;
// Import database types here
const databaseSqlite_1 = require("./sqlite/databaseSqlite");
const databaseMySQL_1 = require("./mysql/databaseMySQL");
// Database factory
function createDatabase(type) {
    let database = null;
    if (type === 'sqlite') {
        database = new databaseSqlite_1.SQLiteDatabase();
    }
    else if (type === 'mysql') {
        database = new databaseMySQL_1.MySqlDatabase();
    }
    else {
        throw new Error('Type de base de données non pris en charge');
    }
    return database;
}
exports.createDatabase = createDatabase;
