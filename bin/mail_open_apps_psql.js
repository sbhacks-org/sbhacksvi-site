#!/usr/bin/env node
require("dotenv").config();

const mail_path = "../src/mailer";

const path = require("path");
const sgMail = require("@sendgrid/mail");
const renderTemplate = require(path.join(mail_path, "renderTemplate"));
const { Subscriber } = require("../src/models");

let renderText = renderTemplate("open_apps.txt.ejs");
let renderHTML = renderTemplate("open_apps.ejs");

sgMail.setApiKey(process.env.SENDGRID_KEY);

Promise.all([renderText, renderHTML])
.then((content) => {
	Subscriber.findAll({})
	.then((subscribers) => {
		const message = {
			to: subscribers.map(subscriber => subscriber.email),
			from: "SB Hacks <team@sbhacks.com>",
			subject: "SB Hacks V Applications are OPEN!!",
			text: content[0],
			html: content[1]
		};
		console.log(message);
		//sgMail.sendMultiple(message)
		//.then(process.exit);
	})
	.catch((err) => {
		throw err;
	});
});
