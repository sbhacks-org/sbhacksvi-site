export const invalidResume = (resume) => {
	return resume !== "success";
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

export const sendApplicationXHR = function(fields, endpoint) {
	this.open("POST", endpoint);

	var formData = {};
	
	Object.keys(fields).forEach((field_name) => {
		let field_val = fields[field_name];
		if(Array.isArray(field_val)) {
			field_val = field_val.join(",");
		}
		formData[field_name] = field_val || null;
	});

	this.setRequestHeader("Content-Type", "application/json");

	this.send(JSON.stringify(formData));
}