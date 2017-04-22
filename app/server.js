require('dotenv').config();

// Server Dependency Setup
const express = require('express');
const app = express();
const path = require('path');
const port = ( process.env.PORT || 5000 );
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('./passport-setup');

// Temporary DB choice -- Will migrate to Postgres later
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URI);


// Routing
const defaultRoutes = require(path.join(__dirname,'routes/defaultRoutes'));
const signupRoutes = require(path.join(__dirname, 'routes/signupRoutes'));
const userRoutes = require(path.join(__dirname, 'routes/userRoutes'));


// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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


// Routes
app.use('/', defaultRoutes);
app.use('/signup', signupRoutes);
app.use('/user', userRoutes);

// Somewhat Error handling
app.get('*', (req, res) => {
  console.log("Invalid URL processed: ", req.url);
  res.status(404).render('404', {url: req.url});
});

app.listen(port, () => {
  console.log('Server listening in on port', port);
});
