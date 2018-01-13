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

const authRoutes = require(path.join(__dirname, "auth"));
const applyRoutes = require(path.join(__dirname, "apply"));
const applicationRoutes = require(path.join(__dirname, "profile"));
const liveRoutes = require(path.join(__dirname, "live"));
const apiRoutes = require(path.join(__dirname, "api"));

const { authSuccessUserState } = require("../lib/auth");

function convertValidationError(err) {
	let errors = {};
	err.errors.forEach((validationError) => errors[validationError.path] = validationError.message);
	return errors;
}

module.exports = (app) => {
	if(app.get("env") === "development") {
		app.get("/",(req, res) => {
			res.render("landingpage");
		});
	}

	app.use("/", authRoutes);
	if(process.env["apps_released"] === "true") {
		app.use("/apply", applyRoutes);
	}
	app.use("/profile", applicationRoutes);
	app.use("/live", liveRoutes);
	app.use("/api", apiRoutes);

	app.get("/volunteers", (req, res) => {
		res.redirect("https://docs.google.com/forms/d/e/1FAIpQLScB37DuLFbGOG-VO87IxeVhuHgc_awYTLGmiaQSB1VE7kYEEw/viewform")
	});

	if(process.env["WORKSHOP_LINK"]) {
		app.get("/workshop", (req, res) => res.redirect(process.env["WORKSHOP_LINK"]));
	}

	if(process.env["SLACK_JOIN_URL"]) {
		app.get("/join-slack", (req, res) => res.redirect(process.env["SLACK_JOIN_URL"]));
	}

	if(process.env["BUS_SCHEDULE"]) {
		app.get("/buses", (req, res) => res.redirect(process.env["BUS_SCHEDULE"]));
	}

	// React SPA for everything but the landing page
	app.get("*", (req, res) => {
		if(req.isAuthenticated()) {
			let { dataValues: user, Application } = req.user;
			res.locals.preloadedState = { user: authSuccessUserState(user, Application) };
		}
		res.render("index");
	});

	app.use("*", (err, req, res, next) => {
		console.log(err);
		if(err instanceof ValidationError) {
			return res.json({ success: false, errors: convertValidationError(err) });
		}

		if(err instanceof Error || err instanceof DatabaseError) {
			return res.json({
				message: {
					type: "failure",
					header: "Something went wrong internally.",
					content: "Please contact us at team@sbhacks.com"
				}
			});
		} 
		return res.json({ success: false, errors: err });
	});
};
