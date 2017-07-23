// Server Dependency Setup
const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const logger = require("morgan");
const helmet = require("helmet");
const favicon = require("serve-favicon");
const passport = require("./config/passport-setup");

module.exports = (app) => {
	// Init Middleware
	app.use(helmet());
	app.set("view engine", "ejs");
	app.set("views", path.join(__dirname, "views"));
	app.use(favicon(path.join(__dirname, "static/images", "favicon.ico")));
	app.use(express.static(path.join(__dirname, "static")));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(logger("dev"));

	let SessionStore = process.env.NODE_ENV == "production" ? (
		new MongoStore({
			url: process.env.SESSION_STORE,
			ttl: 14 * 24 * 60 * 60 
		})) : undefined;

	app.use(session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: SessionStore
	}));
	app.use(flash());

	// Passport initialize
	app.use(passport.initialize());
	app.use(passport.session());

	// Import main route controller here
	require("./routes/controller")(app);
};
