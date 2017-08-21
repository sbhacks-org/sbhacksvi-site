const router = require("express").Router();
const efp = require("express-form-post");

const { User } = require("../models");
const passport = require("passport");
const signupMail = require("../mailer/mail_signup_success");
const updateTime = require("../lib/updateTime");
const isLoggedIn = require("../lib/isLoggedIn");

const formPostNew = require("../lib/upload");
const formPostUpdate = efp({
	store: "aws-s3",
	promise: true,
	filename: function(req, file, cb) {
		cb(req.user.resume_key);
	},
	validateFile: function(file, cb) {
		if(file.mimetype != "application/pdf") {
			return cb(false);
		}
		cb();
	},
	api: {
		bucketName: process.env.S3_BUCKET_NAME,
		ACL: "public-read"
	}
});

router.post("/", formPostNew.middleware(), (req, res, next) => {
	signupMail.send(user);
	req.flash("info", "Successfully submitted an application");
	return res.redirect("/dashboard");
});

router.put("/", isLoggedIn, formPostUpdate.middleware(), (req, res, next) => {
	console.log(req.files); // Remove during production
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
});

// efp error catcher
router.use("/", (err, req, res, next) => {
	req.flash("info", err.message);
	return res.redirect("/application");
});

module.exports = router;
