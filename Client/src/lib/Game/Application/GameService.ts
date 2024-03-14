import type {IGameService} from "@modules/Game/Application/IGameService";
import type { IPixel } from "@modules/Pixel/Domain/IPixel";
import type {SocketManager} from "$lib/SocketIo/SocketManager";
import {Game} from "@modules/Game/Domain/Game";
import type {IGameRepository} from "@modules/Game/Domain/IGameRepository";
import {EntityNotFound} from "@modules/Entity/Domain/Errors/EntityNotFound";
import type {IGame} from "@modules/Game/Domain/IGame";
import {JsonService} from "@modules/Kernel/Infrastructure/JsonService";
import type {IAddPixelDto} from "@modules/Game/Application/IAddPixelDto";
import type {IPixelRepository} from "@modules/Pixel/Domain/IPixelRepository";
import {Pixel} from "@modules/Pixel/Domain/Pixel";
import {instanceToInstance} from "class-transformer";

export class GameService implements IGameService {
    private readonly socketManager: SocketManager;
    private readonly gameRepository: IGameRepository;
    private readonly pixelRepository: IPixelRepository;

    public constructor(socketManager: SocketManager, gameRepository: IGameRepository, pixelRepository: IPixelRepository) {
        this.socketManager = socketManager;
        this.gameRepository = gameRepository;
        this.pixelRepository = pixelRepository;
    }

    private OnAddPixelEvent(pixel: IPixel): void {
     //   pixel.
        /*this.socketManager.ListenForEvent("AddPixel", (msg: { xCoordinate: number, yCoordinate: number, pixelColor: string }) => {
            grid.SetColor(msg.xCoordinate, msg.yCoordinate, msg.pixelColor);
        });*/
    }

    public async CreateGame(width: number, height: number): Promise<IGame> {
        let game: Game = new Game("", width, height);
        let json = JsonService.Serialise(game);

        const response = await fetch("http://localhost:3000/game", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JsonService.Serialise(game)
        });
        game = JsonService.Deserialise(await response.json(), Game);

        if (!response.ok)
            throw new Error("Failed to create game");

        await this.gameRepository.Add(game);

        return game;
    }

    public async AddPixel(addPixelDto: IAddPixelDto): Promise<void> {
        let result = await this.gameRepository.FindByIdentifier(addPixelDto.GameId);
        let game: Game;

        if (result.IsFailure)
            throw new EntityNotFound("Game");

        game = result.Success;
        this.socketManager.HandleEvent("AddPixel", addPixelDto);
        let pixel: IPixel = Pixel.Create(addPixelDto.X, addPixelDto.Y, addPixelDto.Color, addPixelDto.OwnerId);

        await this.pixelRepository.Add(pixel);

        game.AddPixel(pixel);
    }
}