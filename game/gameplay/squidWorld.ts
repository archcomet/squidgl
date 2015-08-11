import { GameWorld } from 'cog2/cog2';

export class SquidWorld extends GameWorld {

    constructor(config: any) {
        super(config);
        console.log(config.message, config.number, this.state);
    }

    destroy() {
        super.destroy.call(this);
        console.log('goodbye cruel world!', this.state);
    }
}