import {IEntity} from "@modules/Entity/Domain/IEntity";

export interface IGame extends IEntity {
    Width: number;
    Height: number;
}