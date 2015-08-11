/// <reference path="../cog2.d.ts" />

import { extend } from 'cog2/utils/lang';
import { GameState } from 'cog2/gameplay/gameState';
import { GameWorld } from 'cog2/gameplay/gameWorld';

/**
 * defaults
 *
 * Decorates IGameClass with default options.
 *
 * @param options
 * @returns {function(IGameClass): undefined}
 */

export function defaults(options:{
    defaultConfig?: any,
    defaultGameWorldClass?: IGameWorldClass,
    defaultGameStateClass?: IGameStateClass
}) {
    return function (targetClass:IGameClass) {

        if (options.defaultConfig) {
            targetClass.defaultConfig = options.defaultConfig;
        }

        if (options.defaultGameStateClass) {
            targetClass.defaultGameStateClass = options.defaultGameStateClass;
        }

        if (options.defaultGameWorldClass) {
            targetClass.defaultGameWorldClass = options.defaultGameWorldClass;
        }
    }
}

/**
 * Game Class
 *
 * Runtime for the Game. Manages game world and systems.
 */

export class Game implements IGame {

    static defaultConfig:any;

    static defaultGameWorldClass:IGameWorldClass = GameWorld;

    static defaultGameStateClass:IGameStateClass = GameState;

    public config:any;

    public world:IGameWorld;

    constructor(config:any) {
        let GameClass:IGameClass = <IGameClass>this.constructor;

        this.config = extend(true, {}, GameClass.defaultConfig, config);
        this.setWorld(GameClass.defaultGameWorldClass, GameClass.defaultGameStateClass);

        // todo start timer
    }

    destroy() {
        if (this.world) {
            this.world.destroy();
            this.world = null;
        }
    }

    setWorld(WorldClass:IGameWorldClass, StateClass:IGameStateClass) {
        if (this.world) {
            this.world.destroy();
        }

        this.world = new WorldClass(this.config, StateClass);
    }

}
