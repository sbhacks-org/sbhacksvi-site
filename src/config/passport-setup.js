const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const signUpMethods = require("../lib/signup");
const models = require("../models/index");
const bcrypt = require("bcryptjs");

passport.serializeUser((user, done) => {
	console.log("serialize");
	done(null, user.uid);
});

passport.deserializeUser((id, done) => {
	console.log("deserialize");
	models.user.findOne({
		where: {
			uid: id
		}
	}).then((user) => {
		done(null, user);
	}).catch((err) => {
		return done(err, undefined);
	});
});

passport.use("login", new LocalStrategy({
	usernameField: "email",
	passwordField: "password"
}, (email, password, done) => {
	models.user.findOne({
		where: {
			email: email
		}
	}).then((user) => {
		if (!user) {
			return done(null, false, { message: "No such user with email " + email + " exists" });
		}
		bcrypt.compare(password, user.password, (err, res) => {
			if (err) { done(err); }
			if (res) {
				return done(null, user);
			}
			else {
				return done(null, false, { message: "invalid password" });
			}
		});
	});
}));

passport.use("signup", new LocalStrategy({
	passReqToCallback: true,
	usernameField: "email",
	passwordField: "password"
}, (req, email, password, done) => {
	signUpMethods.validate(req, done)
	.then(() => {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(req.body.password, salt, (err, password_digest) => {
				signUpMethods.saveUser(req, password_digest, done);
			});
		});
	})
	.catch((info) => {
		done(null, false, info);
	});
}));

module.exports = passport;