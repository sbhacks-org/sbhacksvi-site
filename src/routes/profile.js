const router = require("express").Router();

const isLoggedIn = require("../lib/isLoggedIn");
const {
	formPostUpdate,
	massageAttrsForUpdate,
	populateWithApplicationFields
} = require("../lib/application");

router.post("/update", isLoggedIn, formPostUpdate.middleware(), (req, res, next) => {
	const { Application } = req.user;

	let attributes = massageAttrsForUpdate(req.body);

	Application.updateAttributes(attributes)
	.then((application) => {
		res.json({
			success: true,
			application: populateWithApplicationFields(application),
			message: {
				type: "success",
				header: "Successfully updated your application",
				content: "You can continue to update application until 12/1/17"
			}
		});
	})
	.catch((err) => next(err));
	
});

module.exports = router;
