const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

module.exports = (filename, locals = {}) => {
	return new Promise((resolve, reject) => {
		fs.readFile(path.join(__dirname, "templates", filename), "utf-8", (err, data) => {
			if(err) reject(err);
			let output = ejs.render(data, locals);
			resolve(output);
		});
	});
};
