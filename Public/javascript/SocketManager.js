import { io } from "./Libraries/socket.io.esm.min.js";
/**
 * Manages socket communication for pixel changes.
 * @class
 */
class SocketManager {
    socket;
    get Socket() {
        return this.socket;
    }
    /**
     * Constructs a SocketManager instance.
     * @constructor
     * @param {Socket} socket - The socket object for communication.
     */
    constructor(socket) {
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
    sendPixelChange(x, y, color, user) {
        this.socket.emit("pixelChange", { xCoordinate: x, yCoordinate: y, pixelColor: color, userTarget: user });
    }
}
const socket = io();
const socketManager = new SocketManager(socket);
// Export the socketManager object
export { socketManager };
//# sourceMappingURL=SocketManager.js.map