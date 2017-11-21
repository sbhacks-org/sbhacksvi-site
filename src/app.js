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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(helmet());
app.use(favicon(path.join(__dirname, "static/images", "favicon.ico")));
app.use(express.static(path.join(__dirname, "static"), { maxAge: 60 * 60 * 1000 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use((req, res, next) => {
	if(app.get("env") === "production") {
		if (req.headers["x-forwarded-proto"] != "https") {
			return res.redirect('https://' + req.headers["host"] + req.originalUrl);
		}
	}
	next();
});


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
