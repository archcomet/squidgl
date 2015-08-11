import { Game, settings } from 'cog2/cog2';
import { SquidWorld } from './gameplay/squidWorld';
import { config } from './squidConfig';

@settings({
    defaultConfig: config,
    defaultGameWorldClass: SquidWorld
})

export class SquidGame extends Game {}