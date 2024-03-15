import {Entity} from "@modules/Entity/Domain/Entity";
import {IUser} from "@modules/User/Domain/IUser";
import {ExposeProperties} from "@modules/Kernel/Decorators/ExposeProperties";

/**
 * Represents a user.
 */
@ExposeProperties()
export class User extends Entity implements IUser {
    private firstName: string;
    private lastName: string;

    public constructor(identifier: string, firstName: string, lastName: string) {
        super(identifier);
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public get FirstName(): string { return this.firstName; }
    public set FirstName(value: string) { this.firstName = value; }
    public get LastName(): string { return this.lastName; }
    public set LastName(value: string) { this.lastName = value; }
}