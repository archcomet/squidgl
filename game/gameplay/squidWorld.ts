import { GameWorld } from 'cog2/cog2';

export class SquidWorld extends GameWorld {

    constructor(config: any, StateClass: IGameStateClass) {
        super(config, StateClass);
        console.log(config.message, config.number, this.state);
    }

    destroy() {
        GameWorld.prototype.destroy.call(this);
        console.log('goodbye cruel world!', this.state);
    }
}