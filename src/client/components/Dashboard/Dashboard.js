import React from "react";
import Status from "./Status";
import AddInfo from "./AddInfo";
import { Button, Container, Divider, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";

const Dashboard = ({info, application}) => {
	return (
		<div className = "dash">
			<div className = "status">
				<Container textAlign='center'>
					<h1>Your Status:</h1>
				</Container>
				<Status application={application}/>
			</div>
			<Divider />
			<h1 className = "hello">Hello {info.first_name},</h1>
			<AddInfo
				info = {info}
				application={application}
			/>
		</div>
	);
};

/*<h1>Hello {info.first_name},</h1>
				<h2>Status:</h2>
			<div className = "status">
				<Status application={application}/>
			</div>
			<AddInfo application={application}/>*/

export default Dashboard;