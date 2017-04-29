'use strict';

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    uid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    first_name: {
      type: DataTypes.STRING,
      validate: {
        is: ["^[a-z]+$",'i']
      },
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$",'i']
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resume_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      isUrl: true
      }
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 10
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        min: 0,
        max: 6
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        user.belongsTo(models.school, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return user;
};
