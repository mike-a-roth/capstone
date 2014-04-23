var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var models = require('./models/index.js');
// var oAuthModels = require('./oauthModels');
// var oauthserver = require('node-oauth2-server');
var request = require('request');
var passport = require('passport');
var b = require('bonescript');
// var BasicStrategy = require('passport-http').BasicStrategy;

var app = express();

/**
 * Configure the app
 */
//oauth setup
// app.oauth = oauthserver({
//     model: oAuthModels,
//     grants: ['password'],
//     debug: true,
//     accessTokenLifetime: null
// });

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

/**
 * HTTP Basic Auth via Passport
 */
// var authUsers = [
//     { id: 1, username: 'drupal', password: 'lapurd' },
//     { id: 2, username: 'crawl_service', password: 'PrattleCrawl2014' }
// ];

// function findByUsername(username, fn) {
//     for (var i = 0, len = authUsers.length; i < len; i++) {
//         var user = authUsers[i];
//         if (user.username === username) {
//             return fn(null, user);
//         }
//     }
//     return fn(null, null);
// }

// passport.use(new BasicStrategy({
//     },
//     function(username, password, done) {
//         // asynchronous verification, for effect...
//         process.nextTick(function () {

//             // Find the user by username.  If there is no user with the given
//             // username, or the password is not correct, set the user to `false` to
//             // indicate failure.  Otherwise, return the authenticated `user`.
//             findByUsername(username, function(err, user) {
//                 if (err) { return done(err); }
//                 if (!user) { return done(null, false); }
//                 if (user.password != password) { return done(null, false); }
//                 return done(null, user);
//             })
//         });
//     }
// ));

// app.passport = passport;

/**
 * Register the routes the app will use
 */

// Handle token grant requests
// app.all('/oauth/token', app.oauth.grant());

// var index  = require('./routes/index');
// var users  = require('./routes/users')(app);
// var public = require('./routes/public');
// var secret = require('./routes/secret')(app);
// var persist  = require('./routes/persist')(app);
// var api  = require('./routes/api')(app);
// var banks = require('./routes/banks')(app);

// app.use('/', index);
// app.use('/users', users);
// app.use('/public', public);
// app.use('/secret', secret);
// app.use('/persist', persist);
// app.use('/api', api);
// app.use('/banks', banks);

/**
 * Catch and Handle route errors below
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Oauth Error handling
// app.use(app.oauth.errorHandler());

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
b.attachInterrupt(inputPin, true, b.CHANGE, interruptCallback);

function interruptCallback(x) {
    if(x.value==1) {
        // console.log('x.value = ' + x.value);
         models.Test.create({
             name: true
         }).failure(function(error) {
             console.log(error);
         });
    }
} 

module.exports = app;