import {ISessionRepository} from "@modules/Session/Domain/ISessionRepository";
import {Session} from "@modules/Session/Domain/Session";
import {UuidProvider} from "@modules/Kernel/Application/UuidProvider";
import {UserService} from "@modules/User/Application/UserService";
import {UserNotFound} from "@modules/User/Domain/Errors/UserNotFound";

/**
 * Represents the session service.
 */
export class SessionService {
    private readonly sessionRepository: ISessionRepository;
    private readonly userService: UserService;
    private readonly uuidProvider: UuidProvider;
    private readonly tokenGenerator: UuidProvider;

    public constructor(sessionRepository: ISessionRepository, userService: UserService) {
        this.sessionRepository = sessionRepository;
        this.userService = userService;
        this.uuidProvider = new UuidProvider();
        this.tokenGenerator = new UuidProvider();
    }

    /**
     * Creates a new session.
     * @param ownerId - The owner identifier.
     * @returns The created session.
     */
    public async CreateSession(ownerId: string): Promise<Session> {
        if (await this.userService.UserDoesNotExist(ownerId))
            throw new UserNotFound();

        const identifier: string = await this.uuidProvider.GenerateUuid();
        const token: string = await this.tokenGenerator.GenerateUuid();
        const session: Session = new Session(identifier, token, new Date(), ownerId);
        await this.sessionRepository.Add(session);

        return session;
    }
}