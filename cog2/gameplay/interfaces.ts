
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

export interface IUpdatableClass {
    new (config:Object): IUpdatable;
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
    new (config:Object): IEntity;
}


/**
 * Interface for Component
 */

export interface IComponent {
}

export interface IComponentClass {
    id: number;
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
 * Interface for Controller
 */

export interface IController extends IUpdatable {
    entity: IEntity;
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
    new (config: Object): IGameMode;
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

    config: any;

    gameMode: IGameMode;

    loadState: (json: Object, GameStateClass?: IGameStateClass) => void;

    saveState: () => Object;

    setGameMode: (GameModeClass: IGameModeClass) => void;

}

export interface IGameClass {

    defaultGameModeClass: IGameModeClass;

    defaultGameStateClass: IGameStateClass;

    clientClasses: Array<IUpdatableClass>;

    systemClasses: Array<ISystemClass>;

    configObjects: Array<Object>;

    new (config:any): IGame;
}

/**
 * Runtime interface
 */

export interface IRuntime {

    start: ()=> void;

    stop: ()=> void;

    reset: ()=> void;

}