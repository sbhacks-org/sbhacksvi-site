const models = require('../models/index');

module.exports = (user) => {
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
