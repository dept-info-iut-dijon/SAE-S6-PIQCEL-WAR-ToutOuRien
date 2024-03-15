/**
 * Interface for hashing a value.
 */
export interface ICanHash {
    /**
     * Hashes a value.
     * @param value The value to hash.
     * @returns the hashed value.
     */
    Hash(value: string): Promise<string>
}