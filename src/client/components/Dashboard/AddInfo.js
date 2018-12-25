import React from "react";
import { Button, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

//comment for redeploy

const AddInfo = ({info, application, rsvpAction, cancelRsvpAction}) => {

	if (application)
	{
		if (process.env["decisions_released"] === "true")
		{
			var rsvpDiv;
			if (application.rsvp === null)
			{
				rsvpDiv =
					<div>
						<Button fluid color="teal" onClick={rsvpAction}>RSVP</Button>
						<Button fluid color="teal" onClick={cancelRsvpAction}>I will not be attending</Button>
					</div>;
			}
			else if (application.rsvp === true)
			{
				rsvpDiv = <p className="body-text">Your <strong>RSVP</strong> has been noted. We look forward to seeing you at SB Hacks!</p>;
			}
			else
			{
				rsvpDiv = <p className="body-text">Thank you for letting us know you will not be attending this year. Hope to see you at the next SBHacks!</p>;
			}
			if (application.accepted===true)
			{
				return (
					<div className="body">
						<p className="body-text">Congratulations, {info.first_name}! We are thrilled to invite you to SB Hacks V! We were impressed by your application and can't wait for you to create something extraordinary at UC Santa Barbara this January 11-13.</p>
						<p className="body-text">Information about buses and travel reimbursement will be emailed out to you soon.</p>
						<p className="body-text">We received an overwhelming 1,700+ applications this year for our limited 450 spots. To confirm your registration and save your spot, take a minute to <strong>RSVP</strong> no later than <strong>Friday, January 4th, 11:59 PM</strong>. If you will not be attending, please let us know as well so your spot can be given to a waitlisted hacker.</p>
						{ rsvpDiv }
					</div>
				);
			}
			else if (application.accepted===false)
			{
				return (
					<div className="body">
						<p className="body-text">Unfortunately, we are unable to offer you admission to SB Hacks V. We had an overwhelming 1,700+ applications this year for our limited 450 spots. We encourage you to apply next year. Best of luck!</p>
					</div>
				);
			}
			else
			{
				return (
					<div className="body">
						<p className="body-text">We are currently reviewing your application. If you don't see an update by January 4th, please email us at <a href="mailto:team@sbhacks.com">team@sbhacks.com</a></p>
					</div>
				);
			}
		}
		else
		{
			return (
				<div>
					<div className="body">
						<p className="body-text">We are currently reviewing your application. If you don't see an update by January 4th, please email us at <a href="mailto:team@sbhacks.com">team@sbhacks.com</a></p>
					</div>
					{
						process.env["apps_released"] === "true" ?
						(
							<Container textAlign='center'>
								<Link to="/edit" id="apply-link"><Button color="blue">Edit Application</Button></Link>
							</Container>
						) : null
					}
				</div>
			);			
		}
	}
	else
	{
		return (
			<div>
				<div className="body">
					<p className="body-text">You have not yet applied. Applications are due December 20th.</p>
					<Container textAlign='center'>
						<Link to="/apply" id="apply-link"><Button color="blue">Start Application</Button></Link>
					</Container>
				</div>

			</div>
		);
	}
};

export default AddInfo;