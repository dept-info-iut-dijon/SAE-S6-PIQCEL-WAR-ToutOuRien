import {InMemoryEntityRepository} from "@modules/Entity/Infrastructure/InMemoryEntityRepository";
import {Game} from "@modules/Game/Domain/Game";
import {IGameRepository} from "@modules/Game/Domain/IGameRepository";

/**
 * Represents the in-memory game repository.
 */
export class InMemoryGameRepository extends InMemoryEntityRepository<Game> implements IGameRepository {

}