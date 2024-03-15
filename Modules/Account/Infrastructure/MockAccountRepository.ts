import {InMemoryAccountRepository} from "@modules/Account/Infrastructure/InMemoryAccountRepository";
import {IAccountRepository} from "@modules/Account/Domain/IAccountRepository";
import {Account} from "@modules/Account/Domain/Account";
import {IAccount} from "@modules/Account/Domain/IAccount";

/**
 * Represents the mock account repository.
 */
export class MockAccountRepository extends InMemoryAccountRepository implements IAccountRepository {
    public constructor() {
        super();

        (async () => {
            await this.Initialize();
        })();
    }

    /**
     * Initialize the repository.
     */
    public async Initialize(): Promise<void> {
        let bob: IAccount = new Account("0", "bob@gmail.com", "bob", "$2b$10$UBrwjVWlbg4yVIR2GOYyH.Qorn7E9nkJxa2U0V6J6gTKPkxuowp4C", true)
        await this.Add(bob);
    }
}