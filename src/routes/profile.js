const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const router = require("express").Router();

const passwordResetMail = require("../mailer/mail_password_reset");
const { User } = require("../models");
const isLoggedIn = require("../lib/isLoggedIn");
const {
	massageAttrsForUpdate,
	populateWithApplicationFields
} = require("../lib/application");

router.post("/update", isLoggedIn, (req, res, next) => {
	const { Application } = req.user;

	massageAttrsForUpdate(req.body)
	.then(attributes => {
		Application.updateAttributes(attributes)
		.then((application) => {
			res.json({
				success: true,
				application: populateWithApplicationFields(application),
				message: {
					type: "success",
					header: "Successfully updated your application",
					content: "You can continue to update application until 1/1/17"
				}
			});
		})
		.catch((err) => next(err));
	});	
});

router.post("/reset-password", (req, res, next) => {
	User.findOne({ where: { email: req.body.email } })
	.then((user) => {
		if(!user) {
			res.json({
				message: {
					type: "failure",
					header: "Invalid Email",
					content: "No such user with that email exists."
				}
			});
		} else {
			user.updateAttributes({
				passwordResetToken: crypto.randomBytes(20).toString("hex"),
				passwordResetTokenExpires: Date.now() + 1000 * 30
			})
			.then((user) => {
				passwordResetMail.send(user);

				res.json({
					message: {
						type: "success",
						header: "Token Sent",
						content: "A reset link has been sent to your email"
					}
				});
			});
		}		
	})
	.catch(next);
});

router.post("/reset-password/:token", (req, res, next) => {
	if(!req.body.password || req.body.password.length < 8) {
		return res.status(400).json({ errors: { password: "must be at least 8 characters long" } });
	}

	User.findOne({ where: { passwordResetToken: req.params.token } })
	.then((user) => {
		if(!user || user.passwordResetTokenExpires < new Date()) {
			res.json({
				message: {
					type: "failure",
					header: "Invalid Reset Token",
					content: "Your token may have expired, please try again."
				}
			});
		} else {
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(req.body.password, salt, (err, password_digest) => {
					user.updateAttributes({
						password: password_digest,
						passwordResetToken: null,
						passwordResetTokenExpires: null
					})
					.then((user) => {
						res.json({
							message: {
								type: "success",
								header: "Successfully updated password",
								content: "You should be able to log in with your new credentials."
							}
						});
					});
				});
			});
		}		
	})
	.catch(next);
});

module.exports = router;
