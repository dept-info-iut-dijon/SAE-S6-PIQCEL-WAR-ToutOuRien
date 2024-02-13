"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var DatabaseChoice_1 = require("../App/Data/DatabaseChoice");
var userDAO_1 = require("../App/Models/DAO/userDAO");
var accountDAO_1 = require("../App/Models/DAO/accountDAO");
var sessionDAO_1 = require("../App/Models/DAO/sessionDAO");
var User_1 = require("../App/Models/User");
var Account_1 = require("../App/Models/Account");
var Session_1 = require("../App/Models/Session");
var database;
var userDAO;
var accountDAO;
var sessionDAO;
var userLastInsertedID;
var accountLastInsertedID;
var sessionLastInsertedID;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        database = new DatabaseChoice_1.Database();
        userDAO = new userDAO_1.UserDAO(database);
        accountDAO = new accountDAO_1.AccountDAO(database);
        sessionDAO = new sessionDAO_1.SessionDAO(database);
        database.connect();
        return [2 /*return*/];
    });
}); });
afterAll(function () {
    database.close();
});
describe('Test DAO of Models Classes : User', function () {
    test('Insert Table User', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, userReq;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User(1, 'BADET', 'Mattéo');
                    userDAO.create(user);
                    return [4 /*yield*/, userDAO.getLastInsertedID()];
                case 1:
                    userLastInsertedID = _a.sent();
                    return [4 /*yield*/, userDAO.getByID(userLastInsertedID)];
                case 2:
                    userReq = _a.sent();
                    expect(userReq).toEqual(user);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Edit Table User', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, userReq;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User(userLastInsertedID, 'BADET', 'Mattéo');
                    user.LastName = 'BADETTO';
                    userDAO.edit(user);
                    return [4 /*yield*/, userDAO.getByID(userLastInsertedID)];
                case 1:
                    userReq = _a.sent();
                    expect(userReq).toEqual(user);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Delete Table User', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, userReq;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User(userLastInsertedID, 'BADETTO', 'Mattéo');
                    userDAO.delete(user);
                    return [4 /*yield*/, userDAO.getByID(userLastInsertedID)];
                case 1:
                    userReq = _a.sent();
                    expect(userReq).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Test DAO of Models Classes : Account', function () {
    test('Insert Table Account', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, acc, accReq;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User(1, 'BADET', 'Mattéo');
                    acc = new Account_1.Account(1, 'm.badet@ymag.fr', "Matt", "#######", 321, user);
                    userDAO.create(user);
                    accountDAO.create(acc);
                    return [4 /*yield*/, userDAO.getLastInsertedID()];
                case 1:
                    userLastInsertedID = _a.sent();
                    return [4 /*yield*/, accountDAO.getLastInsertedID()];
                case 2:
                    accountLastInsertedID = _a.sent();
                    return [4 /*yield*/, accountDAO.getByID(accountLastInsertedID)];
                case 3:
                    accReq = _a.sent();
                    expect(accReq).toEqual(acc);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Edit Table Account', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, acc, accReq;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User(userLastInsertedID, 'BADET', 'Mattéo');
                    acc = new Account_1.Account(accountLastInsertedID, 'm.badet@ymag.fr', "Matt", "#######", 321, user);
                    acc.Pseudo = 'Matt21240';
                    accountDAO.edit(acc);
                    return [4 /*yield*/, accountDAO.getByID(accountLastInsertedID)];
                case 1:
                    accReq = _a.sent();
                    expect(accReq).toEqual(acc);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Delete Table Account', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, acc, accReq;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User(userLastInsertedID, 'BADETTO', 'Mattéo');
                    acc = new Account_1.Account(accountLastInsertedID, 'm.badet@ymag.fr', "Matt21240", "#######", 321, user);
                    accountDAO.delete(acc);
                    userDAO.delete(user);
                    return [4 /*yield*/, accountDAO.getByID(accountLastInsertedID)];
                case 1:
                    accReq = _a.sent();
                    expect(accReq).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Test DAO of Models Classes : Session', function () {
    test('Insert Table Account', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, acc, sess, sessReq;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User(1, 'BADET', 'Mattéo');
                    acc = new Account_1.Account(1, 'm.badet@ymag.fr', "Matt", "#######", 321, user);
                    sess = new Session_1.Session(1, "K7pRw9q2Xs", 10022020, acc);
                    userDAO.create(user);
                    accountDAO.create(acc);
                    sessionDAO.create(sess);
                    return [4 /*yield*/, userDAO.getLastInsertedID()];
                case 1:
                    userLastInsertedID = _a.sent();
                    return [4 /*yield*/, accountDAO.getLastInsertedID()];
                case 2:
                    accountLastInsertedID = _a.sent();
                    return [4 /*yield*/, sessionDAO.getLastInsertedID()];
                case 3:
                    sessionLastInsertedID = _a.sent();
                    return [4 /*yield*/, sessionDAO.getByID(sessionLastInsertedID)];
                case 4:
                    sessReq = _a.sent();
                    expect(sessReq).toEqual(sess);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Edit Table Account', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, acc, sess, sessReq;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User(userLastInsertedID, 'BADET', 'Mattéo');
                    acc = new Account_1.Account(accountLastInsertedID, 'm.badet@ymag.fr', "Matt", "#######", 321, user);
                    sess = new Session_1.Session(sessionLastInsertedID, "K7pRw9q2Xs", 10022020, acc);
                    sess.Token = 'XX_K7pRw9q2Xs_XX';
                    sessionDAO.edit(sess);
                    return [4 /*yield*/, sessionDAO.getByID(sessionLastInsertedID)];
                case 1:
                    sessReq = _a.sent();
                    expect(sessReq).toEqual(sess);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Delete Table Account', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, acc, sess, sessReq;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.User(userLastInsertedID, 'BADET', 'Mattéo');
                    acc = new Account_1.Account(accountLastInsertedID, 'm.badet@ymag.fr', "Matt", "#######", 321, user);
                    sess = new Session_1.Session(sessionLastInsertedID, "XX_K7pRw9q2Xs_XX", 10022020, acc);
                    sessionDAO.delete(sess);
                    accountDAO.delete(acc);
                    userDAO.delete(user);
                    return [4 /*yield*/, sessionDAO.getByID(sessionLastInsertedID)];
                case 1:
                    sessReq = _a.sent();
                    expect(sessReq).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=TestModelsDAO.spec.js.map