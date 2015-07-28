
/// <reference path='./types.d.ts' />

import path = require('path');
import express = require('express');
import bodyParser = require('body-parser');
import compression = require('compression');

var clientPath = path.resolve(__dirname, '../client');
var commonPath = path.resolve(__dirname, '../common');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use('/client', express.static(clientPath));
app.use('/common', express.static(commonPath));

app.get('/', (req, res) => {
    res.redirect('client/index.html');
});

export = app;