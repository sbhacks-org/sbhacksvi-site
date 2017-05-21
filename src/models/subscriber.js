'use strict';
module.exports = function(sequelize, DataTypes) {
  var subscriber = sequelize.define('subscriber', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return subscriber;
};