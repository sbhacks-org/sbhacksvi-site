const router = require("express").Router();
const models = require("../models/index");
const passport = require("passport");
const formPost = require("../lib/upload");

router.post("/", (req, res, next) => {
	// Request multipart body gets parsed through multer
	formPost.upload(req, res).then(() => {
		console.log("Files:",req.files); // Remove during production
		passport.authenticate("signup", (err, user, info) => {
			if (err) {
				req.flash("user", err.message);
				return res.redirect("/signup");
			}
			req.logIn(user, (err) => {
				if (err) {
					throw err;
				}
				req.flash("user", "Successfully created an account");
				return res.redirect("/user/dashboard");
			});
		})(req, res, next);
	}).catch((err) => {
		req.flash("user", err.message);
		return res.redirect("/signup");
	});
});

router.get("/", (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect("/user/dashboard");
	}
	res.render("signup", { message: req.flash("user") });
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
