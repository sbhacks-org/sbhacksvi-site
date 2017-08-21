'use strict';
module.exports = function(sequelize, DataTypes) {
  var Application = sequelize.define('Application', {
    phone_number: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 20]
      }
    },
    major: {
      type: DataTypes.STRING
    },
    resume_url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUrl: true
      }
    },
    resume_key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    graduation_year: {
      type: DataTypes.INTEGER,
      validate: {
        min: 2016,
        max: 2030
      }
    },
    level_of_study: {
      type: DataTypes.STRING
    },
    transportation: {
      type: DataTypes.STRING
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isUrl: true
      }
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isUrl: true
      }
    },
    shirt_size: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        min: 0,
        max: 6
      }
    },
    checked_in: {
      type: DataTypes.BOOLEAN
    },
    accepted: {
      type: DataTypes.BOOLEAN
    }
  }, {
    classMethods: {
      associate: function(models) {
        const { School } = models;
        Application.belongsTo(School, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Application;
};