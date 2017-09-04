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
      type: DataTypes.STRING,
      allowNull: false
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
        min: {
          args: 2016,
          msg: "You must be a current student in order to apply"
        },
        max: {
          args: 2030,
          msg: "You must be graduating by 2030 to apply!"
        }
      }
    },
    level_of_study: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transportation: {
      type: DataTypes.STRING
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: {
        msg: "Somebody has already applied with that github account already"
      }
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: {
        msg: "Somebody has already applied with that linkedin account already"
      }
    },
    shirt_size: {
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: "applications"
  });

  Application.associate = function(models) {
    const { School, User } = models;
    Application.belongsTo(School, {
      foreignKey: {
        name: "school_id",
        allowNull: false
      }
    });
    Application.belongsTo(User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
        unique: {
          msg: "You may only submit only one application per account"
        }
      }
    })
  }
  return Application;
};