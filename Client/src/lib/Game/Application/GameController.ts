import type {IPixel} from "@modules/Pixel/Domain/IPixel";
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

    public async CreateGame(width: number, height: number): Promise<IGame> {
        return await this.gameService.CreateGame(width, height);
    }

    public async AddPixel(addPixelDto: IAddPixelDto): Promise<void> {
        await this.gameService.AddPixel(addPixelDto);
    }
}