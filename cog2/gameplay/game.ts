
import {
    IGame,
    IGameClass,
    IGameStateClass,
    IGameModeClass,
    ISystemClass,
    IUpdatableClass
} from './interfaces';

import {GameMode} from './gameMode';
import {GameState} from './gameState';

export class Game implements IGame {

    static get clientClasses (): Array<IUpdatableClass> {
        return [];
    }

    static get systemClasses (): Array<ISystemClass> {
        return [];
    }

    static get configObjects (): Array<Object> {
        return [];
    }

    public defaultGameModeClass: IGameModeClass = GameMode;
    public defaultGameStateClass: IGameStateClass = GameState;

    private _state: IGameStateClass;

    constructor(config:Object) {}

    loadState (json: Object, GameStateClass?: IGameStateClass): void {
        // todo impl
    }

    saveState (): Object {
        // todo impl
        return this._state;
    }

    setGameMode (GameModeClass: IGameModeClass) {
        // todo impl
    }
}

export function configs(configObjects:Array<Object>) {
    return (targetClass:IGameClass) => {

        for(let config of configObjects) {
            targetClass.configObjects.push(config);
        }


    }
}