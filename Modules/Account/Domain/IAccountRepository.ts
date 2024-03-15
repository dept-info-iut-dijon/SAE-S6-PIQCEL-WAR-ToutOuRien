import {IEntityRepository} from "@modules/Entity/Domain/IEntityRepository";
import {IAccount} from "@modules/Account/Domain/IAccount";

/**
 * Represents the account repository.
 */
export interface IAccountRepository extends IEntityRepository<IAccount> {

}