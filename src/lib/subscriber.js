const Subscriber = require("../models/index").subscriber;

module.exports.saveSubscriber = (req, res) => {
	Subscriber.create({
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