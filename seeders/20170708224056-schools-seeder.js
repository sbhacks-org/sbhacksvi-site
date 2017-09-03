'use strict';

const fs = require("fs");
const path = require("path");

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete("schools", null, {})
    .then(() => {
      let schools = JSON.parse(fs.readFileSync(path.join(__dirname, "schools.json")));

      console.log(schools);

      return queryInterface.bulkInsert("schools", schools);
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('schools', null, {});
  }
};
