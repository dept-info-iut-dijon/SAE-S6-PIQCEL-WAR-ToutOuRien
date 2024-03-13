import {InMemoryUserRepository} from "@modules/User/Infrastructure/InMemoryUserRepository";
import {User} from "@modules/User/Domain/User";

export class MockUserRepository extends InMemoryUserRepository {
    public constructor() {
        super();

        this.Add(new User("0", "mega-cube"));
    }
}