import {Request, Response, Router} from "express";
import {Methods} from "./Methods";

/**
 * Base controller for all controllers allowing to declare route.
 */
export abstract class BaseController {
    protected constructor() {

    }

    protected BindRoute(router: Router, endpoint: string, method: Methods, callback: Function): void {
        router[method](endpoint, (req: Request, res: Response) => {
            callback(req, res);
        });
    }

    public abstract InitialiseRoutes(router: Router): void;
}