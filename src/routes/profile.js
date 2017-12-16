const crypto = require("crypto");
const router = require("express").Router();

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
				success: false,
				message: {
					type: "success",
					header: "Invalid Email",
					content: "No such user with that email exists."
				}
			});
		} else {
			user.updateAttributes({
				passwordResetToken: crypto.randomBytes(20).toString("hex"),
				passwordResetTokenExpires: Date.now() + 60 * 60 * 1000
			})
			.then((user) => {
				res.json({
					success: true,
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

module.exports = router;
