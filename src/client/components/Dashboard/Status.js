import React from "react";
import { Container, Message } from 'semantic-ui-react';

const notAccepted = {
	backgroundColor: '#c74c49',
	color: 'white'
};

const accepted = {
	backgroundColor: '#49c76a',
	color: 'white'
}

const waitlisted = {
	backgroundColor: '#A48AF5',
	color: 'white'
}

const pending = {
	backgroundColor: '#644fb6',
	color: 'white'
}

const Status = ({application}) => {
	if (!application)
	{
		return (
			<Container textAlign='center'>
				<Message className="status_msg">
				    <Message.Header>Incomplete</Message.Header>
			  	</Message>
			</Container>
		);
	}
	if (process.env["decisions_released"] === "true")
	{
		if(application.accepted===true)
		{
			return (
				<Container textAlign='center'>
					<Message className="status_msg" style = {accepted}>
				    	<Message.Header>Accepted</Message.Header>
			  		</Message>
		  		</Container>
			);
		}
		else if (application.accepted===false)
		{
			return (
				<Container textAlign='center'>
					<Message className="status_msg" style = {notAccepted}>
				    	<Message.Header>Not Accepted</Message.Header>
			  		</Message>
			  	</Container>
			);
		}
		else
		{
			return (
				<Container textAlign='center'>
					<Message className="status_msg" style = {waitlisted}>
				    	<Message.Header>Waitlisted</Message.Header>
			  		</Message>
			  	</Container>
			);
		}
	}
	else
	{
		return (
			<Container textAlign='center'>
				<Message className="status_msg" style = {pending}>
			    	<Message.Header>Pending</Message.Header>
		  		</Message>
		  	</Container>
		);
	}
};

export default Status;