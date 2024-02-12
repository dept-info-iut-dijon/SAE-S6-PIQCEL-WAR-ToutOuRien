const webServer = require('./Server/webServer');
const socketServer = require('./Server/socketServer');
const { createDatabase } = require('./App/Data/databaseChoice')

// Creating a DB Instance
const db = createDatabase("sqlite");

// Creation of the server
const server = webServer;

// Link between http server (express) and websocket server
socketServer(server);

const port = process.env.PORT || 3000;


server.listen(port, () => {
    console.log(`Serveur en cours d'écoute sur le port ${port}`);
});

// Event Handler for SIGINT (Ctrl+C in Terminal)
process.on('SIGINT', () => {
    console.log('Reçu SIGINT. Fermeture du serveur.');
    db.close();
    process.exit(0);
});