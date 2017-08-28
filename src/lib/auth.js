const populateWithApplicationFields = (application) => {
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
		resume_url: application.resume_url
	}
};

module.exports.authSuccessUserState = (user, application) => {
	let user_info = {
		first_name: user.first_name,
		last_name: user.last_name,
		email: user.email
	};

	return {
		isAuthenticated: true,
		applicationFields: populateWithApplicationFields(application),
		info: user_info
	};
};