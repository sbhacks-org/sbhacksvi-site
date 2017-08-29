import React from "react";

import { Button } from "semantic-ui-react";

const LoginButton = ({ email, password }) => {
	let btnProps = {
		color: "blue",
		fluid: true,
		size: "large"
	};
	
	if([email, password].includes("") || password.length < 8) btnProps.disabled = true;
	return <Button {...btnProps}>Log In</Button>
};

export default LoginButton;