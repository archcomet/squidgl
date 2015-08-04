
import { bootstrap } from 'cog2/cog2';
import SquidGame = require('game/squidGame');

let global = <any>window;

global.squidApp = bootstrap(SquidGame);