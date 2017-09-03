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
const apiRoutes = require(path.join(__dirname, "api"));

const { authSuccessUserState } = require("../lib/auth");

function convertValidationError(err) {
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

	app.use("/", authRoutes);
	app.use("/apply", applyRoutes);
	app.use("/profile", applicationRoutes);
	app.use("/", userRoutes);
	app.use("/live", liveRoutes);
	app.use("/api", apiRoutes);

	// React SPA for everything but the landing page
	app.get("*", (req, res) => {
		if(req.isAuthenticated()) {
			let { dataValues: user, Application } = req.user;
			res.locals.preloadedState = { user: authSuccessUserState(user, Application) };
		}
		res.render("index");
	});

	app.use("*", (err, req, res, next) => {
		if(err instanceof ValidationError) return res.json({ success: false, errors: convertValidationError(err) })

		console.log(err);

		if(err instanceof Error || err instanceof DatabaseError) {
			return res.json({
				message: {
					type: "failure",
					header: "Something went wrong internally.",
					content: "Please contact us at ucsbhacks@gmail.com"
				}
			});
		} 
		return res.json({ success: false, errors: err });
	});
};
