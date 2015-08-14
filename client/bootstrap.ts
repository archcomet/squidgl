import App = require('src/app');
let global = <any>window;
global.app = new App();
global.app.start();


import { bootstrap } from 'cog2/cog2';
import { SquidGame } from 'game/squidGame';
