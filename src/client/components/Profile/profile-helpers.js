module.exports.populateWithApplicationFields = (application) => {
	return {
		school: application.school || "",
		level_of_study: application.level_of_study || "",
		graduation_year: application.graduation_year.toString() || "",
		github: application.github || "",
		linkedin: application.linkedin || "",
		major: application.major || "",
		gender: application.gender || "",
		phone_number: application.phone_number || "",
		shirt_size: application.shirt_size || "",
		transportation: application.transportation || "",
		resume: ""
	}
};