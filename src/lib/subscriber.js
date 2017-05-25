const models = require("../models/index");

module.exports.saveSubscriber = (req, res) => {
	models.subscriber.create({
		email: req.body.email
	}).then(() => {
		// Success
		res.send("Successfully subscribed!");
	}).catch((err) => {
		// Probably already exists
		res.send("Email already registered");
		console.error(err);
	});
};