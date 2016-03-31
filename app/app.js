var express = require('express');
var app = express();
var db = require('./db.js');
var htmlTemplate = require('angular-template');
var bootstrap = require('bootstrap');

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;