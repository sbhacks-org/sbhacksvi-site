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
const { ValidationError, DatabaseError } = require("sequelize");

const userRoutes = require(path.join(__dirname, "user"));
const authRoutes = require(path.join(__dirname, "auth"));
const applyRoutes = require(path.join(__dirname, "apply"));
const applicationRoutes = require(path.join(__dirname, "profile"));
const liveRoutes = require(path.join(__dirname, "live"));
const subscriberRoutes = require(path.join(__dirname, "subscriber"));

const { authSuccessUserState } = require("../lib/auth");

function convertValidationError(err, res) {
	let errors = {};
	err.errors.forEach((validationError) => errors[validationError.path] = validationError.message);
	return errors;
}

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
			let { dataValues: user, Application } = req.user;
			res.locals.preloadedState = { user: authSuccessUserState(user, Application) };
		}
		res.render("index");
	});

	app.use("/", authRoutes);
	app.use("/apply", applyRoutes);
	app.use("/profile", applicationRoutes);
	app.use("/", userRoutes);
	app.use("/live", liveRoutes);

	app.use("*", (err, req, res, next) => {
		console.log(err);
		if(err instanceof ValidationError) {
			err = convertValidationError(err, res);
		}
		if(err instanceof DatabaseError) {
			res.json({ success: false, globalMessage: "Something went wrong internally." });
		}
		if(err instanceof Error) err = err.message; 
		return res.json({ success: false, errors: err });
	});
};
