const router = require("express").Router();
const efp = require("express-form-post");
const passport = require("passport");

const { User, Application } = require("../models");
const signupMail = require("../mailer/mail_signup_success");
const isLoggedIn = require("../lib/isLoggedIn");
const { saveApplication, formPostUpload } = require("../lib/application");
const populateWithApplicationFields = require("../lib/populateWithApplicationFields");

router.post("/", isLoggedIn, formPostUpload.middleware(), (req, res, next) => {
	
	console.log(req.body, req.files);
	saveApplication(req.user, req.files, req.body)
	.then((application) => {
		signupMail.send(req.user);
		return res.json({ success: true, application: populateWithApplicationFields(application) });
	})
	.catch((err) => {
		return next(err);
	});
});

module.exports = router;
