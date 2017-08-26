const router = require("express").Router();
const efp = require("express-form-post");
const passport = require("passport");

const { User, Application } = require("../models");
const signupMail = require("../mailer/mail_signup_success");
const isLoggedIn = require("../lib/isLoggedIn");
const { saveApplication, formPostUpdate } = require("../lib/application");

router.post("/update", isLoggedIn, formPostUpdate.middleware(), (req, res, next) => {
	console.log(req.files); // Remove during production
	
	if(Object.keys(req.files) == 0) {
		req.flash("info", "You need to upload a file");
		return res.redirect("/dashboard");
	}
});

router.use("/update", (err, req, res, next) => {
	throw err; // temporary
});

module.exports = router;
