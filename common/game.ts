
/// <reference path='./types.d.ts' />

interface IGameState {
    time: number
}

class Game {

    state: IGameState;

    constructor() {
        this.state = {
            time: 0
        };
    }

    update(dt: number) : IGameState {
        this.state.time += dt;
        return this.state;
    }

}

export = Game;