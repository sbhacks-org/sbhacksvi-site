#!/usr/bin/env node
require("dotenv").config();

const mail_path = "../src/mailer";

const readline = require("readline");
const path = require("path");
const sgMail = require("@sendgrid/mail");
const renderTemplate = require(path.join(mail_path, "renderTemplate"));
const { sequelize } = require("../src/models");

let renderText = renderTemplate("accepted_email.txt.ejs");
let renderHTML = renderTemplate("accepted_email.ejs");

sgMail.setApiKey(process.env.SENDGRID_KEY);

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

Promise.all([renderText, renderHTML])
.then((content) => {
	/*
		First wave: 
		- all 4s and 5s
		- all 3s from UCSB, USC, UCLA, UCI, UCB, UCSD, Caltech, SLO
	*/
	let no_app_user_query = `
		SELECT email FROM users
		LEFT JOIN applications ON applications.user_id = users.id
		WHERE rating > 3 OR (rating = 3 AND (
		  applications.school_id = ANY(ARRAY[
		    22, -- UCSB
		    33, -- USC
		    25, -- UCLA
		    28, -- UCI
		    24, -- UCB
		    23, -- UCSD
		    35, -- Caltech
		    31 -- SLO
		  ])
		)
		)`;
	sequelize.query(no_app_user_query, { type: sequelize.QueryTypes.SELECT })
	.then((users) => {
		let emails = users.map((user) => user.email);
		
		console.log(emails);
		rl.question(`Sending out ${emails.length} email(s). Would you like to continue? (y/n): `, (answer) => {
			if(answer == "y") {
				const message = {
					to: emails,
					from: "SB Hacks <team@sbhacks.com>",
					subject: "SB Hacks V Application Update",
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
