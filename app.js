require('dotenv').config();

var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');

var passport = require('./configure/passport');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

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
