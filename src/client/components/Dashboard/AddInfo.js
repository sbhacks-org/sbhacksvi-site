import React from "react";
import { Button, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const AddInfo = ({info, application, rsvpAction, cancelRsvpAction}) => {

	if (application)
	{
		if (process.env["decisions_released"] === "true")
		{
			var rsvpDiv = <div></div>;
			if (application.rsvp === null)
			{
				if (process.env["rsvp_open"] === "true")
				{
					rsvpDiv =
						<div>
							<Button fluid color="teal" onClick={rsvpAction}>RSVP</Button>
							<Button fluid color="red" onClick={cancelRsvpAction}>I will not be attending</Button>
						</div>;
				}
			}
			else if (application.rsvp === true)
			{
				if (process.env["rsvp_open"] === "true")
				{
					rsvpDiv = 
						<div>
							<p className="body-text">Your <strong>RSVP</strong> has been noted. We look forward to seeing you at SB Hacks! If you can no longer attend, let us know below.</p>
							<Button fluid color="red" onClick={cancelRsvpAction}>I will not be attending</Button>
						</div>;
				}
				else
				{
					rsvpDiv = 
						<div>
							<p className="body-text">Your <strong>RSVP</strong> has been noted. We look forward to seeing you at SB Hacks!</p>
						</div>;
				}
			}
			else
			{
				if (process.env["rsvp_open"] === "true")
				{
					rsvpDiv = 
						<div>
							<p className="body-text">Thank you for letting us know you will not be attending this year. Hope to see you at the next SB Hacks! If you change your mind and can still attend, let us know below.</p>
							<Button fluid color="teal" onClick={rsvpAction}>RSVP</Button>
						</div>;
				}
				else
				{
					rsvpDiv = 
						<div>
							<p className="body-text">Thank you for letting us know you will not be attending this year. Hope to see you at the next SB Hacks!</p>
						</div>;
				}
			}
			if (application.accepted===true)
			{
				var rsvpPrompt=<div></div>
				
				if (process.env["rsvp_open"] === "true")
				{
					rsvpPrompt =
						<div>
							<p className="body-text">We received an overwhelming 2,100+ applications this year and only 450 spots available. To confirm your registration and save your spot, take a minute to <strong>RSVP</strong> no later than <strong>Tuesday, January 8th</strong>. If you will not be attending, please let us know as well so we can open up more spots for others.</p>
							<p className="body-text">If you decide to RSVP, head on over to our facebook event page at <a href="http://www.sbhacks.com/fb-event" target="_blank">www.sbhacks.com/fb-event</a> and click "Going"!</p>
							<p className="body-text">You can also join other hackers and receive updates through our event slack at <a href="http://www.sbhacks.com/slack" target="_blank">www.sbhacks.com/slack</a></p>
						</div>;
				}
				else
				{
					if (application.rsvp===true)
					{
						rsvpPrompt =
							<div>
								<p className="body-text">We received an overwhelming 2,100+ applications this year and only 450 spots available.</p>
								<p className="body-text">Head on over to our facebook event page at <a href="http://www.sbhacks.com/fb-event" target="_blank">www.sbhacks.com/fb-event</a> and click "Going"!</p>
								<p className="body-text">You can also join other hackers and receive updates through our event slack at <a href="http://www.sbhacks.com/slack" target="_blank">www.sbhacks.com/slack</a></p>
							</div>;
					}
					else
					{
						rsvpPrompt =
							<div>
								<p className="body-text">We received an overwhelming 2,100+ applications this year and only 450 spots available. Unfortunately, you just missed the deadline to RSVP on Tuesday, January 8th. Email us at <a href="mailto:team@sbhacks.com">team@sbhacks.com</a> if you have any questions or concerns!</p>
							</div>;
					}
				}
				return (
					<div className="body">
						<p className="body-text">Congratulations, {info.first_name}! We are thrilled to invite you to SB Hacks V! We were impressed by your application and can't wait for you to create something extraordinary at SB Hacks this January 11-13.</p>
						<p className="body-text">Information about buses and travel reimbursement will be emailed out to you soon.</p>
						{ rsvpPrompt }
						<br />
						{ rsvpDiv }
					</div>
				);
			}
			else if (application.accepted===false)
			{
				return (
					<div className="body">
						<p className="body-text">Unfortunately, we are unable to offer you admission to SB Hacks V. We had an overwhelming 2,100+ applications this year and only 450 spots available. We encourage you to apply next year. Best of luck!</p>
					</div>
				);
			}
			else
			{
				return (
					<div className="body">
						<p className="body-text">Due to the overwhelming 2100+ applications we received this year, we are unfortunately unable to guarantee you a spot for SB Hacks V. However, given that you're nearby, we would like for you to join us if a spot opens up. We'll be sending you an email soon on what you can do to receive admission to SB Hacks V.</p>
					</div>
				);
			}
		}
		else
		{
			return (
				<div>
					<div className="body">
						<p className="body-text">We are currently reviewing your application. If you don't see an update by January 5th, please email us at <a href="mailto:team@sbhacks.com">team@sbhacks.com</a></p>
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
					<p className="body-text">You have not yet applied. Applications are due December 1st.</p>
					<Container textAlign='center'>
						<Link to="/apply" id="apply-link"><Button color="blue">Start Application</Button></Link>
					</Container>
				</div>

			</div>
		);
	}
};

export default AddInfo;