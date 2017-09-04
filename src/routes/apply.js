const router = require("express").Router();

const signupMail = require("../mailer/mail_signup_success");
const isLoggedIn = require("../lib/isLoggedIn");
const { saveApplication, formPostUpload, populateWithApplicationFields } = require("../lib/application");

router.post("/", isLoggedIn, formPostUpload.middleware(), (req, res, next) => {
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
