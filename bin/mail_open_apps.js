#!/usr/bin/env node

const mail_path = "../src/mailer";

const path = require("path");
const transporter = require(path.join(mail_path, "transporter"));
const renderTemplate = require(path.join(mail_path, "renderTemplate"));
const { Subscriber } = require("../src/models");

Subscriber.findAll({})
.then((subscribers) => {
	subscribers.forEach((subscriber) => {
		if(subscriber.notified == true) return;
		let renderText = renderTemplate("open_apps.txt.ejs");
		let renderHTML = renderTemplate("open_apps.ejs");
		Promise.all([renderText, renderHTML])
		.then((content) => {
			const message = {
				to: subscriber.email,
				subject: "SB Hacks IV Applications are OPEN!!",
				text: content[0],
				html: content[1]
			};

			transporter.sendMail(message, (err, info) => {
				if(err) console.log(err);	
				console.log(info);
				subscriber.update({ notified: true }).then(() => transporter.close());
			});
		});
	});
})
.catch((err) => {
	throw err;
});
