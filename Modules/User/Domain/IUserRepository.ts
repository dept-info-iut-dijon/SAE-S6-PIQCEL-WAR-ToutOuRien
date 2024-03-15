import {IEntityRepository} from "@modules/Entity/Domain/IEntityRepository";
import {IUser} from "@modules/User/Domain/IUser";

/**
 * Represents the user repository.
 */
export interface IUserRepository extends IEntityRepository<IUser> {

}