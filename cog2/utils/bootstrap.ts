/// <reference path="../cog2.d.ts" />

import { Game } from 'cog2/gameplay/game';
import { log } from 'cog2/utils/log';

export function bootstrap(GameClass:IGameClass, config?:any):IGame {
    var game = new GameClass(config);
    log('cog2: bootstrap', game);
    return game;
}