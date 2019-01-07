#!/usr/bin/env node
require("dotenv").config();

const mail_path = "../src/mailer";

const readline = require("readline");
const path = require("path");
const sgMail = require("@sendgrid/mail");
const renderTemplate = require(path.join(mail_path, "renderTemplate"));
const { sequelize } = require("../src/models");

let renderText = renderTemplate("waitlisted_ucsb.txt.ejs");

sgMail.setApiKey(process.env.SENDGRID_KEY);

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

Promise.all([renderText])
.then((content) => {
	let waitlisted_ucsb_query = `
		SELECT * FROM users
		JOIN applications ON users.id=applications.user_id
		JOIN schools ON schools.id=applications.school_id
		WHERE accepted IS NULL AND schools.name LIKE '%UCSB%';`;
	sequelize.query(waitlisted_ucsb_query, { type: sequelize.QueryTypes.SELECT })
	.then((users) => {
		let emails = users.map((user) => user.email);

		console.log(emails);
		
		rl.question(`Sending out ${emails.length} email(s). Would you like to continue? (y/n): `, (answer) => {
			if(answer == "y") {
				const message = {
					to: emails,
					from: "SB Hacks <team@sbhacks.com>",
					subject: "SB Hacks V Applications are closing soon!",
					text: content[0]
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
