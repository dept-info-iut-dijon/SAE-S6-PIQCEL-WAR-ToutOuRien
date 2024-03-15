import {IEntity} from "@modules/Entity/Domain/IEntity";

/**
 * Interface representing the session entity.
 */
export interface ISession extends IEntity {
    Token: string;
    CreationDate: Date;
    OwnerId: string;
}