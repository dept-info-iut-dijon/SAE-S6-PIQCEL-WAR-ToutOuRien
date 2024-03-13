import {InMemoryEntityRepository} from "@modules/Entity/Infrastructure/InMemoryEntityRepository";
import {IUserRepository} from "@modules/User/Domain/IUserRepository";
import {IUser} from "@modules/User/Domain/IUser";

/**
 * Represents the in-memory user repository.
 */
export class InMemoryUserRepository extends InMemoryEntityRepository<IUser> implements IUserRepository {

}