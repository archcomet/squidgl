
import {IGame, IGameStateClass, IGameModeClass} from './interfaces';
import {GameMode} from './gameMode';
import {GameState} from './gameState';

export class Game implements IGame {

    public defaultGameModeClass: IGameModeClass = GameMode;
    public defaultGameStatelass: IGameStateClass = GameState;

    private _state: IGameStateClass;

    loadState (json: Object, GameStateClass?: IGameStateClass): void {

    }

    saveState (): Object {
        return this._state;
    }

    setGameMode (GameModeClass: IGameModeClass) {

    }
}