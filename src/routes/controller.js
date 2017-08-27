/*
 * This is the main controller for routes
 * All imports of component routes go here and are configured here
 */
const aws = require("aws-sdk");
aws.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const path = require("path");
const userRoutes = require(path.join(__dirname, "user"));
const authRoutes = require(path.join(__dirname, "auth"));
const applyRoutes = require(path.join(__dirname, "apply"));
const applicationRoutes = require(path.join(__dirname, "application"));
const liveRoutes = require(path.join(__dirname, "live"));
const subscriberRoutes = require(path.join(__dirname, "subscriber"));

const { authSuccessUserState } = require("../lib/auth");

module.exports = (app) => {

	// Merely just for current deployment
	app.use("/subscribe", subscriberRoutes);
	if(process.env.NODE_ENV == "production") {
		app.use((req, res) => {
			// Universal catcher; Disable other routes for now
			res.render("landingpage");
		});
	}

	app.get("/",(req, res) => {
		res.render("landingpage");
	});

	// React SPA for everything but the landing page
	app.get("*", (req, res) => {
		if(req.isAuthenticated()) {
			let { dataValues: user, application } = req.user;
			res.locals.preloadedState = { user: authSuccessUserState(user, application) };
		}
		res.render("index");
	});

	app.use("/", authRoutes);
	app.use("/apply", applyRoutes);
	app.use("/application", applicationRoutes);
	app.use("/", userRoutes);
	app.use("/live", liveRoutes);

	// Somewhat Error handling for development purposes
	app.use((req, res) => {
		console.log("Invalid URL processed: ", req.url);
		res.status(404).render("404", {url: req.url});
	});

	app.use((err, req, res, next) => {
		console.log("Entered universal error handler");
		console.log(err);
		res.send("Something went wrong page.");
	});
};
