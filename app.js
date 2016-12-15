/**
 * CONFIGURATION
 */
// load the .env file 
require('dotenv').config();

// check if the app has all required environemnt variables setup.
var checkEnvs = require('./utils/checkEnvs');
checkEnvs([
  'TC_DB_HOST',
  'TC_DB_USERNAME',
  'TC_DB_PASSWORD',
  'TC_API_SECRET',
]);

var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');

var passport = require('./configure/passport');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

// provide a database context to every request
app.use(require('./middleware/dbContext'));

app.use(session({
  secret: process.env['TC_API_SECRET'],
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


app.use('/', require('./routes/index'));


// catch 404 and forward to error handler
app.use(require('./middleware/catch404'));

app.use(require('./middleware/uncaughtErrorHandler'));

module.exports = app;
