import {InMemoryEntityRepository} from "@modules/Entity/Infrastructure/InMemoryEntityRepository";
import {IAccount} from "@modules/Account/Domain/IAccount";
import {IAccountRepository} from "@modules/Account/Domain/IAccountRepository";

/**
 * Represents the in-memory account repository.
 */
export class InMemoryAccountRepository extends InMemoryEntityRepository<IAccount> implements IAccountRepository {

}