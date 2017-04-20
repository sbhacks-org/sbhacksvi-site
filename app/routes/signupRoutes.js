const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

//AWS S3
const aws = require('aws-sdk');

router.get('/getSignedRequest', (req, res) => {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(Date.now().toString(), salt, function(err, hash) {
      const s3 = new aws.S3();
      // Base 64 does not include underscore
      const fileName = hash.replace(/\//g,'_') + '-' + req.query.filename;
      const fileType = req.query.filetype;

      if(fileType != 'application/pdf' || req.query.filesize > 4194304){
        // very weak security measures
        return res.end();
      }

      const s3Params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
      };

      s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
          return res.end();
        }
        const returnData = {
          signedRequest: data,
          url: 'https://'+ process.env.S3_BUCKET_NAME +'.s3.amazonaws.com/' + fileName
        };
        console.log(returnData);
        res.write(JSON.stringify(returnData));
        res.end();
      });
    });
  });
});

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
  console.log(req.body);
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        let newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          resume_url: req.body['resume-src']
        });
        newUser.save((err) => {
          if(err) {
            console.log(err);
            return res.redirect('/signup?status=unsuccessful');
          }
          return res.redirect('/user/login?status=success');
        });
    });
  });
});

// route for validating unique email (/signup/unique)
router.post('/unique', (req, res, next) => {
  let email = req.body.email;
  User.findOne({ 'email': email }, (err, user) => {
    if(err) { throw err; }
    if(user){
      return res.end("no");
    }
    return res.end("yes"); // means yes this is a unique email
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
