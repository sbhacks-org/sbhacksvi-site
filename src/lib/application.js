const efp = require("express-form-post");
const hasha = require("hasha");

const { School } = require("../models");

const resolveWithSchoolId = (school_id, resolve) => {
	if(isNaN(school_id)) {
		School.findOrCreate({
			where: {
				name: school_id
			}
		}).spread((school, created) => {
			resolve(school.id);
		})
		.catch((err) => { throw err; });
	} else {
		resolve(school_id);
	}
}

module.exports.saveApplication = (user, fields) => {
	return new Promise((resolve, reject) => { 
		if(!fields.school_id) return reject({ school_id: "You must specify a school" });
		resolveWithSchoolId(fields.school_id, resolve);
	})
	.then((school_id) => {
		return user.createApplication({
			school_id: school_id,
			transportation: fields.transportation,
			graduation_year: fields.graduation_year,
			level_of_study: fields.level_of_study,
			github: fields.github,
			linkedin: fields.linkedin,
			major: fields.major,
			phone_number: fields.phone_number,
			shirt_size: fields.shirt_size,
			gender: fields.gender,
			dietary_restrictions: fields.dietary_restrictions
		});
	});		
};

module.exports.massageAttrsForUpdate = (attrs) => {
	let newAttrs = Object.assign({}, attrs);
	let forbiddenAttrs = ["user_id", "id", "rsvp", "checked_in", "createdAt", "updatedAt"];
	forbiddenAttrs.forEach((forbiddenAttr) => delete newAttrs[forbiddenAttr]);
	
	return new Promise((resolve, reject) => {
		resolveWithSchoolId(attrs["school_id"], resolve);
	})
	.then(school_id => {
		if(school_id) newAttrs["school_id"] = school_id;
		return newAttrs;
	});
};

let efpValidateFile = (file, cb, skip) => {
	if(file.fieldname != "resume") {
		return skip();
	}
	if(file.mimetype != "application/pdf") {
		return cb({ resume: "You must upload a PDF" });
	}
	cb();
}

module.exports.formPostUpdate = efp({
	store: "aws-s3",
	maxfileSize: {
		msg: { resume: "File size too big" },
		size: 4194304
	},
	promise: true,
	filename: function(req, file, cb) {
		req.user.getApplication()
		.then((application) => {
			cb(application.resume_key);
		});
	},
	validateFile: efpValidateFile,
	api: {
		bucketName: process.env.S3_BUCKET_NAME,
		ACL: "public-read"
	}
});

module.exports.formPostUpload = efp({
	store: "aws-s3",
	promise: true,
	maxfileSize: {
		msg: { resume: "File size too big" },
		size: 4194304
	},
	validateFile: efpValidateFile,
	filename: function(req, file, cb) {
		let full_name = req.user.first_name + req.user.last_name;
		cb(`${hasha(Date.now().toString())}/${full_name}.pdf`);
	},
	api: {
		bucketName: process.env.S3_BUCKET_NAME,
		ACL: "public-read"
	}
});

module.exports.populateWithApplicationFields = (application) => {
	if(!application) {
		return undefined;
	}

	return {
		school_id: application.school_id || "",
		level_of_study: application.level_of_study || "",
		graduation_year: application.graduation_year || "",
		github: application.github || "",
		linkedin: application.linkedin || "",
		major: application.major || "",
		gender: application.gender || "",
		phone_number: application.phone_number || "",
		shirt_size: application.shirt_size || "",
		transportation: application.transportation || "",
		dietary_restrictions: application.dietary_restrictions ? application.dietary_restrictions.split(",") : [],
		resume_url: application.resume_url
	};
};
