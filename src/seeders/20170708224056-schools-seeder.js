'use strict';

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

    let school_names = [
      "UC Berkeley",
      "UC Davis",
      "UC Los Angeles",
      "UC Merced",
      "UC Riverside",
      "UC Santa Barbara",
      "UC Santa Cruz",
      "UC San Diego",
      "UC Irvine",
      "Cal Poly SLO",
      "Cal Poly Pomona",
      "Santa Barbara City College",
      "SF State University",
      "Stanford University",
      "California Institute of Technology (Caltech)",
      "CSU Long Beach",
      "Carnegie Mellon University",
      "University of Southern California"
    ];
    
    let schools = school_names.map((school_name) => {
      return { name: school_name };
    });

    return queryInterface.bulkInsert("schools", schools);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
