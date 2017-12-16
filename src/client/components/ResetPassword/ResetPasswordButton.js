import React from "react";

import { Button } from "semantic-ui-react";

const ResetPasswordButton = ({ email }) => {
	let btnProps = {
		color: "blue",
		fluid: true,
		size: "large"
	};
	
	if([email].includes("")) btnProps.disabled = true;
	return <Button {...btnProps}>Send Reset Link</Button>
};

export default ResetPasswordButton;