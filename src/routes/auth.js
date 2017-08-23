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
			return res.json({
				isAuthenticated: false,
				errors: {
					email: "Wrong username/password combination",
					password: "Wrong username/password combination"
				}
			});
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			return res.json({ isAuthenticated: true });
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
		if (err || !user) return next(err.errors[0] || new Error(info.message));
		req.logIn(user, (err) => {
			if (err) return next(err);
			return res.json({ message: "Successfully created an account" });
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
