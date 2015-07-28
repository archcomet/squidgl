
/// <reference path='./types.d.ts' />

import socket = require('socket.io');

var io = socket();

io.sockets.on('connection', (socket) => {
    console.log('Hello socket');
});

export = io;