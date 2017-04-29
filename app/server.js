require('dotenv').config();
global.Promise = require('bluebird');

// Server Dependency Setup
const express = require('express');
const app = express();
const path = require('path');
const port = ( process.env.PORT || 5000 );
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('./passport-setup');
const logger = require('morgan');
const favicon = require('serve-favicon');


// Connecting to postgres database
const models = require('./models/index');
models.sequelize.sync({
    force: true // Temporary for development
  }).then(() => {
    console.log("Successfully migrated and connected to database");

    // Insert into schools table a default entry for now
    models.school.create({
      name: "UC Santa Barbara"
    }).then(() => {
      console.log("Successfully added UC Santa Barbara to schools table");
    }).catch((err) => {
      console.log("Could not insert into schools table the value UC Santa Barbara");
    });

    app.listen(port, () => {
      console.log('Server listening in on port', port);
    });
  }).catch((err) => {
    console.log("Could not connect to database", err);
  });


// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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


/*
 * Routes defined here
 */
const defaultRoutes = require(path.join(__dirname,'routes/defaultRoutes'));
const signupRoutes = require(path.join(__dirname, 'routes/signupRoutes'));
const userRoutes = require(path.join(__dirname, 'routes/userRoutes'));

app.use('/', defaultRoutes);
app.use('/signup', signupRoutes);
app.use('/user', userRoutes);

/*
 * End Routes Definitions
 */

// Somewhat Error handling for development purposes
app.get('*', (req, res) => {
  console.log("Invalid URL processed: ", req.url);
  res.status(404).render('404', {url: req.url});
});
