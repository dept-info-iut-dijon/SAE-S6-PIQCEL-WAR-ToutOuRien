"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../App/Models/User");
var Account_1 = require("../App/Models/Account");
var Session_1 = require("../App/Models/Session");
describe('Test Models Classes', function () {
    var user;
    var acc;
    var session;
    beforeEach(function () {
        user = new User_1.User(1, "BADET", "Mattéo");
        acc = new Account_1.Account(1, "matteo.badet@iut-dijon.u-bourgogne.fr", "Matt", "##########", 321, user);
        session = new Session_1.Session(1, "K7pRw9q2Xs", 10022020, acc);
    });
    test('name of user should be', function () {
        expect(user.LastName).toBe('BADET');
    });
    test('email of account should be', function () {
        expect(acc.Email).toBe('matteo.badet@iut-dijon.u-bourgogne.fr');
    });
    test('token of session should be', function () {
        expect(session.Token).toBe('K7pRw9q2Xs');
    });
});
//# sourceMappingURL=TestModels.spec.js.map