import {Server} from "./Server";
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
import {BCryptHashService} from "./Infrastructure/BCryptHashService";
import {AuthenticationController} from "./Application/Controllers/AuthenticationController";
import {IAuthenticationService} from "@modules/Authentication/Application/IAuthenticationService";
import {AuthenticationService} from "./Application/Services/AuthenticationService";
import {AccountService} from "@modules/Account/Application/AccountService";
import {IAccountRepository} from "@modules/Account/Domain/IAccountRepository";
import {ICanHash} from "@modules/Kernel/Application/ICanHash";
import {SessionService} from "@modules/Session/Application/SessionService";
import {InMemoryAccountRepository} from "@modules/Account/Infrastructure/InMemoryAccountRepository";
import {ISessionRepository} from "@modules/Session/Domain/ISessionRepository";
import {InMemorySessionRepository} from "@modules/Session/Infrastructure/InMemorySessionRepository";
import {UuidProvider} from "./Infrastructure/UuidProvider";
import {IIdentifierGenerator} from "@modules/Kernel/Application/IIdentifierGenerator";
import {MockAccountRepository} from "@modules/Account/Infrastructure/MockAccountRepository";

/** Dependency Injection Area */
const server: Server = new Server();

const hashService: ICanHash = new BCryptHashService();
const identifierGenerator: IIdentifierGenerator = new UuidProvider();

export const accountRepository: IAccountRepository = new MockAccountRepository();
const accountService: AccountService = new AccountService(hashService, accountRepository, identifierGenerator);

const pixelRepository: IPixelRepository = new InMemoryPixelRepository();

const userRepository: IUserRepository = new InMemoryUserRepository();
const userService: UserService = new UserService(userRepository);

const gameRepository: IGameRepository = new InMemoryGameRepository();
export const gameService: IGameService = new GameService(gameRepository, accountService, pixelRepository, identifierGenerator);
const gameController: GameController = new GameController(gameService);
gameController.InitialiseRoutes(server.Router);

export const sessionRepository: ISessionRepository = new InMemorySessionRepository();
const sessionProvider: SessionService = new SessionService(sessionRepository, accountService, hashService, identifierGenerator);

const authenticationService: IAuthenticationService = new AuthenticationService(accountService, accountRepository, hashService, sessionProvider);
const authenticationController: AuthenticationController = new AuthenticationController(authenticationService);
authenticationController.InitialiseRoutes(server.Router);
/** End of Dependency Injection Area */

const port: number = 3000;

server.Start(port);

// Event Handler for SIGINT (Ctrl+C in Terminal)
process.on('SIGINT', () => {
    console.log('Reçu SIGINT. Fermeture du serveur.');
    process.exit(0);
});