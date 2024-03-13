import {ServiceLocator} from "./ServiceLocator";
import {SERVER, Server} from "../Server/Server";

export class DependencyInjector {
    private serviceLocator: ServiceLocator;

    public constructor(serviceLocator: ServiceLocator) {
        this.serviceLocator = serviceLocator;
    }

    public InstantiateDependenciesIntoServiceLocator(): void {
        /* ----- Server ----- */
        const server: Server = new Server();
        this.serviceLocator.Register(SERVER, server);
    }
}