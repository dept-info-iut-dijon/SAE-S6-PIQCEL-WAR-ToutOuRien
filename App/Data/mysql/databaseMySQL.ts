import { IDatabase } from "../IDatabase";
import mysql, { Connection, MysqlError } from 'mysql';

/**
 * Represents a class for interacting with a MySQL database.
 * Implements the IDatabase interface.
 */
class MySqlDatabase implements IDatabase 
{

    private connection: Connection;

    /**
     * Creates a new instance of the Database class.
     * Configures the MySQL connection with the provided credentials.
     */
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'piqcelWar',
        });
    }

    IsConnected(): boolean {
        return (this.connection && this.connection.state === 'authenticated');
    }

    public async connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            // Establish the connection to the database
            this.connection!.connect((error: MysqlError) => {
                if (error) {
                    console.error('Erreur de connexion à la base de données:', error);
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    public async queryOne(req: string, params: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.connection) {
                this.connection.query(req, params, (err, results) => {
                    if (err) {
                        console.error('Erreur lors de la requête SQL:', err);
                        reject(err);
                    } else {
                        resolve(results[0]); // Returns the first result if there is one
                    }
                });
            } else {
                reject(new Error('La connexion à la base de données n\'est pas établie.'));
            }
        });
    }

    public async queryAll(req: string, params: any[]): Promise<any[]> {
        return new Promise((resolve, reject) => {
            if (this.connection) {
                this.connection.query(req, params, (err, results) => {
                    if (err) {
                        console.error('Erreur lors de la requête SQL:', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            } else {
                reject(new Error('La connexion à la base de données n\'est pas établie.'));
            }
        });
    }

    public async execute(req: string, params: any[]): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.connection) {
                this.connection.query(req, params, (err) => {
                    if (err) {
                        console.error('Erreur lors de la requête SQL:', err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            } else {
                reject(new Error('La connexion à la base de données n\'est pas établie.'));
            }
        });
    }

    public close(): void {
        if (this.connection) {
            this.connection.end();
        }
    }
}

export { MySqlDatabase };
