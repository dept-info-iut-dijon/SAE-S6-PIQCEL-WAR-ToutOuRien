import * as bcrypt from 'bcrypt';
import {ICanHash} from "@modules/Kernel/Application/ICanHash";
import sha256 from "sha256";

/**
 * A utility class for hashing strings using bcrypt.
 */
export class BCryptHashService implements ICanHash {
    public async Hash(value: string): Promise<string> {
        let salt: string = await sha256(value);
        return await sha256(value + salt);
    }
}
