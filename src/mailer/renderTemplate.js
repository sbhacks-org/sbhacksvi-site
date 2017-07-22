const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

module.exports = renderTemplate = (filename, locals = {}) => {
	return new Promise((res, rej) => {
		fs.readFile(path.join(__dirname, "templates", filename), "utf-8", (err, data) => {
			if(err) rej(err);
			output = ejs.render(data, locals);
			res(output);
		});
	});
}
