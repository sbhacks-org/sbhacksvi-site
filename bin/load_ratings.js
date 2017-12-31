#! /usr/bin/env node

const rl = require("readline");
const fs = require("fs");
const { Client } = require("pg");
const fileName = process.argv[2];

if(!fileName) throw new Error("Usage: node load_ratings.js <filename>");

let connectionOptions = process.env["DATABASE_URL"] ? { connectionString: process.env["DATABASE_URL"] } : {
	user: 'sbhacksiv',
	host: 'localhost',
	database: 'sbhacksiv_development',
	password: '1234'
};
const dbClient = new Client(connectionOptions);;
dbClient.connect();

let lineReader = rl.createInterface({
	input: fs.createReadStream(fileName)
});

function createUpdateQuery(uids, rating) {
	return `UPDATE applications SET rating = ${rating} WHERE user_id IN (${uids.join(", ")})`;
};

function createUpdateQueryPromises(uids_rating_mapping) {
	let applicationUpdateQueries = [];

	uids_rating_mapping.forEach((uids, rating) => {
		if(uids.length == 0) return;

		let updateQueryPromise = new Promise((resolve, reject) => {
			dbClient.query(createUpdateQuery(uids, rating), (err, res) => {
				if(err) throw err;
				resolve();
			});
		});

		applicationUpdateQueries.push(updateQueryPromise);
	});

	return applicationUpdateQueries;
};

let uids_rating_mapping = [[], [], [], [], [], []];

lineReader.on("line", (line) => {
	let { 0: uid, 1: rating } = line.split("\t");
	if(parseInt(rating) > 5) rating = "5";
	
	uids_rating_mapping[rating].push(`'${uid}'`);
});

lineReader.on("close", () => {
	dbClient.query("BEGIN", (err) => {
		if(err) throw err;

		Promise.all(createUpdateQueryPromises(uids_rating_mapping))
		.then(() => {
			dbClient.query("COMMIT", (err) => {
				console.log("finished updating ratings");
				dbClient.end();
			});;
		});
	});
});
