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
        let bob: IAccount = new Account("0", "bob@gmail.com", "bob", "5e8b9a2dcc4defb76a98b87da95f13e528365b0abf1858c9d0459bb1a7597495", true)
        await this.Add(bob);
    }
}