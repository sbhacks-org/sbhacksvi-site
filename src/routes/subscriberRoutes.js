const router = require('express').Router();
const subscriberMethods = require('../lib/subscriber');

router.post('/', (req, res) => {
	subscriberMethods.saveSubscriber(req, res);
});

module.exports = router;