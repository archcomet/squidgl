
import { Game, configs, systems, defaults, IGameDefaults } from 'cog2/cog2';
import { ThreeRenderer, renderers } from 'cog2/renderer';
import { SquidGameMode } from 'game/squidGameMode';

import squidConfig = require('game/squidConfig');

@configs([
    squidConfig
])

@renderers([
    ThreeRenderer
])

@defaults({
    defaultGameModeClass:  SquidGameMode
})

class SquidGame extends Game {}

export = SquidGame;