import React from "react";

import { Button } from "semantic-ui-react";

const SignupButton = ({ first_name, last_name, email, password }) => {
	let btnProps = {
		color: "blue",
		fluid: true,
		size: "large"
	};
	
	if([first_name, last_name, email, password].includes("") || password.length < 8) btnProps.disabled = true;
	return <Button {...btnProps}>Log In</Button>
};

export default SignupButton;