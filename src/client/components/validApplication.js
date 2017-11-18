export const invalidResume = (resume) => {
	return !resume || resume.size > 4194304 || resume.type !== "application/pdf";
}

export const isValidBasedOnTextFields = (fields) => {
	let required_fields = [
		fields.school_id,
		fields.level_of_study,
		fields.graduation_year,
		fields.major,
		fields.shirt_size,
		fields.transportation
	];

	if(required_fields.includes("")) {
		return false;
	}
	return true;
};