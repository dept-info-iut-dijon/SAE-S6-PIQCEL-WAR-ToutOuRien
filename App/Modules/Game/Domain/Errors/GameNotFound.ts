import {EntityNotFound} from "@modules/Entity/Domain/Errors/EntityNotFound";

/**
 * Error thrown when a user is not found.
 */
export class GameNotFound extends EntityNotFound {
    public constructor() {
        super("Game");
    }
}