const efp = require("express-form-post");
const bcrypt = require("bcryptjs");

const { School, User, Application } = require("../models");

module.exports.saveApplication = (req) => {
	const User = req.user;

	return User.createApplication({
		user_id: req.user.id,
		school_id: parseInt(req.body.school_id),
		resume_url: req.files.resume.Location || null,
		resume_key: req.files.resume.key || null,
		transportation: req.body.transportation || null,
		graduation_year: req.body.graduation_year || null,
		level_of_study: req.body.level_of_study || null,
		github: req.body.github || null,
		linkedin: req.body.linkedin || null,
		major: req.body.major || null,
		phone_number: req.body.phone_number || null,
		shirt_size: req.body.shirt_size || null,
		gender: req.body.gender || null
	});
};

module.exports.massageAttrsForUpdate = (attrs) => {
	let newAttrs = Object.assign({}, attrs);
	let forbiddenAttrs = ["user_id", "resume_key", "resume_url", "id", "rating", "checked_in", "createdAt", "updatedAt"]
	forbiddenAttrs.forEach((forbiddenAttr) => delete newAttrs[forbiddenAttr]);
	return newAttrs;
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
			return cb(JSON.stringify({ resume: "File must be a PDF" }));
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

