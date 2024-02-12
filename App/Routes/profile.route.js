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
const profile_1 = require("../Controllers/profile");
const router = express_1.default.Router();

// Route for rendering the 'profile' view, with the username and email address of the user
router.get('/profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = new profile_1.Profile;
    const data = yield userProfile.getProfile(req, res);
    res.render('profile', {
        nickname: data === null || data === void 0 ? void 0 : data.Pseudo,
        email: data === null || data === void 0 ? void 0 : data.Email,
    });
}));

// Route for rendering the 'changeProfil' view
router.get('/changeProfile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('changeProfile');
}));

// Route for rendering the 'helpSupport' view
router.get('/helpSupport', (req, res) => {
    res.render('helpSupport');
});
module.exports = router;
