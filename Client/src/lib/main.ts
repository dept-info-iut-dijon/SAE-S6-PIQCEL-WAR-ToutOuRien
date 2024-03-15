import {SocketManager} from "$lib/SocketIo/SocketManager";
import {GameController} from "$lib/Game/Application/GameController";
import type {IGameService} from "@modules/Game/Application/IGameService";
import {GameService} from "$lib/Game/Application/GameService";
import type {IGameRepository} from "@modules/Game/Domain/IGameRepository";
import {InMemoryGameRepository} from "@modules/Game/Infrastructure/InMemoryGameRepository";
import {InMemoryPixelRepository} from "@modules/Pixel/Infrastructure/InMemoryPixelRepository";
import type {IPixelRepository} from "@modules/Pixel/Domain/IPixelRepository";

export const socketManager: SocketManager = new SocketManager("http://localhost:3000");

const pixelRepository: IPixelRepository = new InMemoryPixelRepository();

export const gameRepository: IGameRepository = new InMemoryGameRepository();
const gameService: IGameService = new GameService(socketManager, gameRepository, pixelRepository);
export const gameController: GameController = new GameController(gameService);