import { PluginInstance } from "./PluginInstance";
import IApp from "@gluestack/framework/types/app/interface/IApp";
import IContainerController, { IRoutes } from "@gluestack/framework/types/plugin/interface/IContainerController";
export declare class PluginInstanceContainerController implements IContainerController {
    app: IApp;
    status: "up" | "down";
    portNumber: number;
    containerId: string;
    callerInstance: PluginInstance;
    constructor(app: IApp, callerInstance: PluginInstance);
    getCallerInstance(): PluginInstance;
    installScript(): string[];
    buildScript(): string[];
    runScript(): void;
    getEnv(): Promise<{
        APP_PORT: unknown;
    }>;
    getDockerJson(): {};
    getStatus(): "up" | "down";
    getPortNumber(returnDefault?: boolean): Promise<unknown>;
    getContainerId(): string;
    setStatus(status: "up" | "down"): "up" | "down";
    setPortNumber(portNumber: number): number;
    setContainerId(containerId: string): void;
    getConfig(): any;
    up(): Promise<void>;
    down(): Promise<void>;
    build(): Promise<void>;
    getRoutes(): Promise<IRoutes[]>;
}
