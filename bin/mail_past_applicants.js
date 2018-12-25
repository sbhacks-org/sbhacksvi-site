#!/usr/bin/env node
require("dotenv").config();

const mail_path = "../src/mailer";

const fs = require("fs");
const readline = require("readline");
const path = require("path");
const sgMail = require("@sendgrid/mail");
const renderTemplate = require(path.join(mail_path, "renderTemplate"));
const { sequelize } = require("../src/models");

let renderText = renderTemplate("past_applicants.txt.ejs");
let renderHTML = renderTemplate("past_applicants.ejs");

sgMail.setApiKey(process.env.SENDGRID_KEY);

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

Promise.all([renderText, renderHTML])
.then((content) => {
	let email_data = fs.readFileSync("./sbh3_users_after_2018.json", "utf-8");
	let sbhacks3_emails = JSON.parse(email_data)["values"].map((user) => user[1]);
	email_data = fs.readFileSync("./sbh4_users_after_2018.json", "utf-8");
	let sbhacks4_emails = JSON.parse(email_data)["values"].map((user) => user[0]);

	let emails = Array.from(new Set(sbhacks3_emails.concat(sbhacks4_emails)));

	email_data = fs.readFileSync("./sbh5_applied_12_5_18.json", "utf-8");
	let sbhacks5_emails = JSON.parse(email_data)["values"].map((user) => user[0]);
	let difference = emails.filter(x => !sbhacks5_emails.includes(x));

	var halfIndex = Math.ceil(difference.length / 2);
	console.log(halfIndex);

	var leftArr = difference.splice(0, halfIndex);
	var rightArr = difference;

	console.log(rightArr);

	rl.question(`Sending out ${rightArr.length} email(s). Would you like to continue? (y/n): `, (answer) => {
		if(answer == "y") {
			const message = {
				to: rightArr,
				from: "SB Hacks <team@sbhacks.com>",
				subject: "SB Hacks V Applications are open!",
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

