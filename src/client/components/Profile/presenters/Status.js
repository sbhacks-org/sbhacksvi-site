import React from "react";
import { Container, Message } from 'semantic-ui-react';



const Status = ({application}) => {
	if (!application)
	{
		return (
			<Container textAlign='center'>
				<Message>
				    <Message.Header>Incomplete</Message.Header>
			  	</Message>
			</Container>
		);
	}
	if (process.env["decisions_released"] === "true")
	{
		if(application.accepted)
		{
			return (
				<Container textAlign='center'>
					<Message>
				    	<Message.Header>Accepted</Message.Header>
			  		</Message>
		  		</Container>
			);
		}
		else
		{
			return (
				<Container textAlign='center'>
					<Message>
				    	<Message.Header>Not Accepted</Message.Header>
			  		</Message>
			  	</Container>
			);
		}
	}
	else
	{
		return (
			<Container textAlign='center'>
				<Message>
			    	<Message.Header>Pending</Message.Header>
		  		</Message>
		  	</Container>
		);
	}
};

export default Status;