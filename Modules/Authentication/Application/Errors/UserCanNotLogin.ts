/**
 * Error when user can not log in.
 */
export class UserCanNotLogin extends Error {
    public constructor() {
        super("The user can not login.");
    }
}