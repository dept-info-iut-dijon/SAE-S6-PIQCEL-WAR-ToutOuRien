"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlDatabase = void 0;
const mysql_1 = __importDefault(require("mysql"));
/**
 * Represents a class for interacting with a MySQL database.
 * Implements the IDatabase interface.
 */
class MySqlDatabase {
    /**
     * Creates a new instance of the Database class.
     * Configures the MySQL connection with the provided credentials.
     */
    constructor() {
        this.connection = mysql_1.default.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'piqcelWar',
        });
    }
    IsConnected() {
        return !!(this.connection && this.connection.state === 'authenticated');
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // Establish the connection to the database
                this.connection.connect((error) => {
                    if (error) {
                        console.error('Erreur de connexion à la base de données:', error);
                        reject(error);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    queryOne(req, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (this.connection) {
                    this.connection.query(req, params, (err, results) => {
                        if (err) {
                            console.error('Erreur lors de la requête SQL:', err);
                            reject(err);
                        }
                        else {
                            resolve(results[0]); // Returns the first result if there is one
                        }
                    });
                }
                else {
                    reject(new Error('La connexion à la base de données n\'est pas établie.'));
                }
            });
        });
    }
    queryAll(req, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (this.connection) {
                    this.connection.query(req, params, (err, results) => {
                        if (err) {
                            console.error('Erreur lors de la requête SQL:', err);
                            reject(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                }
                else {
                    reject(new Error('La connexion à la base de données n\'est pas établie.'));
                }
            });
        });
    }
    execute(req, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (this.connection) {
                    this.connection.query(req, params, (err) => {
                        if (err) {
                            console.error('Erreur lors de la requête SQL:', err);
                            reject(err);
                        }
                        else {
                            resolve();
                        }
                    });
                }
                else {
                    reject(new Error('La connexion à la base de données n\'est pas établie.'));
                }
            });
        });
    }
    close() {
        if (this.connection) {
            this.connection.end();
        }
    }
}
exports.MySqlDatabase = MySqlDatabase;
