import * as sqlite from 'sqlite3';
import { IDatabase } from '../IDatabase';
const sqlite3 = sqlite.verbose();

/**
 * Represents a class for interacting with an SQLite database.
 * Implements the IDatabase interface.
 */
class SQLiteDatabase implements IDatabase {

    private db: sqlite.Database;
    private isConnected: boolean = false;

    /**
     * Creates a new instance of the Database class.
     * Configures the SQLite database with the provided file path.
     */
    constructor() {
        this.db = new sqlite3.Database('./App/Data/sqlite/BDD.db', (err) => {
            if (err) {
                console.error('Erreur lors de la connexion à la base de données:', err);
            } 
        });
    }

    public async connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.on('open', async () => {
                resolve();
                this.isConnected = true;
            });
    
            this.db.on('error', (err) => {
                reject(err);
            });
        });
    }
    

    public async queryOne(req: string, params: any[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.db.get(req, params, (error, row) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(row);
                }
            });
        });
    }
    
    public async queryAll(req: string, params: any[]): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.db.all(req, params, (error, rows) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    
    public async execute(req: string, params: any[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(req, params, function (error) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
    
    
    public close(): void {
        if (this.isConnected) 
        {
            this.db.close((err) => 
            {
                if (err) 
                {
                    console.error('Erreur lors de la fermeture de la connexion :', err);
                } 
                else 
                {
                    this.isConnected = false;
                }
            });
        }
    }

    public IsConnected() : boolean {
        return this.isConnected;
    }
}

export { SQLiteDatabase };
