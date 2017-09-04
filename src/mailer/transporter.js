require("dotenv").config();
const nodemailer = require("nodemailer");
const bunyan = require("bunyan");

let transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.EMAIL,
		pass:  process.env.EMAIL_PW
	},
	logger: bunyan.createLogger({
		name: "nodemailer"
	}),
	debug: (process.env.NODE_ENV != "production") // include SMTP traffic in the logs
}, {
	from: `SB Hacks IV <${process.env.EMAIL}>`
});

module.exports = transporter;