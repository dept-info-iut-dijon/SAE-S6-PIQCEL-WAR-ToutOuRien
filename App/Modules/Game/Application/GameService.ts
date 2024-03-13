import {IPixelRepository} from "@modules/Pixel/Domain/IPixelRepository";
import {IPixel} from "@modules/Pixel/Domain/IPixel";
import {IGameRepository} from "@modules/Game/Domain/IGameRepository";
import {Game} from "@modules/Game/Domain/Game";
import {GameNotFound} from "@modules/Game/Domain/Errors/GameNotFound";
import {UserService} from "@modules/User/Application/UserService";
import {UserNotFound} from "@modules/User/Domain/Errors/UserNotFound";

export class GameService {
    private gameRepository: IGameRepository;
    private userService: UserService;
    private pixelRepository: IPixelRepository;

    public constructor(gameRepository: IGameRepository, userService: UserService, pixelRepository: IPixelRepository) {
        this.gameRepository = gameRepository;
        this.userService = userService;
        this.pixelRepository = pixelRepository;
    }

    public async AddPixel(gameId: string, pixel: IPixel): Promise<void> {
        if (await this.userService.UserDoesNotExist(pixel.OwnerId))
            throw new UserNotFound();

        const result = await this.gameRepository.FindByIdentifier(gameId);

        if (result.IsFailure)
            throw new GameNotFound();

        const game: Game = result.Success;
        await this.pixelRepository.Add(pixel);
        game.AddPixel(pixel);
    }
}