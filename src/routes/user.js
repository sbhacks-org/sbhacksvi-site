const router = require("express").Router();
const isLoggedIn = require("../lib/isLoggedIn");

router.get("/dashboard", isLoggedIn, (req, res) => {
	req.user.getApplication().then((application) => {
		res.locals.application = application;
		res.render("dashboard");
	});
});

router.use("/update", (err, req, res, next) => {
	throw err; // temporary
});

module.exports = router;
