import ioClient, { Socket } from 'socket.io-client';

/**
 * Manages socket communication.
 */
export class SocketManager {
    private readonly socket: Socket;

    public constructor(address: string) {
        this.socket = ioClient(address, {
            withCredentials: true,
            extraHeaders: {
                "session": "abcd"
            }
        });
    }

    /**
     * Handles an event by emitting its data to the server.
     * @param eventName - The name of the event.
     * @param data - The data to emit.
     */
    public HandleEvent(eventName: string, data: any): void {
        this.socket.emit(eventName, data);
    }

    /**
     * Listens for an event and calls the callback when the event is received.
     * @param eventName - The name of the event.
     * @param callback - The callback to call when the event is received.
     */
    public ListenForEvent(eventName: string, callback: (data: any) => void): void {
        this.socket.on(eventName, callback);
    }
}