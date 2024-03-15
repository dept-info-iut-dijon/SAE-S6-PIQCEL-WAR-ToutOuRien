import {IUserRepository} from "@modules/User/Domain/IUserRepository";
import {IUser} from "@modules/User/Domain/IUser";

/**
 * Represents the user service.
 */
export class UserService {
    private userRepository: IUserRepository;

    public constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Checks if a user exists.
     * @param userId - The user identifier.
     * @returns True if the user exists, otherwise false.
     */
    public async UserExists(userId: string): Promise<boolean> {
        let userExists: boolean = false;
        let result = await this.userRepository.FindByIdentifier(userId);
        if (result.IsSuccess)
            userExists = true;
        return userExists;
    }

    /**
     * Checks if a user does not exist.
     * @param userId - The user identifier.
     * @returns True if the user does not exist, otherwise false.
     */
    public async UserDoesNotExist(userId: string): Promise<boolean> {
        return !await this.UserExists(userId);
    }

    /**
     * Creates a user.
     * @param user - The user to create.
     */
    public async CreateUser(user: IUser): Promise<void> {
        this.userRepository.Add(user);
    }
}