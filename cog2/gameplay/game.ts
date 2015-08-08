
import {
    IGame,
    IGameClass,
    IGameStateClass,
    IGameMode,
    IGameModeClass,
    ISystemClass,
    IUpdatableClass
} from './interfaces';

import {extend} from '../lang';

import {GameMode} from './gameMode';
import {GameState} from './gameState';

export class Game implements IGame {

    static defaultGameModeClass: IGameModeClass = GameMode;

    static defaultGameStateClass: IGameStateClass = GameState;

    static get clientClasses (): Array<IUpdatableClass> {
        return [];
    }

    static get systemClasses (): Array<ISystemClass> {
        return [];
    }

    static get configObjects (): Array<Object> {
        return [];
    }

    public config: any;

    public gameMode: IGameMode;

    private _state: IGameStateClass;

    constructor(config:any) {
        this.config = extend(true, {}, config);
        this.setGameMode((<IGameClass>this.constructor).defaultGameModeClass);
    }

    loadState (json: Object, GameStateClass?: IGameStateClass): void {
        // todo impl
    }

    saveState (): Object {
        // todo impl
        return this._state;
    }

    setGameMode (GameModeClass: IGameModeClass) {
        // todo stop previous game mode via runtime
        this.gameMode = new GameModeClass(this.config);
        console.log(this.gameMode);
    }

    onStart (gameMode: IGameMode) {

        if (this.gameMode.onStart) {
            this.gameMode.onStart(gameMode);
        }
    }
}

export function configs(configObjects:Array<Object>) {
    return (targetClass:IGameClass) => {
        for(let config of configObjects) {
            targetClass.configObjects.push(config);
        }
    }
}

export function defaults(defaultOptions: {
    defaultGameModeClass?: IGameModeClass,
    defaultGameStateClass?: IGameStateClass
}) {
    return (TargetClass:IGameClass) => {
        TargetClass.defaultGameModeClass = defaultOptions.defaultGameModeClass || TargetClass.defaultGameModeClass;
        TargetClass.defaultGameStateClass = defaultOptions.defaultGameStateClass || TargetClass.defaultGameStateClass;
    }
}