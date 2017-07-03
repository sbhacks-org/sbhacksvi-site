const router = require("express").Router();
const models = require("../models/index");
const passport = require("passport");
const formPost = require("../lib/upload");

router.post("/", formPost.middleware(), (req, res, next) => {
	passport.authenticate("signup", (err, user, info) => {
		if (err) return next(err);
		req.logIn(user, (err) => {
			if (err) return next(err);
			req.flash("info", info.message);
			return res.redirect("/user/dashboard");
		});
	})(req, res, next);
});

// efp error catcher
router.use("/", (err, req, res, next) => {
	req.flash("info", err.message);
	return res.redirect("/signup");
});

router.get("/", (req, res) => {
	if (req.isAuthenticated()) return res.redirect("/user/dashboard");
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
