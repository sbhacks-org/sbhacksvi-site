import React from "react";
import { Message } from "semantic-ui-react";

const Banner = ({ errors, onDismiss }) => {
	let errorKeys = Object.keys(errors);
	if(errorKeys.length) {
		let list = [];
		errorKeys.forEach((key) => list.push(errors[key]));
		return (
			<Message
				negative
				attached
				onDismiss={onDismiss}
				header="Wrong username/password combination"
				list={list}
			/> 
		);
	} else {
		return null;
	}
}

export default Banner;
