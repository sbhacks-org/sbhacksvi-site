module.exports = (req, res, next) => {
	if (req.isAuthenticated()){
		return next();
	}
	res.status(403);
	next(new Error("You do not have access to this page."));
};
