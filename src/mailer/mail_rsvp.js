#!/usr/bin/env node
const sgMail = require("@sendgrid/mail");
const renderTemplate = require("./renderTemplate");

sgMail.setApiKey(process.env.SENDGRID_KEY);

module.exports.send = (user) => {
	let renderText = renderTemplate("rsvp.txt.ejs", user);
	let renderHTML = renderTemplate("rsvp.ejs", user);

	Promise.all([renderText, renderHTML])
	.then((content) => {
		const message = {
			to: user.email,
			from: "SB Hacks <team@sbhacks.com>",
			subject: "SB Hacks V Event Logistics Part 1",
			text: content[0],
			html: content[1]
		};

		sgMail.send(message);
	});
};
