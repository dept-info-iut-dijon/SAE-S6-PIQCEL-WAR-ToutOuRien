import express from 'express';
import { CreateDatabase } from "./App/Data/DatabaseChoice";
import { Server } from "./Server";
import { IDatabase } from "./App/Data/IDatabase";

// Configure le middleware cookie-parser

const database: IDatabase = CreateDatabase("sqlite");
const server: Server = new Server();
const port: number = 3000;

server.Start(port);

// Event Handler for SIGINT (Ctrl+C in Terminal)
process.on('SIGINT', () => {
    console.log('Reçu SIGINT. Fermeture du serveur.');
    database.close();
    process.exit(0);
});
