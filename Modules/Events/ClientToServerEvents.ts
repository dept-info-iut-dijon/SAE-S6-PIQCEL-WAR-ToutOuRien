import {IAddPixelDto} from "@modules/Game/Application/IAddPixelDto";

export interface ClientToServerEvents {
    AddPixel(addPixelDto: IAddPixelDto): void;
}