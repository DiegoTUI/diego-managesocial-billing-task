'use strict';

const express = require('express');
const envFileParser = require('node-env-file');
const logger = require('morgan');
const bodyParser = require('body-parser');

const charges = require('./routes/charges');
const customers = require('./routes/customers');
let server;

// handle all uncaught exceptions
process.on('uncaughtException', function(uncaughtException) {
    console.fatal(uncaughtException);
});

// create the app
const app = express();

// read environment variables
envFileParser('.env');

// get the current environment from NODE_ENV
const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// app setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// create the routes
app.use('/charges', charges);
app.use('/customers', customers);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).json({
            message: 'service unavailable',
            error: err
        });

        return next();
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
        message: 'service unavailable'
    });

    return next();
});

/**
 * Starts the app and resolves a promise when started
 */
app.startApp = function() {
    app.set('port', process.env.PORT || 3000);

    return new Promise((resolve) => {
        server = app.listen(app.get('port'), function() {
            console.log('Express server listening on port ' + server.address().port);
            return resolve();
        });
    });
};

/**
 * Stops the app and resolves a promise when stopped
 */
app.stopApp = function() {
    return new Promise((resolve) => {
        server.close(() => {
            console.log('server closed');
            return resolve();
        });
    });
};


module.exports = app;
