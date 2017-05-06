require('dotenv').config();
global.Promise = require('bluebird');

// Server Dependency Setup
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('./config/passport-setup')();
const logger = require('morgan');
const favicon = require('serve-favicon');

/*
 * sequelize-db-setup also makes app listen on port
 * returns instance of models object
 */
const models = require('./config/sequelize-setup')(app);


// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'static/images', 'favicon.ico')));
app.use(logger('dev'));

app.use(session(
  {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// Passport initialize
app.use(passport.initialize());
app.use(passport.session());

// Call main route controller here
require('./routes/controller')(app);
