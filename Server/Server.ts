import express, { Express } from "express";
import { createServer } from "node:http";
import { Server as SocketServer } from "socket.io";
import * as expressHbs from 'express-handlebars';
import bodyParser from "body-parser";
import cors from "cors";
import {ApplicationEvents} from "@modules/Events/ApplicationEvents";
import {IAddPixelDto} from "@modules/Game/Application/IAddPixelDto";
import {gameService} from "./main";
import * as console from "console";

/**
 * Represents a server that handles HTTP and WebSocket connections.
 * Legacy code from the previous project refactored to TypeScript ESM and OOP.
 * @author @Louis-Duboz
 */
export class Server {
    private readonly expressServer: Express;

    /**
     * Initializes a new instance of the Server class.
     * @author @Louis-Duboz
     */
    public constructor() {
        this.expressServer = express();
        this.InitialiseExpress();
    }

    public get Router(): Express { return this.expressServer; }

    /**
     * Starts the server on the specified port.
     * @param port The port number to listen on.
     * @author @Louis-Duboz
     */
    public Start(port: number) {
        const httpServer = createServer(this.expressServer);
        this.InitialiseSocketIo(httpServer); // Pass the httpServer to InitialiseSocketIo
        httpServer.listen(port, () => {
            console.log(`Le serveur écoute sur le port ${port}`);
        });
    }

    /**
     * Initializes the Express server with middleware and settings.
     * @author @Louis-Duboz
     * @private
     */
    private InitialiseExpress(): void {
        this.expressServer.use(cors({
            origin: "http://localhost:5173"
        }));
        this.expressServer.use(bodyParser.json());
        this.expressServer.use(express.static('./Public')); // Public static root.
        this.expressServer.engine('hbs', expressHbs.engine( // Template engine
            {
                extname: "hbs",
                defaultLayout: "",
                layoutsDir: "",
            }
        ));
        this.expressServer.use(express.static('./Public')); // Public static root.
        this.expressServer.set("view engine", "hbs");
        this.expressServer.set("views", "./Public/Views");
    }

    /**
    * Initializes the Socket.IO server and handles WebSocket connections.
    * @author @Louis-Duboz
    * @private
    */
    private InitialiseSocketIo(httpServer: any): void {
        const socketIo = new SocketServer<ApplicationEvents>(httpServer, {
        cors: {
              origin: "http://localhost:5173",
              methods: ["GET", "POST"],
              allowedHeaders: ["session"],
              credentials: true
            }
        });

        console.log('Liaison entre le serveur Web et le serveur de WebSocket...');

        try {
            socketIo.on('connection', async (socket: any) => {
                console.log('User connected');

                socket.on('AddPixel', async (addPixelDto: IAddPixelDto) => {
                    await gameService.AddPixel(addPixelDto, true);
                    socketIo.emit("AddPixel", addPixelDto);
                });

                socket.on('disconnect', () => {
                    console.log('User disconnected');
                });
            });
        } catch (error) {
            console.log(error)
        }
    }
}