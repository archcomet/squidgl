
export interface IVector3 {
    x: number;
    y: number;
    z: number;
}

/**
 * Interface for Actor
 */

export interface IUpdatable {

    onInit?: (gameMode:IGameMode) => void;

    onStart?: (gameMode:IGameMode) => void;

    onEnd?: (gameMode:IGameMode) => void;

    onDestroy?: (gameMode:IGameMode) => void;

    onUpdate?: (gameMode:IGameMode, dt:number) => void;

}

/**
 * Interface for Entity
 */

export interface IEntity extends IUpdatable {

    active: boolean;

    position: IVector3;

    controller: IController;

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
 * IMesh
 */

export interface IMesh {

}

export interface IMeshClass {
    new (): IMesh;
}


/**
 * Interface for Component
 */

export interface IComponent {
}

export interface IComponentClass {
    new (): IComponent;
}

/**
 * Interface for System
 */

export interface ISystem extends IUpdatable {

    onInitSystems?: (gameMode:IGameMode) => void;

}


export interface ISystemClass {
    new (): ISystem;
}

/**
 * Renderer
 */

export interface IRenderer extends IUpdatable {
    onRender: () => void;
}

export interface IRendererClass {
    new (): IRenderer;
}

/**
 * Interface for Controller
 */

export interface IController extends IUpdatable {

    entity: IEntity;

    //todo
}

export interface IControllerClass {
    new (): IController;
}

/**
 * Interface for GameMode
 */

export interface IGameMode extends IUpdatable {

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

export interface IGameStateClass {
    new (): IGameState;
}

/**
 * Interface for Game
 */

export interface IGame extends IUpdatable {

    defaultGameModeClass: IGameModeClass;

    defaultGameStateClass: IGameStateClass;

    loadState: (json: Object, GameStateClass?: IGameStateClass) => void;

    saveState: () => Object;

    setGameMode: (GameModeClass: IGameModeClass) => void;

}

export interface IGameClass {
    new (): IGame;
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




// decorators

export function components (arr:Array<IComponentClass>) {
    return () => {

    }
}

export function meshes (arr:Array<IMeshClass>) {
    return () => {

    }
}

export function systems(arr:Array<ISystemClass>) {
    return () => {

    }
}

export function renderers(arr:Array<IRendererClass>) {
    return () => {

    }
}

export function defaults(obj:Object) {
    return () => {

    }
}