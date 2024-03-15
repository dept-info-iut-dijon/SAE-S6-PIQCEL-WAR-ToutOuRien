import {IEntity} from "@modules/Entity/Domain/IEntity";

/**
 * Interface for a Pixel
 */
export interface IPixel extends IEntity {
    X: number;
    Y: number;
    Color: string;
    Date: Date;
    OwnerId: string;
}