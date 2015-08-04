
import {
    extend
} from './lang';

import {
    IGame,
    IGameClass,
    IRuntime,
    ISystem,
    IUpdatable

} from './gameplay/interfaces';

class Runtime implements IRuntime {

    public game: IGame;

    public config: Object;

    private client: Array<IUpdatable> = [];

    private systems: Array<ISystem> = [];

    constructor(GameClass: IGameClass, config?: Object) {

        let configArgs = [true, config ? config : {}];
        for(let config of GameClass.configObjects) {
            configArgs.push(config);
        }

        this.config = extend.apply(this, configArgs);

        this.game = new GameClass(this.config);

        for(let ClientUpdatable of GameClass.clientClasses) {
            this.client.push(new ClientUpdatable(this.config));
        }

        console.log(this.client[0]);
    }

    public start ():void {

    }

    public stop ():void {
    }

    public reset ():void {
    }

}

export function bootstrap(GameClass: IGameClass, config?: Object): IRuntime {
    var runtime = new Runtime(GameClass, config);
    runtime.start();
    return runtime;
}
