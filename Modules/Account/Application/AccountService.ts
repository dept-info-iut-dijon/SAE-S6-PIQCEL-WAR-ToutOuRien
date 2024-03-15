import {ICanHash} from "@modules/Kernel/Application/ICanHash";
import {IAccountRepository} from "@modules/Account/Domain/IAccountRepository";
import {IAccount} from "@modules/Account/Domain/IAccount";
import {Account} from "@modules/Account/Domain/Account";
import { EmailAlreadyTaken } from "../Domain/Errors/EmailAlreadyTaken";
import {Either, Failure, Success} from "simply-either-ts";
import {AccountNotFound} from "@modules/Account/Domain/Errors/AccountNotFound";
import {IIdentifierGenerator} from "@modules/Kernel/Application/IIdentifierGenerator";

/**
 * Represents the account service.
 */
export class AccountService {
    private hashService: ICanHash;
    private accountRepository: IAccountRepository;
    private identifierGenerator: IIdentifierGenerator;

    public constructor(hashService: ICanHash, accountRepository: IAccountRepository, identifierGenerator: IIdentifierGenerator) {
        this.hashService = hashService;
        this.accountRepository = accountRepository;
        this.identifierGenerator = identifierGenerator;
    }

    /**
     * Check if the email is already taken.
     * @param email - The email to check.
     */
    private async EmailAlreadyTaken(email: string): Promise<boolean> {
        let result = await this.accountRepository.FindOneWhere((account: IAccount) => account.Email === email)
        let isEmailAlreadyTaken: boolean = result.IsSuccess;
        return isEmailAlreadyTaken;
    }

    /**
     * Create an account.
     * @param accountDto - The account to create.
     * @returns The created account, otherwise an error.
     */
    public async CreateAccount(accountDto: IAccount): Promise<Either<IAccount, EmailAlreadyTaken>> {
        if (await this.EmailAlreadyTaken(accountDto.Email))
            return Failure(new EmailAlreadyTaken(accountDto.Email));

        const hashedPassword: string = await this.hashService.Hash(accountDto.Password);
        let account: Account = new Account(accountDto.Identifier, accountDto.Email, accountDto.Pseudo, hashedPassword, true);

        account.Identifier = await this.identifierGenerator.GenerateIdentifier();
        await this.accountRepository.Add(account);

        return Success(account);
    }

    /**
     * Get the account by email or pseudo.
     * @param accountDto - The account to get.
     */
    public async GetAccountByEmailOrPseudo(accountDto: IAccount): Promise<Either<IAccount, AccountNotFound>> {
        let result = await this.accountRepository.FindOneWhere(
            (account: IAccount) => (account.Email === accountDto.Email || account.Pseudo == accountDto.Pseudo)
        );

        if (result.IsFailure)
            return Failure(new AccountNotFound());

        return Success(result.Success);
    }

    /**
     * Check if the account is valid, meaning if the account has a confirmed email.
     * @param accountDto - The account to check.
     */
    public async IsValidAccount(accountDto: IAccount): Promise<boolean> {
        let isValidAccount: boolean = false;
        let result = await this.GetAccountByEmailOrPseudo(accountDto);

        if (result.IsSuccess) {
            let account: IAccount = result.Success;
            isValidAccount = account.IsEmailConfirmed;
        }

        return isValidAccount;
    }

    /**
     * Check if the account exists.
     * @param identifier - The unique identifier of the account to check.
     */
    public async DoesAccountExist(identifier: string): Promise<boolean> {
        let doesAccountExist: boolean = false;
        let result = await this.accountRepository.FindByIdentifier(identifier);

        if (result.IsSuccess)
            doesAccountExist = true;

        return doesAccountExist;
    }
}