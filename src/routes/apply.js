const router = require("express").Router();
const efp = require("express-form-post");
const passport = require("passport");

const { User, Application } = require("../models");
const signupMail = require("../mailer/mail_signup_success");
const isLoggedIn = require("../lib/isLoggedIn");
const { saveApplication, formPostUpload } = require("../lib/application");

router.post("/", isLoggedIn, formPostUpload.middleware(), (req, res, next) => {
	if(!req.files.resume) return next({ resume: "You must upload a resume" });
	console.log(req.body, req.files);
	saveApplication(req)
	.then((application) => {
		signupMail.send(req.user);
		return res.json({ success: true, application });
	})
	.catch((err) => {
		let errors = {};
		err.errors.forEach((validationError) => errors[validationError.path] = validationError.message);
		return next(errors);
	});
});

router.use("/", (errors, req, res, next) => {
	if(errors instanceof Error) errors = errors.message; 
	console.log("Received errors", errors);
	return res.json({ success: false,  errors });
});

module.exports = router;
