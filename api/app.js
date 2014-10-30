var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var models = require('./models/index.js');
var request = require('request');
var passport = require('passport');
var b = require('bonescript');

var app = express();

/**
 * Configure the app
 */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**
 * Middleware Setup
 */
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.passport = passport;

/**
 * Register the routes the app will use
 */

var index  = require('./routes/index');
var public = require('./routes/public');
var api  = require('./routes/api');

app.use('/', index);
app.use('/public', public);
app.use('/api', api);

/**
 * Catch and Handle route errors below
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var models = require('./models');
var inputPin = 'P8_12';
b.pinMode(inputPin, b.INPUT);
b.attachInterrupt(inputPin, true, b.RISING, interruptCallback);

function interruptCallback(x) {
    // console.log(JSON.stringify(x));
    if (b.digitalRead(inputPin)===1) {
        models.Test.create({
             name: true
         }).failure(function(error) {
             console.log(error);
         });
    }
} 

module.exports = app;

app.listen(3101);