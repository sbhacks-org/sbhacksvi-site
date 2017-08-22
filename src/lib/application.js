/*
 * List of signup methods
 * Imported as signUpMethods object by passport-setup.js
 * Should contain validation methods and helpers for saving/updating db
 */

const { School, User, Application } = require("../models");

module.exports.validate = (req, done) => {
	return new Promise((resolve, reject) => {
		// Expecting req.body as parameter
		if (req.body.transportation < 0 || req.body.transportation > 3) {
			req.body.transportation = 0;
		}
		/*
		 * Add validation here. I'll add a dummy one Temporarily
		 * TODO : Add more legit validation
		 */
		if (!req.body.email) {
			return reject({ message: "Please enter a valid email"});
		}

		if(!["S", "M", "L", "XL"].includes(req.body.shirt_size)) {
			return reject({message: "Not a valid shirt size" });
		}
		if(req.body.first_name && req.body.last_name && req.body.email && req.files.resume && req.body.transportation && req.body.graduation_year) {
	    // these are the required fields
		} else {
			return reject({ message: "Missing Fields" });
		}
		if(req.body.linkedin != null && !req.body.linkedin.includes("linkedin")) {
			req.body.linkedin = null;
		}
		if(req.body.github != null && !req.body.github.includes("github")) {
			req.body.github = null;
		}
		return resolve();
	});
};

module.exports.saveApplication = (req) => {
	return Application.create({
		user_id: req.user.id,
		school_id: req.body.school_id || 6,
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