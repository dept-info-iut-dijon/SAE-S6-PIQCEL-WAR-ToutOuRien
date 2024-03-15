import {IAddPixelDto} from "@modules/Game/Application/IAddPixelDto";

export interface ServerToClientEvents {
    AddPixel(addPixelDto: IAddPixelDto): void;
}