const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const signUpMethods = require("../lib/signup");
const models = require("../models/index");
const bcrypt = require("bcryptjs");

module.exports = () => {

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
			if(user){
				return done(null, user);
			}
			return done(new Error("I hope this error gets handled"), false);
		}).catch((err) => {
			return done(new Error(err.message), false);
		});
	});

	passport.use("login", new LocalStrategy({
		usernameField: "email",
		passwordField: "password"
	}, (username, password, done) => {
		models.user.findOne({
			where: {
				email: username
			}
		}).then((user) => {
      // console.log("Found", user);
			if (!user) {
				return done(new Error("No such user with email " + username + " exists"), false);
			}
			bcrypt.compare(password, user.password, (err, res) => {
				if (err) { throw err; }
				if (res) {
					return done(null, user);
				}
				else {
					return done(new Error("invalid password"), false);
				}
			});
		});
	}));

	passport.use("signup", new LocalStrategy({
		passReqToCallback: true,
		usernameField: "email",
		passwordField: "password"
	}, (req, username, password, done) => {

		if(signUpMethods.validate(req, done)){
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(req.body.password, salt, (err, hash) => {
					signUpMethods.saveUser(req, hash, done);
				});
			});
		}

	}));

	return passport;
};
