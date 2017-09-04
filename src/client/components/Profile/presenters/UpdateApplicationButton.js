import React from "react";
import { Button } from "semantic-ui-react";

import { isValidBasedOnTextFields } from "../../validApplication";

const UpdateApplicationButton = ({ originalApplication, fields}) => {
	if(isValidBasedOnTextFields(fields) && JSON.stringify(originalApplication) !== JSON.stringify(fields)) {
		return <Button fluid color="blue">Update Application</Button>
	} else {
		return null;
	}
}

export default UpdateApplicationButton;
