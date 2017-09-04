"use strict";

const fs = require("fs");
const path = require("path");

module.exports = {
	up: function (queryInterface, Sequelize) {

		return queryInterface.bulkDelete("schools", null, {})
    .then(() => {
	let school_names = JSON.parse(fs.readFileSync(path.join(__dirname, "school_names.json")));

	let schools = school_names.map(school_name => ({ name: school_name }));

	return queryInterface.bulkInsert("schools", schools);
});
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.bulkDelete("schools", null, {});
	}
};
