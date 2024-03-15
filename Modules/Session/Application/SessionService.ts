import {ISessionRepository} from "@modules/Session/Domain/ISessionRepository";
import {Session} from "@modules/Session/Domain/Session";
import {UuidProvider} from "../../../Server/Infrastructure/UuidProvider";
import {ICanHash} from "@modules/Kernel/Application/ICanHash";
import {AccountService} from "@modules/Account/Application/AccountService";
import {AccountNotFound} from "@modules/Account/Domain/Errors/AccountNotFound";
import {IIdentifierGenerator} from "@modules/Kernel/Application/IIdentifierGenerator";

/**
 * Represents the session service.
 */
export class SessionService {
    private readonly sessionRepository: ISessionRepository;
    private readonly accountService: AccountService;
    private readonly identifierGenerator: IIdentifierGenerator;
    private readonly hashService: ICanHash;

    public constructor(sessionRepository: ISessionRepository, accountService: AccountService, hashService: ICanHash, identifierGenerator: IIdentifierGenerator) {
        this.sessionRepository = sessionRepository;
        this.accountService = accountService;
        this.identifierGenerator = identifierGenerator;
        this.hashService = hashService;
    }

    /**
     * Creates a new session.
     * @param ownerId - The owner identifier.
     * @returns The created session.
     */
    public async CreateSession(ownerId: string): Promise<Session> {
        let doesAccountExist = await this.accountService.DoesAccountExist(ownerId);

        if (!doesAccountExist)
            throw new AccountNotFound();

        const identifier: string = await this.identifierGenerator.GenerateIdentifier();
        const token: string = await this.hashService.Hash(identifier);
        const session: Session = new Session(identifier, token, new Date(), ownerId);
        await this.sessionRepository.Add(session);

        return session;
    }
}