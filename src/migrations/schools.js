"use strict";

module.exports = {
	up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
		let schools = [
      { name: "UC Berkeley" },
      { name: "UC Davis" },
      { name: "UC Los Angeles" },
      { name: "UC Merced" },
      { name: "UC Riverside" },
      { name: "UC Santa Barbara" },
      { name: "UC Santa Cruz" },
      { name: "UC San Diego" },
      { name: "UC Irvine"},
      { name: "Cal Poly SLO" },
      { name: "Cal Poly Pomona" },
      { name: "Santa Barbara City College" },
      { name: "SF State University" },
      { name: "Stanford University" },
      { name: "California Institute of Technology (Caltech)" },
      { name: "CSU Long Beach" },
      { name: "Carnegie Mellon University" },
      { name: "University of Southern California" }
		];
    
		return queryInterface.bulkInsert("schools", schools);
	},

	down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
	}
};
