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

export class GameService implements IGameService {
    private readonly socketManager: SocketManager;
    private readonly gameRepository: IGameRepository;
    private readonly pixelRepository: IPixelRepository;
    private currentGame?: IGame;

    public constructor(socketManager: SocketManager, gameRepository: IGameRepository, pixelRepository: IPixelRepository) {
        this.socketManager = socketManager;
        this.gameRepository = gameRepository;
        this.pixelRepository = pixelRepository;

        this.socketManager.ListenForEvent("AddPixel", async (msg: IAddPixelDto) => {
            await this.AddPixel(msg, false);
        });
    }

    public async CreateGame(width: number, height: number): Promise<IGame> {
        let game: Game = new Game("", width, height);

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

    public async AddPixel(addPixelDto: IAddPixelDto, save: boolean): Promise<void> {
        let result = await this.gameRepository.FindByIdentifier(addPixelDto.GameId);

        if (result.IsFailure)
            throw new EntityNotFound("Game");

        let game: Game = result.Success;

        if (save)
            this.socketManager.HandleEvent("AddPixel", addPixelDto);

        let pixel: IPixel = Pixel.Create(addPixelDto.X, addPixelDto.Y, addPixelDto.Color, addPixelDto.OwnerId);
        await this.pixelRepository.Add(pixel);
        game.AddPixel(pixel);
    }
}