import {IGame} from "@modules/Game/Domain/IGame";
import {IGameService} from "@modules/Game/Application/IGameService";
import {BaseController} from "./BaseController";
import express, {Router} from "express";
import {Methods} from "./Methods";
import {JsonService} from "@modules/Kernel/Infrastructure/JsonService";
import {Game} from "@modules/Game/Domain/Game";
import * as console from "console";
import {instanceToInstance, plainToClassFromExist} from "class-transformer";

export class GameController extends BaseController {
    private readonly gameService: IGameService;

    public constructor(gameService: IGameService) {
        super();
        this.gameService = gameService;
    }

    public InitialiseRoutes(router: Router): void {
        this.BindRoute(router, "/game", Methods.POST, this.CreateGame);
    }

    public CreateGame = async (req: express.Request, res: express.Response): Promise<void> => {

        try {
            let game: IGame = req.body;
            game = await this.gameService.CreateGame(game.Width, game.Height);
            res.status(200).json(JsonService.Serialise(game));
        } catch(error) {
            console.error(error);
            res.status(500).json({
                success: false
            });
        }
    }
}