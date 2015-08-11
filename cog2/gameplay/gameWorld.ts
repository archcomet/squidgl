/// <reference path="../cog2.d.ts" />

import { Actor } from './actor';
import { GameState } from './gameState';

export class GameWorld extends Actor implements IGameWorld {

    static defaultGameStateClass: IGameStateClass = GameState;

    state: IGameState;

    constructor(config: any) {
        super();
        let GameWorldClass: IGameWorldClass = <IGameWorldClass> this.constructor;
        this.state = new GameWorldClass.defaultGameStateClass(config);
    }

    destroy() {
        this.state.destroy();
        this.state = null;
        super.destroy.call(this);
    }

}