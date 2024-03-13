import {Entity} from "@modules/Entity/Domain/Entity";
import {ISession} from "@modules/Session/Domain/ISession";

/**
 * Represents the session entity.
 */
export class Session extends Entity implements ISession {
    private readonly token: string;
    private readonly creationDate: Date;
    private readonly ownerId: string;

    public constructor(identifier: string, token: string, creationDate: Date, ownerId: string) {
        super(identifier);
        this.token = token;
        this.creationDate = creationDate;
        this.ownerId = ownerId;
    }

    public get Token(): string { return this.token; }
    public get CreationDate(): Date { return this.creationDate; }
    public get OwnerId(): string { return this.ownerId; }
}