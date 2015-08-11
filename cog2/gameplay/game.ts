/// <reference path="../cog2.d.ts" />

import { extend } from 'cog2/utils/lang';
import { now } from 'cog2/utils/platform';
import { Actor } from 'cog2/gameplay/actor';
import { GameState } from 'cog2/gameplay/gameState';
import { GameWorld } from 'cog2/gameplay/gameWorld';

/**
 * settings
 *
 * Decorates IGameClass with default options.
 *
 * @param options
 * @returns {function(IGameClass): undefined}
 */

export function settings(options:{
    defaultConfig?: any,
    defaultInterval?: number,
    defaultGameWorldClass?: IGameWorldClass,
    defaultGameStateClass?: IGameStateClass
}) {
    return function (targetClass: IGameClass) {

        if (options.defaultConfig) {
            targetClass.defaultConfig = options.defaultConfig;
        }

        if (options.defaultInterval) {
            targetClass.defaultInterval = options.defaultInterval;
        }

        if (options.defaultGameWorldClass) {
            targetClass.defaultGameWorldClass = options.defaultGameWorldClass;
        }

        if (options.defaultGameStateClass) {
            targetClass.defaultGameWorldClass.defaultGameStateClass = options.defaultGameStateClass;
        }
    }
}

/**
 * Game Class
 *
 * Runtime for the Game. Manages game world and systems.
 */

export class Game extends Actor implements IGame {

    static defaultConfig: any;

    static defaultInterval: number = 1000/60;

    static defaultGameWorldClass: IGameWorldClass = GameWorld;

    config: any;

    world: IGameWorld;

    private _lastTimestamp: number;

    private _timer: number | NodeJS.Timer;

    constructor(config: any) {

        super();

        let GameClass: IGameClass = <IGameClass> this.constructor;

        this.config = extend(true, {}, GameClass.defaultConfig, config);

        this.setWorld(GameClass.defaultGameWorldClass);

        this._start();
    }

    destroy() {

        this._end();

        if (this.world) {
            this.world.destroy();
            this.world = null;
        }

        super.destroy.call(this);
    }

    setWorld(WorldClass: IGameWorldClass) {

        if (this.world) {
            this.world.onEnd(this.world);
            this.world.destroy();
        }

        this.world = new WorldClass(this.config);
    }

    private _start() {

        let GameClass: IGameClass = <IGameClass> this.constructor;

        this.onStart(this.world);

        this.world.onStart(this.world);

        this._lastTimestamp = now();

        this._timer = setInterval(() => {
            this._update();
        }, GameClass.defaultInterval);
    }

    private _update() {

        var timestamp = now();

        var dt = timestamp - this._lastTimestamp;

        this.onUpdate(this.world, dt);

        this.world.onUpdate(this.world, dt);

        this._lastTimestamp = timestamp;
    }

    private _end() {

        clearInterval(<number> this._timer);

        this.world.onEnd(this.world);

        this.onEnd(this.world);
    }

}
