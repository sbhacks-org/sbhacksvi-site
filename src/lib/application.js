const efp = require("express-form-post");
const hasha = require("hasha");

const { School, User, Application } = require("../models");

module.exports.saveApplication = (user, files, fields) => {
	const User = user;

	if(!files.resume) return Promise.reject({ resume: "You must upload a resume" });
	if(!fields.school_id) return Promise.reject({ school_id: "You must specify a school" });

	console.log(fields);

	return User.createApplication({
		school_id: fields.school_id,
		resume_url: files.resume.Location,
		resume_key: files.resume.key,
		transportation: fields.transportation,
		graduation_year: fields.graduation_year,
		level_of_study: fields.level_of_study,
		github: fields.github,
		linkedin: fields.linkedin,
		major: fields.major,
		phone_number: fields.phone_number,
		shirt_size: fields.shirt_size,
		gender: fields.gender
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
			return cb("File was not a pdf");
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
			return cb("File was not a pdf");
		}
		cb();
	},
	filename: function(req, file, cb) {
		let full_name = req.user.first_name + req.user.last_name;
		cb(`${hasha(Date.now().toString())}/${full_name}.pdf`);
	},
	api: {
		bucketName: process.env.S3_BUCKET_NAME,
		ACL: "public-read"
	}
});

