import {IEntityRepository} from "@modules/Entity/Domain/IEntityRepository";
import {Game} from "@modules/Game/Domain/Game";

/**
 * Represents the game repository.
 */
export interface IGameRepository extends IEntityRepository<IGame> {

}