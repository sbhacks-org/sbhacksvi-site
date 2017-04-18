const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', (req, res) => {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        let newUser = new User({
          name: req.body.full_name,
          email: req.body.email,
          password: hash
        });
        newUser.save((err) => {
          if(err) { throw err; }
          res.render('login', {success: "Successfully created an account"});
        });
    });
  });
});

module.exports = router;
