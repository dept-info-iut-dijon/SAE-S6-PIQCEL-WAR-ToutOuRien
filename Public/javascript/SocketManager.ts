import { io, Socket } from "socket.io-client";

/**
 * Manages socket communication for pixel changes.
 * @class
 */
class SocketManager {
    private socket: Socket;

    public get Socket():Socket {
        return this.socket;
    }

    /**
     * Constructs a SocketManager instance.
     * @constructor
     * @param {Socket} socket - The socket object for communication.
     */
    constructor(socket: Socket) {
        this.socket = socket;
    }

    /**
     * Sends a pixel change event to the server.
     * @public
     * @param {number} x - The x-coordinate of the pixel.
     * @param {number} y - The y-coordinate of the pixel.
     * @param {string} color - The color of the pixel.
     * @param {number} user - The target user for the pixel change.
     */
    public sendPixelChange(x: number, y: number, color: string, user: number): void {
        this.socket.emit("pixelChange", { xCoordinate: x, yCoordinate: y, pixelColor: color, userTarget: user });
    }
}

/**
 * The socket object for communication.
 * @type {Socket}
 */
const socket: Socket = io();

/**
 * The SocketManager instance for managing socket communication.
 * @type {SocketManager}
 */
const socketManager: SocketManager = new SocketManager(socket);

// Export the socketManager object
export { socketManager };
