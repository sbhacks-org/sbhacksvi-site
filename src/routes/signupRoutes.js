const router = require("express").Router();
const models = require("../models/index");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const efp = require("express-form-post");
const formPost = efp({
	store: "aws-s3",
	maxfileSize: 4194304,
	promise: true,
	validateBody: function(cb, body) {
		cb();
	},
	validateFile: function(cb, fieldname, mimetype) {
		if(fieldname != "resume") {
			return cb(false);
		}
		if(mimetype != "application/pdf") {
			return cb(false);
		}
		cb();
	},
	filename: function(originalname) {
		return Date.now() + '-' + originalname;
	},
	api: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        bucketName: process.env.S3_BUCKET_NAME,
        ACL: "public-read"
	}
});

router.post("/", (req, res, next) => {

  	// Request multipart body gets parsed through multer
	formPost.upload(req, res).then(() => {
		console.log("Files:",req.files); // Remove during production
		passport.authenticate("signup", (err, user, info) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.redirect("/signup?message=" + info.message);
			}
			req.logIn(user, (err) => {
				if (err) {
					return next(err);
				}
				// TODO Change this redirect into a successfully created account page
				return res.redirect("/user/dashboard?message=" + info.message);
			});
		})(req, res, next);
	}).catch((err) => {
		return res.redirect("/signup?status=unsuccessful");
	});
});

router.get("/", (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect("/user/dashboard");
	}
	if (req.query.status == "unsuccessful"){
		return res.render("signup", { message: "Error in creating account."});
	}
	if (req.query.message) {
		res.locals.message = req.query.message;
	}
	res.render("signup");
});

// route for validating unique email (/signup/unique)
router.post("/unique", (req, res) => {
	models.user.findOne({
		where: {
			email: req.body.email
		}
	}).then((result) => {
		if(result){
			return res.json({ unique: "no" });
		}
		return res.json({ unique: "yes" });
	}).catch((err) => {
		throw err;
	});

});

module.exports = router;
