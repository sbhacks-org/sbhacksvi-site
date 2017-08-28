const router = require("express").Router();
const passport = require("passport");
const efp = require("express-form-post");

const isLoggedIn = require("../lib/isLoggedIn");
const { User } = require("../models");
const { authSuccessUserState } = require("../lib/auth");

router.post("/login", (req, res, next) => {
	passport.authenticate("login", (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.json({ isAuthenticated: false, errors: info });
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			req.user.getApplication()
			.then((application) => {
				let { dataValues: user } = req.user;
				res.json(authSuccessUserState(user, application));
			})
		});
	})(req, res, next);
});

router.get("/logout", (req, res) => {
	if (req.isAuthenticated()) {
		console.log("logging out");
		req.logout();
		return res.redirect("/");
	} else {
		return res.send("You aren't even logged in");
	}
});

router.post("/signup", (req, res, next) => {
	passport.authenticate("signup", (err, user, info) => {
		if(err) {
			let errors = {};
			err.errors.forEach((validationError) => errors[validationError.path] = validationError.message);
			return next(errors);
		}
		if (!user) return next(new Error(info.message));
		req.logIn(user, (err) => {
			if (err) return next(err);
			return res.json({ isAuthenticated: true });
		});
	})(req, res, next);
});

// efp error catcher
router.use("/signup", (errors, req, res, next) => {
	return res.json({ errors, isAuthenticated: false });
});

router.get("/signup", (req, res) => {
	if (req.isAuthenticated()) return res.redirect("/dashboard");
	res.render("signup");
});

module.exports = router;
