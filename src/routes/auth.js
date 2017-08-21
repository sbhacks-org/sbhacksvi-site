const router = require("express").Router();
const passport = require("passport");
const updateTime = require("../lib/updateTime");
const isLoggedIn = require("../lib/isLoggedIn");
const efp = require("express-form-post");
const { User } = require("../models");

router.get("/login", (req, res) => {
	if (req.isAuthenticated()){
		return res.redirect("/dashboard");
	}
	res.render("login");
});

router.post("/login", (req, res, next) => {
	passport.authenticate("login", (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			req.flash("info", info.message);
			return res.redirect("/auth/login");
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			return res.redirect("/dashboard");
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
		if (err || !user) return next(err || info.message);
		req.logIn(user, (err) => {
			if (err) return next(err);
			req.flash("info", "Successfully created an account");
			return res.redirect("/dashboard");
		});
	})(req, res, next);
});

// efp error catcher
router.use("/signup", (err, req, res, next) => {
	req.flash("info", err.message);
	return res.redirect("/signup");
});

router.get("/signup", (req, res) => {
	if (req.isAuthenticated()) return res.redirect("/dashboard");
	res.render("signup");
});

module.exports = router;
