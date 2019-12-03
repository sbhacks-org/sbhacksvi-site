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
	app.get("/",(req, res) => {
		res.render("landingpage");
	});
	

	let proc_links = [
		{ proc_env_key: "BUS_SCHEDULE", link: "/buses" },
		{ proc_env_key: "SLACK_JOIN_URL", link: "/slack" },
		{ proc_env_key: "WORKSHOP_LINK", link: "/workshop" },
		{ proc_env_key: "VOLUNTEER_LINK", link: "/volunteers" },
		{ proc_env_key: "MENTOR_LINK", link: "/mentors" },
		{ proc_env_key: "ORGANIZER_APPLY_LINK", link: "/organizers" },
		{ proc_env_key: "FB_EVENT_LINK", link: "/fb-event" },
		{ proc_env_key: "TOILETRIES_STUDY_LINK", link: "/toiletries-study" },
		{ proc_env_key: "SLIDE_DECK_LINK", link: "/sponsors-slidedeck" },
	];

	proc_links.forEach(({ proc_env_key, link }) => app.get(link, (req, res) => res.redirect(process.env[proc_env_key])));

	if(process.env.only_landing) app.use((req, res) => res.redirect("/"));

	app.use("/", authRoutes);
	if(process.env["apps_released"] === "true") {
		app.use("/apply", applyRoutes);
	}
	app.use("/profile", applicationRoutes);
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
