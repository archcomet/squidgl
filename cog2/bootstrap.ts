/// <reference path="cog2.d.ts" />

import { Game } from 'cog2/gameplay/game';
import { log } from 'cog2/utils/platform';

export function bootstrap(GameClass:IGameClass, config?:any):IGame {
    log('cog2/bootstrap', 'v0');
    return new GameClass(config);
}