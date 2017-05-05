const router = require('express').Router();
const models = require('../models/index');
const bcrypt = require('bcryptjs');
const methods = require('./methods/signup');

// multerS3 setup
const aws = require('aws-sdk');
const s3 = new aws.S3();
const multerS3 = require('multer-s3');

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
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(Date.now().toString(), salt, (err, hash) => {
        // Setting file name and configuring it to not start new directories since this is base64 encoding
        cb(null, hash.replace(/\//g,'_') + file.originalname);
      });
    });
  }
});

const upload = require('./methods/fileUpload')(storageOptions);

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/user/dashboard');
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

  // Request multipart body gets parsed through multer
  upload(req, res, (err) => {
    // console.log(req.file); // Remove during production
    if(err || !req.file || !methods.validate(req.body)) {
      console.log(err);
      return res.redirect('/signup?status=unsuccessful');
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        methods.saveUser(req, res, hash, models);
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
