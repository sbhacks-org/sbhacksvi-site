import React from "react";
import { Button } from "semantic-ui-react";

const ApplicationResultView = ({ user, application, rsvpAction }) => {
	if(application.accepted) {
		return (
			<div>
				<h1>Congratulations, {user.first_name}!</h1>
				<div className="body">
					<p className="body-text">We are thrilled to invite you to SB Hacks IV! We were impressed by your application and can't wait for you to create something extraordinary at UC Santa Barbara this January 19-21.</p>
					<p className="body-text">Information about buses and travel reimbursement will be emailed out to you soon.</p>
					<p className="body-text">We received an overwhelming 2100+ applications this year for our limited 500 spots. To confirm your registration and save your spot, take a minute to RSVP no later than Friday, January 12th, 11:59 PM.</p>
				</div>
				{
					application.rsvp ?
						<p>Your <strong>RSVP</strong> has been noted. We look forward to seeing you at SB Hacks!</p> :
						<Button fluid color="teal" onClick={rsvpAction}>RSVP</Button>
				}
			</div>
		);
	}

	return (
		<div>
			<h1>Application Status: <strong>In Review</strong></h1>
			<div className="body">
				<p className="body-text">Hello! We are currently reviewing your application. If you don't see an update by January 12th, please email us at <a href="mailto:team@sbhacks.com">team@sbhacks.com</a></p>
			</div>
		</div>
	);
}

export default ApplicationResultView;
