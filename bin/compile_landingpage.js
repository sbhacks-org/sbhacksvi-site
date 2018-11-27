#! /usr/bin/env node

const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const { minify } = require("html-minifier");

let source_path = path.join(__dirname, "../src/views/landingpage.ejs")

let ejs_contents = fs.readFileSync(source_path, "utf8");


let html_contents = ejs.render(ejs_contents, {
	filename: source_path
});

let min_contents = minify(html_contents, {
	removeAttributeQuotes: true,
	collapseWhitespace: true
});

let output_path = path.join(__dirname, "../src/static/index.html");

fs.writeFileSync(output_path, min_contents);

console.log("Finished writing file to", output_path)