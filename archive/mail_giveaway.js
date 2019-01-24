#!/usr/bin/env node
require("dotenv").config();

const mail_path = "../src/mailer";

const readline = require("readline");
const path = require("path");
const sgMail = require("@sendgrid/mail");
const renderTemplate = require(path.join(mail_path, "renderTemplate"));
const { sequelize } = require("../src/models");

let renderText = renderTemplate("giveaway_email.txt.ejs");
let renderHTML = renderTemplate("giveaway_email.ejs");

sgMail.setApiKey(process.env.SENDGRID_KEY);

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

Promise.all([renderText, renderHTML])
.then((content) => {
	let no_app_user_query = `
		SELECT email FROM users
		LEFT JOIN applications ON applications.user_id = users.id
		WHERE rsvp=true`;
	sequelize.query(no_app_user_query, { type: sequelize.QueryTypes.SELECT })
	.then((users) => {
		let emails = users.map((user) => user.email);
		
		console.log(emails);
		rl.question(`Sending out ${emails.length} email(s). Would you like to continue? (y/n): `, (answer) => {
			if(answer == "y") {
				const message = {
					to: emails,
					from: "SB Hacks <team@sbhacks.com>",
					subject: "SB Hacks V: Meme Challenge and Giveaway",
					text: content[0],
					html: content[1]
				};

				sgMail.sendMultiple(message)
				.then(process.exit);
			} else {
				process.exit();
			}
		});

	})
	.catch((err) => {
		throw err;
	});
});
