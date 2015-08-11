/// <reference path="../cog2.d.ts" />

export class GameWorld implements IGameWorld {

    state: IGameState;

    constructor(config:any, StateClass:IGameStateClass) {
        this.state = new StateClass(config);
    }

    destroy() {
        this.state.destroy();
        this.state = null;
    }
}