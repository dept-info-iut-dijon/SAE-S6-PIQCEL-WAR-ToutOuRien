import {SocketManager} from "$lib/SocketIo/SocketManager";

export const socketHandler: SocketManager = new SocketManager("http://localhost:3000");