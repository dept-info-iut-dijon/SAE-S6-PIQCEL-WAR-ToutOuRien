import * as bcrypt from 'bcrypt';
import {ICanHash} from "@modules/Kernel/Application/ICanHash";

/**
 * A utility class for hashing strings using bcrypt.
 */
export class BCryptHashService implements ICanHash {
    public async Hash(value: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(value, salt);
    }
}
