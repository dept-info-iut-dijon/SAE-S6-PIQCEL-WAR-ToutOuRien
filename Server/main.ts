import {CreateDatabase} from "../App/Data/DatabaseChoice";
import {Server} from "./Server";
import {IDatabase} from "../App/Data/IDatabase";
import {GameController} from "./Application/Controllers/GameController";
import {IGameService} from "@modules/Game/Application/IGameService";
import {GameService} from "./Application/Services/GameService";
import {IGameRepository} from "@modules/Game/Domain/IGameRepository";
import {InMemoryGameRepository} from "@modules/Game/Infrastructure/InMemoryGameRepository";
import {UserService} from "@modules/User/Application/UserService";
import {InMemoryUserRepository} from "@modules/User/Infrastructure/InMemoryUserRepository";
import {IUserRepository} from "@modules/User/Domain/IUserRepository";
import {InMemoryPixelRepository} from "@modules/Pixel/Infrastructure/InMemoryPixelRepository";
import {IPixelRepository} from "@modules/Pixel/Domain/IPixelRepository";

const server: Server = new Server();
const pixelRepository: IPixelRepository = new InMemoryPixelRepository();

const userRepository: IUserRepository = new InMemoryUserRepository();
const userService: UserService = new UserService(userRepository);

const gameRepository: IGameRepository = new InMemoryGameRepository();
export const gameService: IGameService = new GameService(gameRepository, userService, pixelRepository);
const gameController: GameController = new GameController(gameService);
gameController.InitialiseRoutes(server.Router);

const port: number = 3000;

server.Start(port);

// Event Handler for SIGINT (Ctrl+C in Terminal)
process.on('SIGINT', () => {
    console.log('Reçu SIGINT. Fermeture du serveur.');
    process.exit(0);
});