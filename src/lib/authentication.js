const models = require('../models/index');

module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req);
  if (req.isAuthenticated()){
    return next();
  }
  res.status(401).send("Place 401 page here. You do not have access to this page!");
};

module.exports.updateTime = (user) => {
  return new Promise((resolve, reject) => {
    models.user.findOne({
      where: {
        uid: user.uid
      }
    }).then((user) => {
      user.update({
        updatedAt: new Date()
      }).then(() => {
        resolve();
      })
    }).catch((err) => {
      reject(err);
    });
  });

}
