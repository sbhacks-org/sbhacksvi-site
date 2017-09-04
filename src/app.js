const express = require("express"),
	path = require("path"),
	session = require("express-session"),
	flash = require("connect-flash"),
	MongoStore = require("connect-mongo")(session),
	bodyParser = require("body-parser"),
	logger = require("morgan"),
	helmet = require("helmet"),
	favicon = require("serve-favicon"),
	passport = require("passport");

const app = express();

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
	})
) : undefined;

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: SessionStore
}));
app.use(flash());

// Passport initialize
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// Import main route controller here
require("./routes/controller")(app);

module.exports = app;
