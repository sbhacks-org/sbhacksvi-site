const router = require('express').Router();
const passport = require('passport');
const models = require('../models/index');
const aws = require('aws-sdk');
const s3 = new aws.S3();
const multerS3 = require('multer-s3');

router.get('/login', (req, res) => {
  if (req.isAuthenticated()){
    return res.redirect('/user/content');
  }
  if (req.query.status == "unsuccessful"){
    return res.render('login', { message: "Wrong Username or Password. Please try again." });
  }
  if (req.query.status == "success"){
    return res.render('login', { message: "Successfully created an account" });
  }
  res.render('login');
});

router.post('/login', passport.authenticate("local", {failureRedirect: '/user/login?status=unsuccessful'}), (req, res) => {
  console.log('redirecting to /content');
  res.redirect('/user/dashboard');
});

router.get('/logout', (req, res) => {
  console.log('logging out')
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next){
  // console.log(req);
  if (req.isAuthenticated()){
    return next();
  }
  res.status(401).send('You cannot access this page');
}

router.get('/dashboard', isLoggedIn, (req, res) => {
  console.log('loaded up content');
  res.render('dashboard', { user: req.user });
});

router.post('/update', isLoggedIn, (req, res) => {
  const update_url = req.user.resume_url;

  const storageOptions = multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: process.env.S3_BUCKET_NAME,
    contentType: (req, file, cb) => {
      // Forcing content type to be PDF to be viewable in browser by S3
      cb(null, 'application/pdf');
    },
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, update_url);
    }
  });

  const upload = require('./methods/fileUpload')(storageOptions);

  // Request multipart body gets parsed through multer
  upload(req, res, (err) => {
    // console.log(req.file); // Remove during production
    if(err || !req.file) {
      console.log(err);
      return res.redirect('/dashboard');
    }
  });

});

module.exports = router;
