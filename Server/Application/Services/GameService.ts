import {IPixelRepository} from "@modules/Pixel/Domain/IPixelRepository";
import {IPixel} from "@modules/Pixel/Domain/IPixel";
import {IGameRepository} from "@modules/Game/Domain/IGameRepository";
import {Game} from "@modules/Game/Domain/Game";
import {GameNotFound} from "@modules/Game/Domain/Errors/GameNotFound";
import {UserService} from "@modules/User/Application/UserService";
import {UserNotFound} from "@modules/User/Domain/Errors/UserNotFound";
import {IGameService} from "@modules/Game/Application/IGameService";
import {UuidProvider} from "@modules/Kernel/Application/UuidProvider";
import {IGame} from "@modules/Game/Domain/IGame";
import {IAddPixelDto} from "@modules/Game/Application/IAddPixelDto";
import {EntityNotFound} from "@modules/Entity/Domain/Errors/EntityNotFound";
import {Pixel} from "@modules/Pixel/Domain/Pixel";

export class GameService implements IGameService {
    private gameRepository: IGameRepository;
    private userService: UserService;
    private pixelRepository: IPixelRepository;
    private identifierProvider: UuidProvider;

    public constructor(gameRepository: IGameRepository, userService: UserService, pixelRepository: IPixelRepository) {
        this.gameRepository = gameRepository;
        this.userService = userService;
        this.pixelRepository = pixelRepository;
        this.identifierProvider = new UuidProvider();
    }

    public async CreateGame(width: number, height: number): Promise<IGame> {
        let doesAGameExist = await this.gameRepository.FindAll();
        let game: IGame;

        if (doesAGameExist.length > 1) {
            game = doesAGameExist[0];
        } else {
            let identifier: string = await this.identifierProvider.GenerateUuid();
            game = new Game(identifier, width, height);
            await this.gameRepository.Add(game);
        }

        return game;
    }

    public async AddPixel(addPixelDto: IAddPixelDto): Promise<void> {
        let result = await this.gameRepository.FindByIdentifier(addPixelDto.GameId);

        if (result.IsFailure)
            throw new EntityNotFound("Game");

        let game: Game;
        game = result.Success;
        let pixel: IPixel = Pixel.Create(addPixelDto.X, addPixelDto.Y, addPixelDto.Color, addPixelDto.OwnerId);

        await this.pixelRepository.Add(pixel);

        game.AddPixel(pixel);
    }
}