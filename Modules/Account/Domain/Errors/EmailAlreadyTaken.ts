/**
 * Error when the email is already taken.
 */
export class EmailAlreadyTaken extends Error {
    public constructor(email: string) {
        super(`The email ${email} is already taken.`);
    }
}