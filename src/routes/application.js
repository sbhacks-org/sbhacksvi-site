const router = require("express").Router();
const efp = require("express-form-post");

const { User, Application } = require("../models");
const passport = require("passport");
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
	.catch((err) => console.log(err));
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

// efp error catcher
router.use("/", (err, req, res, next) => {
	throw err;
	return res.json({ errors: err });
});

module.exports = router;
