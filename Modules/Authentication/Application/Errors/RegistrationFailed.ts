/**
 * Error for when the registration fails.
 */
export class RegistrationFailed extends Error {
    public constructor() {
        super("The registration failed.");
    }
}