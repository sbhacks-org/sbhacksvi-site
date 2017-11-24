const router = require("express").Router();
const passport = require("passport");
const { authSuccessUserState } = require("../lib/auth");

router.post("/login", (req, res, next) => {
	passport.authenticate("login", (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.json({ errors: info });
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			req.user.getApplication()
			.then((application) => {
				let { dataValues: user } = req.user;
				res.json(authSuccessUserState(user, application));
			});
		});
	})(req, res, next);
});

router.delete("/logout", (req, res) => {
	if (req.isAuthenticated()) req.logout();
	return res.json({ success: true });
});

router.post("/signup", (req, res, next) => {
	passport.authenticate("signup", (err, user, info) => {
		if(err) {
			res.status(400);
			return next(err);
		}
		if (!user) { res.status(403); return next(new Error(info.message)); }

		req.logIn(user, (err) => {
			if (err) return next(err);
			return res.json(authSuccessUserState(user));
		});
	})(req, res, next);
});

module.exports = router;
