import React from "react";

import { Button } from "semantic-ui-react";

const ChangePasswordButton = ({ password }) => {
	let btnProps = {
		color: "blue",
		fluid: true,
		size: "large"
	};
	
	if([password].includes("")) btnProps.disabled = true;
	return <Button {...btnProps}>Change Password</Button>
};

export default ChangePasswordButton;