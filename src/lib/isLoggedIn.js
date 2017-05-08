module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req);
  if (req.isAuthenticated()){
    return next();
  }
  res.status(401).send("Place 401 page here. You do not have access to this page!");
};
