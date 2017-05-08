/*
 * List of signup methods
 * Generally imported as signMethods object by passport-setup.js
 * Should contain validation methods and helpers for saving/updating db
 */

const models = require('../models');

module.exports.validate = (req, done) => {
  // Expecting req.body as parameter
  if (req.body.transportation < 0 || req.body.transportation > 3) {
    req.body.transportation = 0;
  }
  console.log("Entered validate function");
  /*
   * Add validation here. I'll add a dummy one Temporarily
   * TODO : Add more legit validation
   */
  if (!req.body.email) {
    done(null, false, { message: 'Please enter a valid email' });
    return false;
  }
  if (req.body.first_name && req.body.last_name && req.body.email && req.file.location && req.body.transportation && req.body.year) {

  } else {
    // all good
    return false;
  }
  return true;
}

module.exports.saveUser = (req, hash, done) => {
  models.school.findOne({
    where: {
      name: 'UC Santa Barbara' // Temporarily set as UC Santa Barbara
    }
  }).then((school) => {
    models.user.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hash,
      resume_url: req.file.location,
      resume_key: req.file.key,
      schoolId: school.dataValues.id,
      transportation: req.body.transportation,
      year: req.body.year
    }).then((user) => {
      return done(null, user);
    }).catch((err) => {
      console.log(err);
      return done(null, false, { message: 'Could not create account. User did not provide correct fields' })
    });
  });
}
