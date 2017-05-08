/*
 * Function to check if user is authenticated
 * May be a future exploration to expand on this more
 */

module.exports = (req, res, next) => {
  if (req.isAuthenticated()){
    return next();
  }
  res.status(401).send("Place 401 page here. You do not have access to this page!");
};
