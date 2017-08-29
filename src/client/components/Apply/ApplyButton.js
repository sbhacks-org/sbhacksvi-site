import React from "react";

import { Button } from "semantic-ui-react";

function invalidResume(resume) {
	return !resume || resume.size > 4194304 || resume.type !== "application/pdf";
}

const ApplyButton = ({ school_id, resume }) => {
	let btnProps = {
		color: "blue",
		fluid: true,
		size: "large"
	};
	
	if([school_id].includes("") || invalidResume(resume)) btnProps.disabled = true;
	return <Button {...btnProps}>Submit Application</Button>
};

export default ApplyButton;