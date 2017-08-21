const router = require("express").Router();
const isLoggedIn = require("../lib/isLoggedIn");

router.get("/dashboard", isLoggedIn, (req, res) => res.render("dashboard"));

router.use("/update", (err, req, res, next) => {
	throw err; // temporary
});

module.exports = router;
