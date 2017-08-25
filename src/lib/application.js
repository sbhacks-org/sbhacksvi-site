const efp = require("express-form-post");
const bcrypt = require("bcryptjs");

const { School, User, Application } = require("../models");

module.exports.saveApplication = (req) => {
	const User = req.user;

	return User.createApplication({
		user_id: req.user.id,
		school_id: parseInt(req.body.school),
		resume_url: req.files.resume.Location,
		resume_key: req.files.resume.key,
		transportation: req.body.transportation,
		graduation_year: req.body.graduation_year,
		level_of_study: req.body.level_of_study,
		github: req.body.github || null,
		linkedin: req.body.linkedin || null,
		major: req.body.major,
		phone_number: req.body.phone_number,
		shirt_size: req.body.shirt_size,
		gender: req.body.gender
	});
};

module.exports.formPostUpdate = efp({
	store: "aws-s3",
	maxfileSize: 4194304,
	promise: true,
	filename: function(req, file, cb) {
		req.user.getApplication()
		.then((application) => {
			cb(application.resume_key);
		});
	},
	validateFile: function(file, cb) {
		if(file.mimetype != "application/pdf") {
			return cb(false);
		}
		cb();
	},
	api: {
		bucketName: process.env.S3_BUCKET_NAME,
		ACL: "public-read"
	}
});

module.exports.formPostUpload = efp({
	store: "aws-s3",
	maxfileSize: 4194304,
	promise: true,
	validateBody: function(body, cb) {
		cb();
	},
	validateFile: function(file, cb, skip) {
		if(file.fieldname != "resume") {
			return skip();
		}
		if(file.mimetype != "application/pdf") {
			return cb(new Error("File was not a pdf"));
		}
		cb();
	},
	filename: function(req, file, cb) {
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(Date.now().toString() + file.originalname, salt, (err, hash) => {
				cb(hash.replace(/\//g, "_").substr(0,8) + Date.now() + "\/" + file.originalname);
			});
		});
	},
	api: {
		bucketName: process.env.S3_BUCKET_NAME,
		ACL: "public-read"
	}
});

