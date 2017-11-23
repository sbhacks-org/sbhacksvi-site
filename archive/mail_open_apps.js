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
		let subscriberPromises = [];
		subscribers.forEach((subscriber) => {
			if(subscriber.notified == true) return;
			subscriberPromises.push(new Promise((res, rej) => {
				const message = {
					to: subscriber.email,
					from: "SB Hacks <team@sbhacks.com>",
					subject: "SB Hacks IV Applications are OPEN!!",
					text: content[0],
					html: content[1]
				};

				sgMail.send(message)
				.then(info => {
					subscriber.update({ notified: true }).then(res);
				});
			}));
		});


		Promise.all(subscriberPromises).then(process.exit);
	})
	.catch((err) => {
		throw err;
	});
});
