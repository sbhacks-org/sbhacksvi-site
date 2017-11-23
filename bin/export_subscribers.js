#!/usr/bin/env node
require("dotenv").config();

const path = require("path");
const fs = require("fs");
const { Subscriber } = require("../src/models");

if(process.argv.length != 3) throw new Error("Missing 3rd parameter output_filename");

Subscriber.findAll()
.then((subscribers) => {
	console.log(subscribers.map((subscriber) => subscriber.email))
	fs.writeFileSync(process.argv[2], subscribers.map((subscriber) => subscriber.email).join(", ") + "\n");
	process.exit();
});