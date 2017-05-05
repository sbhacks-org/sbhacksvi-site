module.exports.validate = (reqBody) => {
  // Expecting req.body as parameter
  if (reqBody.transportation < 0 || reqBody.transportation > 3) {
    reqBody.transportation = 0;
  }

  return true;
}

module.exports.saveUser = (req, res, hash, models) => {
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
      schoolId: school.dataValues.id,
      transportation: req.body.transportation,
      year: req.body.year
    }).then(() => {
      res.redirect('./user/login?status=success');
    }).catch((err) => {
      console.log(err);
      res.redirect('/signup?status=unsuccessful');
    });
  });
}
