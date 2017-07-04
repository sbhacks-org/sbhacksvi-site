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
	res.render("login");
});

router.post("/login", (req, res, next) => {
	passport.authenticate("login", (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			req.flash("info", info.message);
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

router.get("/dashboard", isLoggedIn, (req, res) => res.render("dashboard"));


router.use("/update", isLoggedIn, formPost.middleware(), (req, res, next) => {
	console.log(req.files); // Remove during production
	if(Object.keys(req.files) == 0) {
		req.flash("info", "You need to upload a file");
		return res.redirect("/user/dashboard");
	}
	updateTime(req.user).then(() => {
		req.flash("info", "Successfully updated account");
		return res.redirect("/user/dashboard");
	}).catch((err) => {
		console.log(err);
		next(err);
	});
});

router.use("/update", (err, req, res, next) => {
	throw err; // temporary
});

module.exports = router;
