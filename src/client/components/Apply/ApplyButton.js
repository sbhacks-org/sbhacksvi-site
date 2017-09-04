import React from "react";

import { Button } from "semantic-ui-react";

function invalidResume(resume) {
	return !resume || resume.size > 4194304 || resume.type !== "application/pdf";
}

const ApplyButton = ({ school_id, level_of_study, graduation_year, major, resume, shirt_size }) => {
	let required_fields = [school_id, level_of_study, graduation_year, major, shirt_size];

	let btnProps = {
		color: "blue",
		fluid: true,
		size: "large"
	};
	
	if(required_fields.includes("") || invalidResume(resume)) btnProps.disabled = true;
	return <Button {...btnProps}>Submit Application</Button>
};

export default ApplyButton;