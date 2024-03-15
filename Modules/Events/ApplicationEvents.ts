import {IAddPixelDto} from "@modules/Game/Application/IAddPixelDto";

/**
 * Represents the events that can be raised by the application.
 */
export interface ApplicationEvents {
    AddPixel(addPixelDto: IAddPixelDto): void;
}