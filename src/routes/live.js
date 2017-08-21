const router = require("express").Router();

router.get("/",(req, res) => {
	res.render("live");
});


module.exports = router;
