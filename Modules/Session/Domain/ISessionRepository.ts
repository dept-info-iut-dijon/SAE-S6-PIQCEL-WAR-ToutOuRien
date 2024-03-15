import {IEntityRepository} from "@modules/Entity/Domain/IEntityRepository";
import {ISession} from "@modules/Session/Domain/ISession";

/**
 * Interface of the session repository
 */
export interface ISessionRepository extends IEntityRepository<ISession> {

}