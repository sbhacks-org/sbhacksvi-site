const router = require("express").Router();
const models = require("../models/index");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// multerS3 setup
const aws = require("aws-sdk");
const s3 = new aws.S3();
const multerS3 = require("multer-s3");
const storageOptions = multerS3({
	s3: s3,
	acl: "public-read",
	bucket: process.env.S3_BUCKET_NAME,
	contentType: (req, file, cb) => {
    // Forcing content type to be PDF to be viewable in browser by S3
		cb(null, "application/pdf");
	},
	metadata: (req, file, cb) => {
		cb(null, { fieldName: file.fieldname });
	},
	key: function (req, file, cb) {
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(Date.now().toString() + file.originalname, salt, (err, hash) => {
        // Setting file name and configuring it to not start new directories since this is base64 encoding
				cb(null, hash.replace(/\//g,"_") + "\/" + file.originalname);
			});
		});
	}
});

let upload = require("../lib/upload")(storageOptions);

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

router.post("/", (req, res, next) => {

  // Request multipart body gets parsed through multer
	upload(req, res, (err) => {
		console.log("File:",req.file); // Remove during production
		if(err) {
			return next(err);
		}
		if(!req.file) {
			return res.redirect("/signup?status=unsuccessful");
		}

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
	});

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
