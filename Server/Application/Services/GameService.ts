import {IPixelRepository} from "@modules/Pixel/Domain/IPixelRepository";
import {IPixel} from "@modules/Pixel/Domain/IPixel";
import {IGameRepository} from "@modules/Game/Domain/IGameRepository";
import {Game} from "@modules/Game/Domain/Game";
import {IGameService} from "@modules/Game/Application/IGameService";
import {UuidProvider} from "../../Infrastructure/UuidProvider";
import {IGame} from "@modules/Game/Domain/IGame";
import {IAddPixelDto} from "@modules/Game/Application/IAddPixelDto";
import {EntityNotFound} from "@modules/Entity/Domain/Errors/EntityNotFound";
import {Pixel} from "@modules/Pixel/Domain/Pixel";
import {AccountService} from "@modules/Account/Application/AccountService";
import {IIdentifierGenerator} from "@modules/Kernel/Application/IIdentifierGenerator";

/**
 * Represents the game service.
 */
export class GameService implements IGameService {
    private gameRepository: IGameRepository;
    private accountService: AccountService;
    private pixelRepository: IPixelRepository;
    private identifierGenerator: IIdentifierGenerator;

    public constructor(gameRepository: IGameRepository, accountService: AccountService, pixelRepository: IPixelRepository, identifierProvider: IIdentifierGenerator) {
        this.gameRepository = gameRepository;
        this.accountService = accountService;
        this.pixelRepository = pixelRepository;
        this.identifierGenerator = identifierProvider;
    }

    public async CreateGame(width: number, height: number): Promise<IGame> {
        let doesAGameExist = await this.gameRepository.FindAll();
        let game: IGame;

        if (doesAGameExist.length > 1) {
            game = doesAGameExist[0];
        } else {
            let identifier: string = await this.identifierGenerator.GenerateIdentifier();
            game = new Game(identifier, width, height);
            await this.gameRepository.Add(game);
        }

        return game;
    }

    public async AddPixel(addPixelDto: IAddPixelDto): Promise<void> {
        let result = await this.gameRepository.FindByIdentifier(addPixelDto.GameId);

        if (result.IsFailure)
            throw new EntityNotFound("Game");

        let game: Game = result.Success as Game;
        let pixel: IPixel = Pixel.Create(addPixelDto.X, addPixelDto.Y, addPixelDto.Color, addPixelDto.OwnerId);

        await this.pixelRepository.Add(pixel);

        game.AddPixel(pixel);
    }
}