import App = require('src/app');
let global = <any>window;
global.app = new App();
global.app.start();


import { App as Cog2App, TestApp, bootstrap } from 'cog2/cog2';
import { SquidGame } from 'game/squidGame';

console.log(Cog2App, TestApp);
//global.squidGame = bootstrap(SquidGame, {
//    number: 42
//});