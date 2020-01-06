#!/usr/bin/env node
require("dotenv").config();


const fs = require("fs");
const readline = require("readline");
const path = require("path");
const sgMail = require("@sendgrid/mail");
const renderTemplate = require("./renderTemplate");
const { sequelize } = require("../../src/models");

let renderText = renderTemplate("2nd_logistics_email.txt.ejs");
let renderHTML = renderTemplate("2nd_logistics_email.ejs");

sgMail.setApiKey(process.env.SENDGRID_KEY);

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

Promise.all([renderText, renderHTML])
.then((content) => {

	let email_data = fs.readFileSync("./sbh6_accepted_1_5_2020.json", "utf-8");
	let emails = JSON.parse(email_data)["values"].map((user) => user[0])
	console.log(emails)

	rl.question(`Sending out ${emails.length} email(s). Would you like to continue? (y/n): `, (answer) => {
		if(answer == "y") {
			const message = {
				// to: emails,
				to: "ryan8xia@gmail.com",
				// to: "jenniferlai43@gmail.com",
				from: "SB Hacks <team@sbhacks.com>",
				subject: "SB Hacks VI Logistics #2",
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