import {IEntity} from "@modules/Entity/Domain/IEntity";

/**
 * Represents the game entity.
 */
export interface IGame extends IEntity {
    Width: number;
    Height: number;
}