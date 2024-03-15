import {InMemoryEntityRepository} from "@modules/Entity/Infrastructure/InMemoryEntityRepository";
import {ISessionRepository} from "@modules/Session/Domain/ISessionRepository";
import {ISession} from "@modules/Session/Domain/ISession";

/**
 * Represents the in-memory session repository.
 */
export class InMemorySessionRepository extends InMemoryEntityRepository<ISession> implements ISessionRepository {

}