#!/usr/bin/env node
const transporter = require("./transporter");
const renderTemplate = require("./renderTemplate");

let renderText = renderTemplate("open_apps.txt.ejs", {
	name: "Danny Cho"
});
let renderHTML = renderTemplate("open_apps.ejs", {
	name: "Danny Cho"
});

Promise.all([renderText, renderHTML])
.then((content) => {
	const message = {
		to: "dannycho7@gmail.com",
		subject: "SB Hacks IV Applications are OPEN!!",
		text: content[0],
		html: content[1]
	}

	transporter.sendMail(message, (err, info) => {
		if(err) throw err;	
		console.log("Message successfully sent");
		console.log(info);
		transporter.close();
	});
});