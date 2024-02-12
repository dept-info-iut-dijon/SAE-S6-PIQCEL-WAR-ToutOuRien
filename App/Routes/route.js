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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const authentification_1 = require("../Controllers/authentification");
const profile_1 = require("../Controllers/profile");
const router = express_1.default.Router();
const authController = new authentification_1.Authentification();
const profileController = new profile_1.Profile();
// Route for rendering the 'index' view
router.get('/', (req, res) => {
    res.render('index');
});
// Route for rendering the 'login' view
router.get('/login', (req, res) => {
    res.render('login');
});
// Route for handling POST request for user login
router.post('/login', (req, res) => {
    authController.postlogin(req, res);
});
// Route for rendering the 'signup' view
router.get('/signup', (req, res) => {
    res.render('signup');
});
// Route for handling POST request for user signup
router.post('/signup', (req, res) => {
    authController.postsignup(req, res);
});
// Route for rendering the 'code' view
router.get('/code', (req, res) => {
    res.render('code');
});
// Route for handling POST request for the code
router.post('/code', (req, res) => {
    if (authController.isAccessCodeValid(req.body['confirmationCode'])) {
        res.status(200).json({
            success: true
        });
    }
    else {
        res.status(500).json({
            fail: true
        });
    }
});
// Route for rendering the 'profile' view
router.get('/profil', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield profileController.getProfile(req, res);
    res.render('profil', { profileData: res.locals.profileData });
}));
// Route for rendering the 'changeProfil' view
router.get('/changeProfile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield profileController.getProfile(req, res);
    res.render('changeProfile', { profileData: res.locals.profileData });
}));
module.exports = router;
