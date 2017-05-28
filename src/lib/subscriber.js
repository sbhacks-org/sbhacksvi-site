const models = require("../models/index");

module.exports.saveSubscriber = (req, res) => {
	models.subscriber.create({
		email: req.body.email
	}).then(() => {
		// Success
		res.json({ success: true });
	}).catch((err) => {
		// Probably already exists
		res.json({ success: false });
		console.error(err);
	});
};