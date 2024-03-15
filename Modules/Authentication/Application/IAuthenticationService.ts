import {Either} from "simply-either-ts";
import {IAccount} from "@modules/Account/Domain/IAccount";
import {UserCanNotLogin} from "@modules/Authentication/Application/Errors/UserCanNotLogin";
import {ISession} from "@modules/Session/Domain/ISession";
import {RegistrationFailed} from "@modules/Authentication/Application/Errors/RegistrationFailed";
import {ILoginDto} from "@modules/Authentication/Application/ILoginDto";

/**
 * Represents the authentication service.
 */
export interface IAuthenticationService {
    /**
     * Logs the user in.
     * @param loginDto - The login data.
     * @returns The token if the login was successful, otherwise an error.
     */
    Login(loginDto: ILoginDto): Promise<Either<string, UserCanNotLogin>>;

    /**
     * Logs the user out.
     * @param session - The session to log out.
     */
    Logout(session: ISession): Promise<void>;

    /**
     * Registers a new account.
     * @param accountDto - The account data.
     * @returns The token, otherwise an error.
     */
    Register(accountDto: IAccount): Promise<Either<string, RegistrationFailed>>;
}