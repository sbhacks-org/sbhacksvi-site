const router = require("express").Router();

router.get("/",(req, res) => {
	console.log(process.env.live_open);
	if (process.env.live_open === "true")
	{	
		console.log('in true');
		res.render("live");
	}
	else
	{
		console.log("redirected here");
		res.redirect("/");
	}
});


module.exports = router;
