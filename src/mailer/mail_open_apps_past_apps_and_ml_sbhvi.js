#!/usr/bin/env node
require("dotenv").config();


const fs = require("fs");
const readline = require("readline");
const path = require("path");
const sgMail = require("@sendgrid/mail");
const renderTemplate = require("./renderTemplate");
const { sequelize } = require("../../src/models");

let renderText = renderTemplate("open_apps.txt.ejs");
let renderHTML = renderTemplate("open_apps.ejs");

sgMail.setApiKey(process.env.SENDGRID_KEY);

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

Promise.all([renderText, renderHTML])
.then((content) => {
	// let email_data = fs.readFileSync("./sbh3_users_after_2018.json", "utf-8");
	// let sbhacks3_emails = JSON.parse(email_data)["values"].map((user) => user[1]);
	// email_data = fs.readFileSync("./sbh4_users_after_2018.json", "utf-8");
	// let sbhacks4_emails = JSON.parse(email_data)["values"].map((user) => user[0]);

	let email_data = fs.readFileSync("./sbh5_applied.json", "utf-8");
	let sbhacks5_emails = JSON.parse(email_data)["values"].map((user) => user[0])
	email_data = fs.readFileSync("./sbh6_mailing_list.json", "utf-8");
	let sbhacks6_ml_emails = JSON.parse(email_data)["values"].map((user) => user[0])

	let emails = Array.from(new Set(sbhacks5_emails.concat(sbhacks6_ml_emails)));

	email_data = fs.readFileSync("./sbh6_applied_11.20.19.json", "utf-8");
	let sbhacks6_emails = JSON.parse(email_data)["values"].map((user) => user[0]);
	let difference = emails.filter(x => !sbhacks6_emails.includes(x));

	var halfIndex = Math.ceil(difference.length / 2);
	console.log(halfIndex);

	var leftArr = difference.splice(0, halfIndex);
	var rightArr = difference;

	console.log(leftArr);
	console.log(rightArr);

	rl.question(`Sending out ${rightArr.length} email(s). Would you like to continue? (y/n): `, (answer) => {
		if(answer == "y") {
			const message = {
				to: rightArr,
				from: "SB Hacks <team@sbhacks.com>",
				subject: "SB Hacks VI Applications are open!",
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