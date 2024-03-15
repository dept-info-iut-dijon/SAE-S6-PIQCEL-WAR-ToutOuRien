import type {IGameService} from "@modules/Game/Application/IGameService";
import type {IGame} from "@modules/Game/Domain/IGame";
import type {IAddPixelDto} from "@modules/Game/Application/IAddPixelDto";

/**
 * Represents the game controller.
 */
export class GameController {
    private readonly gameService: IGameService;

    public constructor(gameService: IGameService) {
        this.gameService = gameService;
    }

    /**
     * Creates a new game.
     * @param width - The width of the game.
     * @param height - The height of the game.
     */
    public async CreateGame(width: number, height: number): Promise<IGame> {
        return await this.gameService.CreateGame(width, height);
    }

    /**
     * Adds a pixel to the game.
     * @param addPixelDto - The pixel to add.
     */
    public async AddPixel(addPixelDto: IAddPixelDto): Promise<void> {
        await this.gameService.AddPixel(addPixelDto, true);
    }
}