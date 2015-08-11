import { GameWorld } from 'cog2/cog2';

export class SquidWorld extends GameWorld {

    config: any;

    constructor(config: any) {
        super(config);
        this.config = config;
    }

    onStart (world: SquidWorld) {
        console.log('the world is square!', world.state);
    }

    onUpdate (world: SquidWorld, dt: number) {
        console.log('the world is alive!', dt);
    }

    onEnd (world: SquidWorld) {
        console.log('goodbye cruel world!', world.state);
    }
}