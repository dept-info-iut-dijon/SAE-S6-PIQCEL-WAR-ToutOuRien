import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

/**
 * A utility class for hashing passwords, verifying passwords, and generating salts.
 */
class Hash 
{
    /**
     * Hashes a given plain text password using bcrypt with a generated salt.
     * 
     * @param password - The plain text password to hash.
     * @returns A promise that resolves to the hashed password.
     */
    static async hashPassword(password: string): Promise<string> 
    {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    /**
     * Compares a plain text password with a hashed password to check if they match.
     * 
     * @param inputPassword - The plain text password to compare.
     * @param hashedPassword - The hashed password to compare against.
     * @returns A promise that resolves to true if the passwords match, false otherwise.
     */
    static async comparePassword(inputPassword: string, hashedPassword: string): Promise<boolean> 
    {
        return await bcrypt.compare(inputPassword, hashedPassword);
    }

    /**
     * Generates a SHA-256 hash for the given input string
     * @param input The input string to be hashed
     * @param dateNow The current timestamp
     * @returns The generated SHA-256 hash
     */
    static async generateToken(input : string, dateNow : string) : Promise<string>
    {
        const combinedStringToHash = input + dateNow;
        const hash = crypto.createHash('sha256');
        hash.update(combinedStringToHash);
        return hash.digest('hex');
    }
}

export { Hash };
