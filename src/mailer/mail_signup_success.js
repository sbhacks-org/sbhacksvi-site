#!/usr/bin/env node
const sgMail = require("@sendgrid/mail");
const renderTemplate = require("./renderTemplate");

sgMail.setApiKey(process.env.SENDGRID_KEY);

module.exports.send = (user) => {
	let renderText = renderTemplate("signup_success.txt.ejs", user);
	let renderHTML = renderTemplate("signup_success.ejs", user);

	Promise.all([renderText, renderHTML])
	.then((content) => {
		const message = {
			to: user.email,
			from: "ucsbhacks@gmail.com",
			subject: "SB Hacks IV Application Submitted",
			text: content[0],
			html: content[1]
		};

		sgMail.send(message);
	});
};
