/*
 * List of signup methods
 * Imported as signUpMethods object by passport-setup.js
 * Should contain validation methods and helpers for saving/updating db
 */

const models = require("../models");

module.exports.validate = (req, done) => {
	console.log(req.body);
  // Expecting req.body as parameter
	if (req.body.transportation < 0 || req.body.transportation > 3) {
		req.body.transportation = 0;
	}
	console.log("Entered validate function");
  /*
   * Add validation here. I'll add a dummy one Temporarily
   * TODO : Add more legit validation
   */
	if (!req.body.email) {
		done(null, false, { message: "Please enter a valid email" });
		return false;
	}
	if(req.body.shirt_size != "S" && req.body.shirt_size != "M" && req.body.shirt_size != "L" && req.body.shirt_size != "XL") {
		done(null, false, { message: "Not a valid shirt size" });
		return false;
	}
	if (req.body.first_name && req.body.last_name && req.body.email && req.files.resume.Location && req.body.transportation && req.body.graduation_year) {
    // these are the required fields
	} else {
		done(null, false, { message: "Missing Fields" });
		return false;
	}
	if(req.body.linkedin != null && !req.body.linkedin.includes("linkedin")) {
		req.body.linkedin = null;
	}
	if(req.body.github != null && !req.body.github.includes("github")) {
		console.log("github link:", req.body.github);
		req.body.github = null;
	}
	return true;
};

module.exports.saveUser = (req, hash, done) => {
	models.school.findOne({
		where: {
			name: "UC Santa Barbara" // Temporarily set as UC Santa Barbara
		}
	}).then((school) => {
		models.user.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: hash,
			resume_url: req.files.resume.Location,
			resume_key: req.files.resume.key,
			schoolId: school.dataValues.id,
			transportation: req.body.transportation,
			graduation_year: req.body.graduation_year,
			level_of_study: req.body.level_of_study,
			github: req.body.github,
			linkedin: req.body.linkedin,
			major: req.body.major,
			phone_number: req.body.phone_number,
			shirt_size: req.body.shirt_size,
			gender: req.body.gender
		}).then((user) => {
			return done(null, user, { message: "Successfully created an account" });
		}).catch((err) => {
			return done(err, false);
		});
	});
};
