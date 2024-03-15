import {IEntityRepository} from "@modules/Entity/Domain/IEntityRepository";
import {IGame} from "@modules/Game/Domain/IGame";

/**
 * Represents the game repository.
 */
export interface IGameRepository extends IEntityRepository<IGame> {

}