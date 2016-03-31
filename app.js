var express = require('express');
var app = express();
var db = require('./db.js');

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;