import express, {Router} from "express";
import {BaseController} from "./BaseController";
import {IAuthenticationService} from "@modules/Authentication/Application/IAuthenticationService";
import {IAccount} from "@modules/Account/Domain/IAccount";
import {ISession} from "@modules/Session/Domain/ISession";
import console from "console";
import {ILoginDto} from "@modules/Authentication/Application/ILoginDto";
import {Methods} from "./Methods";
import {accountRepository, sessionRepository} from "Server/main";

/**
 * Represents the authentication controller.
 */
export class AuthenticationController extends BaseController {
    private service: IAuthenticationService;

    public constructor(service: IAuthenticationService) {
        super();
        this.service = service;
    }

    public InitialiseRoutes(router: Router): void {
        this.BindRoute(router, "/login", Methods.POST, this.Login);
        this.BindRoute(router, "/logout", Methods.POST, this.Logout);
        this.BindRoute(router, "/register", Methods.POST, this.Register);
    }

    /**
     * Logs the user in.
     */
    public Login = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            let loginDto: ILoginDto = req.body;
            let result = await this.service.Login(loginDto);

            if (result.IsFailure)
                throw result.Failure;

            let token: string = result.Success;
            res.status(200).json(token);
        } catch(error) {
            console.error(error);
            res.status(500).json({success: false});
        }
    }

    /**
     * Logs the user out.
     */
    public Logout = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            let sessionDto: ISession = req.body;
            await this.service.Logout(sessionDto);
            res.status(200);
        } catch(error) {
            console.error(error);
            res.status(500).json({success: false});
        }
    }

    /**
     * Registers a new account.
     */
    public Register = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            let accountDto: IAccount = req.body;
            let result = await this.service.Register(accountDto);

            if (result.IsFailure)
                throw result.Failure;

            let token: string = result.Success;
            res.status(200).json(token);
        } catch(error) {
            console.error(error);
            res.status(500).json({success: false});
        }
    }
}