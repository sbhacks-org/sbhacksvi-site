import React from "react";
import { Message } from "semantic-ui-react";

const Banner = ({ message, onDismiss }) => {
	if(message) {
		return (
			<Message
				success={message.type === "success"}
				negative={message.type === "negative"}
				attached
				onDismiss={onDismiss}
				header={message.header}
				content={message.content}
			/> 
		);
	} else {
		return null;
	}
}

export default Banner;
