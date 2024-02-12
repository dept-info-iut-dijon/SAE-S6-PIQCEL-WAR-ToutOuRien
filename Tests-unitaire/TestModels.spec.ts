import { User } from "../App/Models/user";
import { Account } from "../App/Models/account";
import { Session } from "../App/Models/session";

describe ('Test Models Classes', () => {

    let user: User;
    let acc: Account;
    let session: Session;

    beforeEach(() => {
        user = new User(1, "BADET", "Mattéo");
        acc = new Account(1, "matteo.badet@iut-dijon.u-bourgogne.fr", "Matt", "##########", 321, user);
        session = new Session(1, "K7pRw9q2Xs", 10022020, acc);
    });

    test('name of user should be', () => {
        expect(user.LastName).toBe('BADET');
    });
    test('email of account should be', () => {
        expect(acc.Email).toBe('matteo.badet@iut-dijon.u-bourgogne.fr');
    });
    test('token of session should be', () => {
        expect(session.Token).toBe('K7pRw9q2Xs');
    });
});