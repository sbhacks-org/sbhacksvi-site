const router = require("express").Router();
const aws = require("aws-sdk");
const s3 = new aws.S3();

const signupMail = require("../mailer/mail_signup_success");
const isLoggedIn = require("../lib/isLoggedIn");
const { saveApplication, formPostUpload, populateWithApplicationFields } = require("../lib/application");

router.post("/", isLoggedIn, (req, res, next) => {
	saveApplication(req.user, req.body)
	.then((application) => {
		signupMail.send(req.user);
		return res.json({ success: true, application: populateWithApplicationFields(application) });
	})
	.catch((err) => {
		return next(err);
	});
});

router.get("/sign-s3", isLoggedIn, (req, res, next) => {
	let fileName = req.user.id + ".pdf";
	const s3Params = {
		Bucket: process.env.S3_BUCKET_NAME,
		Key: fileName,
		Expires: 120,
		ContentType: "application/pdf",
		ACL: "public-read"
	};

	s3.getSignedUrl("putObject", s3Params, (err, data) => {
		if(err) throw err;
		res.end(data);
	});
});

module.exports = router;
