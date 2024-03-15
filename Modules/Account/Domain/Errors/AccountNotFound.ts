import {EntityNotFound} from "@modules/Entity/Domain/Errors/EntityNotFound";

export class AccountNotFound extends EntityNotFound {
    public constructor() {
        super("Account");
    }
}