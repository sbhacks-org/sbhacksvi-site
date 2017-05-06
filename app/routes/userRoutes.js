const router = require('express').Router();
const passport = require('passport');
const methods = require('./methods/authentication');
const aws = require('aws-sdk');
const s3 = new aws.S3();
const multerS3 = require('multer-s3');

router.get('/login', (req, res) => {
  if (req.isAuthenticated()){
    return res.redirect('/user/dashboard');
  }
  if (req.query.status == "unsuccessful") {
    res.locals.message = "Wrong Username or Password. Please try again.";
  }
  if (req.query.status == "success") {
    res.locals.message = "Successfully created an account";
  }
  if(req.query.message) {
    res.locals.message = req.query.message;
  }
  res.render('login');
});

router.post('/login', (req, res, next) => {

  passport.authenticate("login", (err, user, info) => {
    if (err) {
      console.log("here");
      return next(err);
    }
    if (!user) {
      return res.redirect('/user/login?message=' + info.message);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/user/dashboard');
    });
  })(req, res, next);

});

router.get('/logout', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('logging out');
    req.logout();
    return res.redirect('/');
  } else {
    return res.send("You aren't even logged in");
  }
});

router.get('/dashboard', methods.isLoggedIn, (req, res) => {
  if (req.query.message) {
    res.locals.message = req.query.message;
  }
  res.render('dashboard', { user: req.user });
});

router.post('/update', methods.isLoggedIn, (req, res) => {
  let update_key = req.user.resume_key;
  console.log('update key', update_key);

  let storageOptions = multerS3({
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
      cb(null, update_key);
    }
  });

  let upload = require('./methods/fileUpload')(storageOptions);

  // Request multipart body gets parsed through multer
  upload(req, res, (err) => {
    console.log(req.file); // Remove during production

    if(err || !req.file) {
      console.log(err);
      return res.redirect('/user/dashboard');
    }
    methods.updateTime(req.user).then(() => {
      console.log("Successfully updated column updatedAt");
      return res.redirect('/user/dashboard?message=Successfully updated account');
    }).catch((err) => {
      console.log(err);
      next(err);
    });
  });

});

module.exports = router;
