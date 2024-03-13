import {Entity} from "@modules/Entity/Domain/Entity";
import {IUser} from "@modules/User/Domain/IUser";

/**
 * Represents a user.
 */
export class User extends Entity implements IUser {
    private readonly name: string;

    public constructor(identifier: string, name: string) {
        super(identifier);
        this.name = name;
    }

    public get Name(): string { return this.name; }
}