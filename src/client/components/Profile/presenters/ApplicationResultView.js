import React from "react";
import { Button } from "semantic-ui-react";

const ApplicationResultView = ({ user, application }) => {
	if(application.accepted) {
		return (
			<div>
				<h1>Congratulations, {user.first_name}!</h1>
				<div className="body">
					<p className="body-text">We are thrilled to invite you to SB Hacks IV! We were impressed by your application and can't wait for you to create something extraordinary at the UC Santa Barbara this January 19-21.</p>
					<p className="body-text">Information about buses and travel reimbursement will be emailed out to you soon.</p>
					<p className="body-text">To confirm your registration and save your spot, take a minute to RSVP no later than Sunday, January 14th, 11:59 PM</p>
				</div>
				{
					application.rsvp ?
						<p>Your <strong>RSVP</strong> has been noted. We look forward to seeing you at SB Hacks!</p> :
						<Button fluid color="teal">RSVP</Button>
				}
			</div>
		);
	};

	return (
		<div>
			<h1>{JSON.stringify(application, null, '\t')}</h1>
		</div>
	);
}

export default ApplicationResultView;
