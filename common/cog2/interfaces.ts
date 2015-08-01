


/**
 * Interface for Actor
 */

export interface IActor {

    active: boolean;

    onInit?: (gameMode:IGameMode) => void;

    onStart?: (gameMode:IGameMode) => void;

    onEnd?: (gameMode:IGameMode) => void;

    onDestroy?: (gameMode:IGameMode) => void;

    onUpdate?: (gameMode:IGameMode, dt:number) => void;

}

/**
 * Interface for Entity
 */

export interface IEntity extends IActor {

    controller: IController;

    components: Array<IComponent>;

    getComponent: (ComponentClass:IComponentClass) => IComponent;

    hasComponents: (...ComponentClasses:Array<IComponentClass>) => boolean;

    onInitComponents?: () => void;

    onSpawn?: (gameMode:IGameMode) => void;

    onDespawn?: (gameMode:IGameMode) => void;

}

export interface IEntityClass {
    new (): IEntity;
}

/**
 * Interface for Component
 */

export interface IComponent {
    //todo
}

export interface IComponentClass {
    new (): IComponent;
}

/**
 * Interface for System
 */

export interface ISystem extends IActor {

    onInitSystems?: (gameMode:IGameMode) => void;

}


export interface ISystemClass {
    new (): ISystem;
}

/**
 * Interface for Controller
 */

export interface IController extends IActor {

    entity: IEntity;

    //todo
}

export interface IControllerClass {
    new (): IController;
}

/**
 * Interface for GameMode
 */

export interface IGameMode extends IActor {

    state: IGameState;

    spawn: (EntityClass: IEntityClass) => IEntity;

    despawn: (entity: IEntity) => void;

    despawnAll: () => void;

    getEntities: () => Array<IEntity>;

    getEntitiesByTag: (entityTag: string) => Array<IEntity>;

    getEntitiesByComponents: (...ComponentClasses:Array<IComponentClass>) => Array<IEntity>;

    getSystem: (SystemClass: ISystemClass) => ISystem;

    onInitSystems?: (gameMode:IGameMode) => void;
}

export interface IGameModeClass {
    new (): IGameMode;
}

/**
 * Interface for GameState
 */

export interface IGameState {

    serialize: ()=> Object;

    deserialize: (json: Object) => void;

}

export interface IGameModeState {
    new (): IGameState;
}

/**
 * Interface for Game
 */

export interface IGame extends IActor {

    loadState: (json: Object, GameStateClass?: IGameModeState) => void;

    saveState: () => Object;

    setGameMode: (GameModeClass: IGameModeClass) => void;

}

export interface IGameClass {
    new (): IGame;
}

// decorator
export function systems() {
    return () => {
        
    }
}

export function renderers() {
    return () => {

    }
}

export function defaults() {
    return () => {

    }
}

/**
 *
 */

export interface IGameClient {
    gameEngine: IGame;
}

export interface IGameClinentClass {
    new (): IGameClient;
}

// todo move to impl
export function bootstrapClient(game: IGameClass): IGameClient {
    return null;
}

/**
 *
 */

export interface IGameServer {
    gameEngine: IGame;
}

export interface IGameServerClass {
    new (): IGameServer;
}

// todo move to impl
export function bookstrapServer(game: IGameClass): IGameServer {
    return null;
}

