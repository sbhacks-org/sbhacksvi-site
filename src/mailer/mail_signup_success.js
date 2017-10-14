#!/usr/bin/env node
const transporter = require("./transporter");
const renderTemplate = require("./renderTemplate");

module.exports.send = (user) => {
	let renderText = renderTemplate("signup_success.txt.ejs", user);
	let renderHTML = renderTemplate("signup_success.ejs", user);

	Promise.all([renderText, renderHTML])
	.then((content) => {
		const message = {
			to: user.email,
			subject: "SB Hacks IV Application Submitted",
			text: content[0],
			html: content[1]
		};

		transporter.sendMail(message, (err, info) => {
			if(err) throw err;	
			console.log("Message successfully sent");
			console.log(info);
			transporter.close();
		});
	});
};
