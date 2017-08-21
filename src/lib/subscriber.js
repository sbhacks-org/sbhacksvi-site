const { Subscriber } = require("../models");

module.exports.saveSubscriber = (req, res) => {
	Subscriber.create({
		email: req.body.email
	}).then(() => {
		res.json({ success: true });
	}).catch((err) => {
		res.json({ success: false });
		console.error(err);
	});
};