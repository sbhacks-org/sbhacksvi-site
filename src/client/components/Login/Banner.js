import React from "react";
import { Message } from "semantic-ui-react";

const Banner = ({ errors, onDismiss }) => {
	return (
		Object.keys(errors).length > 0 ? 
			<Message
				negative
				attached
				onDismiss={onDismiss}
				header="Wrong username/password combination"
				content="Please try again."
			/> : null
	);
}

export default Banner;
