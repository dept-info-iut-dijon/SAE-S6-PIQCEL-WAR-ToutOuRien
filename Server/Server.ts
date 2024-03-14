import express, { Express } from "express";
import { createServer } from "node:http";
import { router } from "../App/Routes/route";
import { SocketHandler } from "../App/Controllers/socketHandler";
import { Server as SocketServer } from "socket.io";
import * as expressHbs from 'express-handlebars';
import bodyParser from "body-parser";
import cors from "cors";
import {ApplicationEvents} from "../App/ApplicationEvents";
import {IAddPixelDto} from "@modules/Game/Application/IAddPixelDto";
import {gameController} from "../Client/src/lib/main";
import {gameService} from "./main";
import * as console from "console";

export const SERVER = Symbol("SERVER");

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
            console.log(`Server listening on port ${port}`);
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
        this.expressServer.use(router);
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

      const handler = new SocketHandler();
      handler.initGrid();

      console.log('Liaison entre le serveur Web et le serveur de WebSocket ...');

      socketIo.on('connection', async (socket: any) => {
          console.log('a user connected');
          let grid = await handler.getAllPixels();
          socket.emit('initGrid', grid);

          socket.on('AddPixel', (addPixelDto: IAddPixelDto) => {
              console.log(addPixelDto);
              console.log(`Pixel change at [ ${addPixelDto.X} ; ${addPixelDto.Y} ]`)
              socketIo.emit("AddPixel", addPixelDto);
              gameService.AddPixel(addPixelDto);
          });

          socket.on('disconnect', () => {
              console.log('user disconnected');
          });
    });
  }
}