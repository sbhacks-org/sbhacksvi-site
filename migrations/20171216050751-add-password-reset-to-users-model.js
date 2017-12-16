'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    queryInterface.addColumn('users', 'passwordResetToken' ,{
      type: Sequelize.STRING(40),
      allowNull: true
    })
    .catch(() => {});

    queryInterface.addColumn('users', 'passwordResetTokenExpires' ,{
      type: Sequelize.DATE,
      allowNull: true
    })
    .catch(() => {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeColumn('users', 'passwordResetToken');
    queryInterface.removeColumn('users', 'passwordResetTokenExpires');
  }
};
