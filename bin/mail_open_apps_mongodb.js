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

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
console.log(uri);
mongoose.connect(uri, (err) => {
	if (err) throw err;
});

const Schema = mongoose.Schema;

var Email = mongoose.model('Email', new Schema({
		email: 
		{
			type: String,
			unique: true
		}
	})
);

function getEmails()
{
	return new Promise((resolve, reject) => {
		Email.find({}, (err, emails) => {
			if (err) reject(err);
			resolve(emails);
		});
	});
}

Promise.all([renderText, renderHTML])
.then((content) => {
	getEmails()
	.then((emails) => {
		const message = {
			to: emails.map(email => email.email),
			from: "SB Hacks <team@sbhacks.com>",
			subject: "SB Hacks V Applications are OPEN!!",
			text: content[0],
			html: content[1]
		};
		//console.log(emails);
		sgMail.sendMultiple(message)
		.then(process.exit);
	})
	.catch((err) => {
		throw err;
	});
});
