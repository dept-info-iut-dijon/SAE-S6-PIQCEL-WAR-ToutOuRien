import {IPixel} from "@modules/Pixel/Domain/IPixel";

/**
 * Represents the add pixel DTO.
 */
export interface IAddPixelDto {
    GameId: string;
    X: number;
    Y: number;
    Color: string;
    OwnerId: string;
}