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
const defaultRoutes = require(path.join(__dirname, "default"));
const userRoutes = require(path.join(__dirname, "user"));
const authRoutes = require(path.join(__dirname, "auth"));
const applicationRoutes = require(path.join(__dirname, "application"));
const liveRoutes = require(path.join(__dirname, "live"));
const subscriberRoutes = require(path.join(__dirname, "subscriber"));

module.exports = (app) => {
	
	app.use((req, res, next) => {
		res.locals.message = req.flash("info");
		res.locals.user = req.user;
		next();
	});

	// Merely just for current deployment
	app.use("/subscribe", subscriberRoutes);
	if(process.env.NODE_ENV == "production") {
		app.use((req, res) => {
			// Universal catcher; Disable other routes for now
			res.render("index");
		});
	}

	app.use("/", defaultRoutes);
	app.use("/", authRoutes);
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
