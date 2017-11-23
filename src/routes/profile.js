const router = require("express").Router();

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

module.exports = router;
