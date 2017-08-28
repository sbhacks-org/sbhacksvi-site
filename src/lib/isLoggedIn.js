module.exports = (req, res, next) => {
	if (req.isAuthenticated()){
		return next();
	}
	next(new Error("You do not hav access to this page."));
};
