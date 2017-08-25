const router = require("express").Router();
const efp = require("express-form-post");
const passport = require("passport");

const { User, Application } = require("../models");
const signupMail = require("../mailer/mail_signup_success");
const updateTime = require("../lib/updateTime");
const isLoggedIn = require("../lib/isLoggedIn");
const { saveApplication, formPostUpload, formPostUpdate } = require("../lib/application");

router.post("/", isLoggedIn, formPostUpload.middleware(), (req, res, next) => {
	console.log(req.body, req.files);
	saveApplication(req)
	.then((application) => {
		// signupMail.send(req.user);
		return res.json({ success: true });
	})
	.catch((err) => {
		let errors = {};
		err.errors.forEach((validationError) => errors[validationError.path] = validationError.message);
		return next(errors);
	});
});

router.use("/", (errors, req, res, next) => {
	return res.json({ errors });
});

router.post("/update", isLoggedIn, formPostUpdate.middleware(), (req, res, next) => {
	console.log(req.files); // Remove during production
	
	/*
	if(Object.keys(req.files) == 0) {
		req.flash("info", "You need to upload a file");
		return res.redirect("/dashboard");
	}
	updateTime(req.user).then(() => {
		req.flash("info", "Successfully updated account");
		return res.redirect("/dashboard");
	}).catch((err) => {
		console.log(err);
		next(err);
	});
	*/
});

router.use("/update", (err, req, res, next) => {
	throw err; // temporary
});

module.exports = router;
