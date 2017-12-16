#!/usr/bin/env node
const sgMail = require("@sendgrid/mail");
const renderTemplate = require("./renderTemplate");

sgMail.setApiKey(process.env.SENDGRID_KEY);

module.exports.send = (user) => {
	let renderText = renderTemplate("password_reset.txt.ejs", user);
	let renderHTML = renderTemplate("password_reset.ejs", user);

	Promise.all([renderText, renderHTML])
	.then((content) => {
		const message = {
			to: user.email,
			from: "SB Hacks <registration@sbhacks.com>",
			subject: "SB Hacks Password Reset",
			text: content[0],
			html: content[1]
		};

		sgMail.send(message);
	});
};
