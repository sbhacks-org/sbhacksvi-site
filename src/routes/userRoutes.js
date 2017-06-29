const router = require("express").Router();
const passport = require("passport");
const updateTime = require("../lib/updateTime");
const isLoggedIn = require("../lib/isLoggedIn");
const efp = require("express-form-post");

router.get("/login", (req, res) => {
	if (req.isAuthenticated()){
		return res.redirect("/user/dashboard");
	}
	if (req.query.status == "unsuccessful") {
		res.locals.message = "Wrong Username or Password. Please try again.";
	}
	if (req.query.status == "success") {
		res.locals.message = "Successfully created an account";
	}
	if(req.query.message) {
		res.locals.message = req.query.message;
	}
	res.render("login");
});

router.post("/login", (req, res, next) => {

	passport.authenticate("login", (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.redirect("/user/login?message=" + info.message);
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
	if (req.query.message) {
		res.locals.message = req.query.message;
	}
	res.render("dashboard", { user: req.user });
});

router.post("/update", isLoggedIn, (req, res, next) => {
	let update_key = req.user.resume_key;
	console.log("update key", update_key);

	const formPost = efp({
		store: "aws-s3",
		promise: true,
		filename: function(originalname) {
			return update_key;
		},
		validateFile: function(cb, fieldname, mimetype) {
			if(mimetype != "application/pdf") {
				return cb(false);
			}
			cb();
		},
		api: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	        bucketName: process.env.S3_BUCKET_NAME,
	        ACL: "public-read"
		}
	});

  	// Request multipart body gets parsed through multer
	formPost.upload(req, res).then(() => {
		console.log(req.files); // Remove during production
		if(Object.keys(req.files) == 0) {
			return res.redirect("/user/dashboard?message=You need to upload a file");
		}
		updateTime(req.user).then(() => {
			console.log("Successfully updated column \'updatedAt\'");
			return res.redirect("/user/dashboard?message=Successfully updated account");
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
