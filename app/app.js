var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var api = require('../config/api.js')
var app = express();

// Export environment vars first thing
require('dotenv').load();
// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, '../public'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, '../public/assets', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, '../public')));

// app.use('/db',function(req,res,next){
//       req.db = api;
//       next();
// });
//
// app.use('/api',function(req,res,next){
//       req.db = api;
//       next();
// });
app.use('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

require('./routes/routes')(app, api);
// app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('./views/error.html', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('./views/error.html', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
