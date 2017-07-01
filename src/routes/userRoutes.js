const router = require("express").Router();
const passport = require("passport");
const updateTime = require("../lib/updateTime");
const isLoggedIn = require("../lib/isLoggedIn");
const efp = require("express-form-post");
const formPost = efp({
	store: "aws-s3",
	promise: true,
	filename: function(req, file, cb) {
		cb(req.user.resume_key);
	},
	validateFile: function(fieldname, mimetype, cb) {
		if(mimetype != "application/pdf") {
			return cb(false);
		}
		cb();
	},
	api: {
		bucketName: process.env.S3_BUCKET_NAME,
		ACL: "public-read"
	}
});
router.get("/login", (req, res) => {
	if (req.isAuthenticated()){
		return res.redirect("/user/dashboard");
	}
	res.render("login", { message: req.flash("user") });
});

router.post("/login", (req, res, next) => {

	passport.authenticate("login", (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			req.flash("login", info.message)
			return res.redirect("/user/login");
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			return res.redirect("/user/dashboard");
		});
	})(req, res, next);

});

router.get("/logout", (req, res) => {
	if (req.isAuthenticated()) {
		console.log("logging out");
		req.logout();
		return res.redirect("/");
	} else {
		return res.send("You aren't even logged in");
	}
});

router.get("/dashboard", isLoggedIn, (req, res) => {
	res.render("dashboard", {
		user: req.user,
		message: req.flash("user")
	});
});

router.post("/update", isLoggedIn, (req, res, next) => {
	// Request multipart body gets parsed through multer
	formPost.upload(req, res).then(() => {
		console.log(req.files); // Remove during production
		if(Object.keys(req.files) == 0) {
			req.flash("user", "You need to upload a file");
			return res.redirect("/user/dashboard?message=You need to upload a file");
		}
		updateTime(req.user).then(() => {
			console.log("Successfully updated column \'updatedAt\'");
			req.flash("user", "Successfully updated account");
			return res.redirect("/user/dashboard");
		}).catch((err) => {
			console.log(err);
			next(err);
		});
	}).catch((err) => {
		console.log(err);
		res.status(300).send("Error");
		
	});

});

module.exports = router;
