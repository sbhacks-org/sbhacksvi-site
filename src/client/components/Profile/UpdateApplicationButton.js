import React from "react";
import { Button } from "semantic-ui-react";

const UpdateApplicationButton = ({ originalApplication, fields}) => {
	if(JSON.stringify(originalApplication) !== JSON.stringify(fields)) {
		return <Button fluid color="blue">Update Application</Button>
	} else {
		return null;
	}
}

export default UpdateApplicationButton;
