#!/usr/bin/env node
const sgMail = require("@sendgrid/mail");
const renderTemplate = require("./renderTemplate");
const fs = require('fs');

sgMail.setApiKey(process.env.SENDGRID_KEY);

module.exports.send = (user) => {
	let renderText = renderTemplate("signup_success.txt.ejs", user);
	let renderHTML = renderTemplate("signup_success.ejs", user);

	Promise.all([renderText, renderHTML])
	.then((content) => {
		const message = {
			to: user.email,
			from: "SB Hacks <registration@sbhacks.com>",
			subject: "SB Hacks VI Application Submitted",
			text: content[0],
			html: content[1]
		};

		sgMail.send(message);
	});
};
