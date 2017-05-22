// Import packages
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');

var config = require('./config');

mongoose.Promise = Promise;

// Import routes
var IndexRoute = require('./routes/index');
var AuthenticateRoute = require('./routes/authenticate');
var BaseRoute = require('./routes/base');
var BoardRoute = require('./routes/board');
var ItemRoute = require('./routes/item');

// Import models
var User = require('./models/user');

var app = express();

// Connect to mongo database
mongoose.connect(config.database, function(error) {
    if (error) {
        throw error;
    }
    console.log("Successfully connected to MongoDB!");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup routes
app.use('/', IndexRoute);
app.use('/api/authenticate', AuthenticateRoute);
app.use('/api', BaseRoute);
app.use('/api', BoardRoute);
app.use('/api', ItemRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
