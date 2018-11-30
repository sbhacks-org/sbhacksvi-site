import React from "react";

import { Button } from "semantic-ui-react";
import { isValidBasedOnTextFields, invalidResume  } from "../applicationHelper";

const ApplyButton = (fields) => {

	let btnProps = {
		color: "blue",
		fluid: true,
		size: "large"
	};
	
	let mlhChecked = fields.mlh && fields.share_mlh;

	if(!mlhChecked || !isValidBasedOnTextFields(fields) || invalidResume(fields.resume)) btnProps.disabled = true;

	return <Button {...btnProps}>Save Application</Button>
};

export default ApplyButton;