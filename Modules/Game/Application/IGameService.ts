import {IGame} from "@modules/Game/Domain/IGame";
import {IAddPixelDto} from "@modules/Game/Application/IAddPixelDto";

/**
 * Represents the game service.
 */
export interface IGameService {
    /**
     * Creates a new game.
     * @param width - The width of the game.
     * @param height - The height of the game.
     */
    CreateGame(width: number, height: number): Promise<IGame>;

    /**
     * Adds a pixel to the game.
     * @param addPixelDto - The add pixel DTO.
     * @param save - Whether to save the pixel.
     */
    AddPixel(addPixelDto: IAddPixelDto, save: boolean): Promise<void>;
}