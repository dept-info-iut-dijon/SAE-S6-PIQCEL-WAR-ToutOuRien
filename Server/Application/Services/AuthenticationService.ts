import {IAccount} from "@modules/Account/Domain/IAccount";
import {AccountService} from "@modules/Account/Application/AccountService";
import {IAccountRepository} from "@modules/Account/Domain/IAccountRepository";
import {ICanHash} from "@modules/Kernel/Application/ICanHash";
import {Either, Failure, Success} from "simply-either-ts";
import {UserCanNotLogin} from "@modules/Authentication/Application/Errors/UserCanNotLogin";
import {RegistrationFailed} from "@modules/Authentication/Application/Errors/RegistrationFailed";
import {ISession} from "@modules/Session/Domain/ISession";
import {IAuthenticationService} from "@modules/Authentication/Application/IAuthenticationService";
import {ILoginDto} from "@modules/Authentication/Application/ILoginDto";
import {SessionService} from "@modules/Session/Application/SessionService";

/**
 * Represents the authentication service.
 */
export class AuthenticationService implements IAuthenticationService {
    private accountService: AccountService;
    private accountRepository: IAccountRepository;
    private sessionProvider: SessionService;

    private canHash: ICanHash;

    public constructor(accountService: AccountService, accountRepository: IAccountRepository, canHash: ICanHash, sessionProvider: SessionService) {
        this.accountService = accountService;
        this.accountRepository = accountRepository;
        this.sessionProvider = sessionProvider;
        this.canHash = canHash;
    }

    public async Login(loginDto: ILoginDto): Promise<Either<string, UserCanNotLogin>> {
        console.log(loginDto.Password)
        let hashedPassword: string = await this.canHash.Hash(loginDto.Password);

        let result = await this.accountRepository.FindOneWhere(
            (account: IAccount) => (account.Email === loginDto.Identifier || account.Pseudo == loginDto.Identifier)
            && account.Password === hashedPassword
        );

        if (result.IsFailure)
            return Failure(new UserCanNotLogin());

        let account: IAccount = result.Success;
        let session: ISession = await this.sessionProvider.CreateSession(account.Identifier);
        return Success(session.Token);
    }

    public async Logout(session: ISession): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async Register(accountDto: IAccount): Promise<Either<string, RegistrationFailed>> {
        let result = await this.accountService.CreateAccount(accountDto);

        if (result.IsFailure)
            return Failure(new RegistrationFailed());

        let account: IAccount = result.Success;
        let session: ISession = await this.sessionProvider.CreateSession(account.Identifier);

        return Success(session.Token);
    }
}