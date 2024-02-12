"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash = void 0;
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
/**
 * A utility class for hashing passwords, verifying passwords, and generating salts.
 */
class Hash {
    /**
     * Hashes a given plain text password using bcrypt with a generated salt.
     *
     * @param password - The plain text password to hash.
     * @returns A promise that resolves to the hashed password.
     */
    static hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt.genSalt(10);
            const hashedPassword = yield bcrypt.hash(password, salt);
            return hashedPassword;
        });
    }
    /**
     * Compares a plain text password with a hashed password to check if they match.
     *
     * @param inputPassword - The plain text password to compare.
     * @param hashedPassword - The hashed password to compare against.
     * @returns A promise that resolves to true if the passwords match, false otherwise.
     */
    static comparePassword(inputPassword, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.compare(inputPassword, hashedPassword);
        });
    }
    /**
     * Generates a SHA-256 hash for the given input string
     * @param input The input string to be hashed
     * @param dateNow The current timestamp
     * @returns The generated SHA-256 hash
     */
    static generateToken(input, dateNow) {
        return __awaiter(this, void 0, void 0, function* () {
            const combinedStringToHash = input + dateNow;
            const hash = crypto.createHash('sha256');
            hash.update(combinedStringToHash);
            return hash.digest('hex');
        });
    }
}
exports.Hash = Hash;
