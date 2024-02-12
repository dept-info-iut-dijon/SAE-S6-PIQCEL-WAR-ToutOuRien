"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const authentification_1 = require("../Controllers/authentification");
const router = express_1.default.Router();
const authController = new authentification_1.Authentification();
// Route for rendering the 'index' view
router.get('/', (req, res) => {
    console.log(__dirname);
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
router.get('/code', (req, res) => {
    res.render('code');
});
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
router.get('/profil', (req, res) => {
    res.render('profil');
});
// Route for rendering the 'changeProfil' view
router.get('/changeProfile', (req, res) => {
    res.render('changeProfile');
});
// Route for rendering the 'helpSupport' view
router.get('/helpSupport', (req, res) => {
    res.render('helpSupport');
});
module.exports = router;
