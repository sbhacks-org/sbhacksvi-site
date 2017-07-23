const router = require("express").Router();
const User = require("../models/index").user;
const passport = require("passport");
const formPost = require("../lib/upload");
const signupMail = require("../mailer/mail_signup_success");

router.post("/", formPost.middleware(), (req, res, next) => {
	passport.authenticate("signup", (err, user, info) => {
		if (err || !user) return next(err || info.message);
		signupMail.send(user);
		req.logIn(user, (err) => {
			if (err) return next(err);
			req.flash("info", "Successfully created an account");
			return res.redirect("/dashboard");
		});
	})(req, res, next);
});

// efp error catcher
router.use("/", (err, req, res, next) => {
	req.flash("info", err.message);
	return res.redirect("/signup");
});

router.get("/", (req, res) => {
	if (req.isAuthenticated()) return res.redirect("/dashboard");
	res.render("signup");
});

// route for validating unique email (/signup/unique)
router.post("/unique", (req, res) => {
	User.findOne({
		where: {
			email: req.body.email
		}
	}).then((result) => {
		if(result){
			return res.json({ unique: false });
		}
		return res.json({ unique: true });
	}).catch((err) => {
		throw err;
	});

});

module.exports = router;
