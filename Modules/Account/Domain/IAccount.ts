import {IEntity} from "@modules/Entity/Domain/IEntity";
import {IUser} from "@modules/User/Domain/IUser";

/**
 * Represents an account in the system.
 */
export interface IAccount extends IEntity {
    Email: string;
    IsEmailConfirmed: boolean;
    Pseudo: string;
    Password: string;
}