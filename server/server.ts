
/// <reference path='./types.d.ts' />

import express = require('express');
import socket = require('socket.io');
import Game = require('../common/game');

var game = new Game();
var state = game.update(10);

console.log('Hello game state: ' + state.time);