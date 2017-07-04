// Server Dependency Setup
const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const passport = require("./config/passport-setup")();
const logger = require("morgan");
const helmet = require("helmet");
const favicon = require("serve-favicon");

module.exports = (app) => {
	// Middleware
	app.set("view engine", "ejs");
	app.set("views", path.join(__dirname, "views"));
	app.use(favicon(path.join(__dirname, "static/images", "favicon.ico")));
	app.use(express.static(path.join(__dirname, "static")));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(helmet());
	app.use(logger("dev"));

	app.use(session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({
			url: process.env.SESSION_STORE,
			ttl: 14 * 24 * 60 * 60 
		})
	}));
	app.use(flash());

	// Passport initialize
	app.use(passport.initialize());
	app.use(passport.session());

	// Call main route controller here
	require("./routes/controller")(app);
};
