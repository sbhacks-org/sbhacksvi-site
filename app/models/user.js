'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        is: ["^[a-z]+$",'i']
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        is: ["^[a-z]+$",'i']
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING
    },
    resume_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};
