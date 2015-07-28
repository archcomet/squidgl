
/// <reference path='./types.d.ts' />

import app = require('./app');
import io = require('./io');
import Game = require('../common/game');

var PORT = process.env.PORT || 3000;
var SOCKET = process.env.SOCKET || 3001;

app.listen(PORT, () => {
    console.log('Express server listening on port:%s', PORT);
});

io.serveClient(false);
io.attach(SOCKET);