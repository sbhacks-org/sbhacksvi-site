const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models/index");
const bcrypt = require("bcryptjs");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findOne({
		where: {
			id
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
	User.findOne({
		where: {
			email: email
		}
	}).then((user) => {
		if (!user) {
			return done(null, false, { message: "Invalid credentials" });
		}
		bcrypt.compare(password, user.password, (err, res) => {
			if (err) { done(err); }
			if (res) {
				return done(null, user);
			}
			else {
				return done(null, false, { message: "Invalid credentials" });
			}
		});
	});
}));

passport.use("signup", new LocalStrategy({
	passReqToCallback: true,
	usernameField: "email",
	passwordField: "password"
}, (req, email, password, done) => {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(req.body.password, salt, (err, password_digest) => {
			const { first_name, last_name, email } = req.body;
			User.create({
				first_name,
				last_name,
				email,
				password: password_digest
			}).then((user) => {
				return done(null, user);
			}).catch((err) => {
				return done(err);
			});
		});
	});
}));

module.exports = passport;