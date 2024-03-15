import {Entity} from "@modules/Entity/Domain/Entity";
import {IAccount} from "@modules/Account/Domain/IAccount";
import {ExposeProperties} from "@modules/Kernel/Decorators/ExposeProperties";

/**
 * Represents an account in the system.
 */
@ExposeProperties()
export class Account extends Entity implements IAccount {
    private email: string;
    private isEmailConfirmed: boolean;
    private password: string;
    private pseudo: string;

    constructor(identifier: string, email: string, pseudo: string, password: string, isEmailConfirmed: boolean) {
        super(identifier);
        this.email = email;
        this.pseudo = pseudo;
        this.password = password;
        this.isEmailConfirmed = isEmailConfirmed;
    }

    public get Email(): string { return this.email; }
    public set Email(value: string) { this.email = value; }
    public get Pseudo(): string { return this.pseudo; }
    public set Pseudo(value: string) { this.pseudo = value; }
    public get Password(): string { return this.password; }
    public set Password(value: string) { this.password = value; }
    public get IsEmailConfirmed(): boolean { return this.isEmailConfirmed; }
    public set IsEmailConfirmed(value: boolean) { this.isEmailConfirmed = value; }
}