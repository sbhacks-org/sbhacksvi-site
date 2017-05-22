'use strict';

module.exports = function(sequelize, DataTypes) {
  var school = sequelize.define('school', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: false
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return school;
};
