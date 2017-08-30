'use strict';

const fs = require("fs");
const path = require("path");

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkDelete("schools", null, {})
    .then(() => {
      let schools = JSON.parse(fs.readFileSync(path.join(__dirname, "schools_symlink.json")));

      console.log(schools);

      return queryInterface.bulkInsert("schools", schools);
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('schools', null, {});
  }
};
