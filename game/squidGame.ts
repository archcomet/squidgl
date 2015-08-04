
import { Game, configs, systems } from 'cog2/cog2';
import { ThreeRenderer, renderers } from 'cog2/renderer';
import squidConfig = require('game/squidConfig');


@configs([
    squidConfig
])

@renderers([
    ThreeRenderer
])

class SquidGame extends Game {}

export = SquidGame;