#!/usr/bin/env node
require("dotenv").config();


const fs = require("fs");
const readline = require("readline");
const path = require("path");
const sgMail = require("@sendgrid/mail");
const renderTemplate = require("./renderTemplate");
const { sequelize } = require("../../src/models");

let renderText = renderTemplate("wave_two_email.txt.ejs");
let renderHTML = renderTemplate("wave_two_email.ejs");

sgMail.setApiKey(process.env.SENDGRID_KEY);

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

Promise.all([renderText, renderHTML])
.then((content) => {

	let wave_one_email_data = fs.readFileSync("./sbh6_wave_one_accepted.json", "utf-8");
	let wave_one_emails = JSON.parse(wave_one_email_data)["values"].map((user) => user[0])

	let wave_two_email_data = fs.readFileSync("./sbh6_wave_two_accepted_and_waitlist.json", "utf-8");
	let wave_two_emails = JSON.parse(wave_two_email_data)["values"].map((user) => user[0])

	let emails = wave_two_emails.filter(x => !wave_one_emails.includes(x));

	// emails = ["darrenchou1@gmail.com", "ja.ngo7199@gmail.com", "dsxiang@uci.edu", "clairewu@ucsb.edu", "kevinyuen@ucsb.edu"]
	console.log(emails)

	rl.question(`Sending out ${emails.length} email(s). Would you like to continue? (y/n): `, (answer) => {
		if(answer == "y") {
			const message = {
				// to: emails,
				// to: "jenniferlai43@gmail.com",
				to: "ryan8xia@gmail.com",
				from: "SB Hacks <team@sbhacks.com>",
				subject: "SB Hacks VI Application Update!",
				text: content[0],
				html: content[1]
			};

			sgMail.sendMultiple(message)
			.then(process.exit);
		} else {
			process.exit();
		}
	});
});