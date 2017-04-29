const router = require('express').Router();
const models = require('../models/index');
const bcrypt = require('bcryptjs');

//AWS S3
const aws = require('aws-sdk');
const s3 = new aws.S3();

// multer settings & configuration
const multer = require('multer');
const multerS3 = require('multer-s3');
const storageOptions = multerS3({
  s3: s3,
  acl: 'public-read',
  bucket: process.env.S3_BUCKET_NAME,
  contentType: function(req, file, cb){
    // Forcing content type to be PDF to be viewable in browser by S3
    cb(null, 'application/pdf');
  },
  metadata: function (req, file, cb) {
    cb(null, {fieldName: file.fieldname});
  },
  key: function (req, file, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(Date.now().toString(), salt, function(err, hash) {
        // Setting file name and configuring it to not start new directories since this is base64 encoding
        cb(null, hash.replace(/\//g,'_') + file.originalname);
      });
    });
  }
});
const upload = multer({
  storage: storageOptions,
  limits: { fileSize: 4194304 },
  fileFilter: (req, file, cb) => {
    if(file.mimetype != 'application/pdf') {
      return cb(new Error('File was not a pdf'));
    }
    cb(null, true);
  },

}).single('resume');

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/user/content');
  }
  if (req.query.status == "unsuccessful"){
    return res.render('signup', { message: "Error in creating account."})
  }
  res.render('signup');
});

router.post('/', (req, res, next) => {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  upload(req, res, (err) => {
    console.log(req.file);
    if(err || !req.file) {
      console.log(err);
      return res.redirect('/signup?status=unsuccessful');
    }
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        models.user.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hash,
          resume_url: req.file.location
        }).then(() => {
          res.redirect('./user/login?status=success');
        }).catch((err) => {
          console.log(err);
          res.redirect('/signup?status=unsuccessful');
        });
      });
    });
  });
});


// route for validating unique email (/signup/unique)
router.post('/unique', (req, res, next) => {
  let email = req.body.email;
  models.user.findOne({
    where: {
      email: req.body.email
    }
  }).then((result) => {
    if(result){
      return res.json({ unique: "no" });
    }
    return res.json({ unique: "yes" });
  }).catch((err) => {
    throw err;
  });

});

module.exports = router;
