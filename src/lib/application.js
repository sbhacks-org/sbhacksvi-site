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
};

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
			dietary_restrictions: fields.dietary_restrictions,
			essay_answer: fields.essay_answer,
			essay_answer_2: fields.essay_answer_2
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
		essay_answer: application.essay_answer || "",
		essay_answer_2: application.essay_answer_2 || "",
		resume_url: application.resume_url,
		accepted: application.accepted,
		rsvp: application.rsvp
	};
};
