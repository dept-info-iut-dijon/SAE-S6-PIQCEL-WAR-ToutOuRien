import ioClient, { Socket } from 'socket.io-client';

/**
 * Manages socket communication.
 */
export class SocketManager {
    private readonly socket: Socket;

    public constructor(address: string) {
        this.socket = ioClient(address);
    }

    /**
     * Handles an event by emitting its data to the server.
     * @param eventName - The name of the event.
     * @param data - The data to emit.
     */
    public HandleEvent(eventName: string, data: any): void {
        this.socket.emit(eventName, data);
    }
}