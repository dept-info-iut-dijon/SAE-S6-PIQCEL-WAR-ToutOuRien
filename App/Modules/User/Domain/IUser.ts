import {IEntity} from "@modules/Entity/Domain/IEntity";

/**
 * Represents the user entity.
 */
export interface IUser extends IEntity {
    Name: string;
}