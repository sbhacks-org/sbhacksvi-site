const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.get('/getSignedRequest', (req, res) => {
  res.send('temp');
});

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/user/content');
  }
  res.render('signup');
});

router.post('/', (req, res, next) => {
  console.log(req.body);
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        let newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          filename: req.body['resume-src']
        });
        newUser.save((err) => {
          if(err) {
            console.log(err);
            return res.render('signup', {message: "Unsuccessful on creating an account"});
          }
          return res.render('login', {success: "Successfully created an account"});
        });
    });
  });
});

/*
// multer settings & configuration
const multer = require('multer');
const storageOptions = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'tmp/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({
  storage: storageOptions,
  fileFilter: (req, file, cb) => {
    if(file.size > 4000000) {
      return cb(new Error('File size was too big'));
    }
    if(file.mimetype != 'application/pdf') {
      return cb(new Error('File was not a pdf'));
    }
    cb(null, true);
  },

}).single('resume'); */

module.exports = router;
