/// <reference path="../cog2.d.ts" />

import { extend } from 'cog2/utils/lang';
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
    defaultGameWorldClass?: IGameWorldClass,
    defaultGameStateClass?: IGameStateClass
}) {
    return function (targetClass: IGameClass) {

        if (options.defaultConfig) {
            targetClass.defaultConfig = options.defaultConfig;
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

    static defaultGameWorldClass: IGameWorldClass = GameWorld;

    config: any;

    world: IGameWorld;

    constructor(config: any) {
        super();
        let GameClass: IGameClass = <IGameClass> this.constructor;

        this.config = extend(true, {}, GameClass.defaultConfig, config);
        this.setWorld(GameClass.defaultGameWorldClass);

        this.start();
    }

    destroy() {
        this.onEnd(this.world);
        if (this.world) {
            this.world.destroy();
            this.world = null;
        }
        super.destroy.call(this);
    }

    setWorld(WorldClass: IGameWorldClass) {
        if (this.world) {
            this.world.destroy();
        }

        this.world = new WorldClass(this.config);
    }

    private start() {

        this.onStart(this.world);
    }

}
