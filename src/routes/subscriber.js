const router = require("express").Router();
const subscriberMethods = require("../lib/subscriber");

router.post("/", (req, res) => {
	console.log(req.body);
	subscriberMethods.saveSubscriber(req, res);
});

module.exports = router;