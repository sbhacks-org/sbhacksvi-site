"use strict";

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("user", {
		uid: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		first_name: {
			type: DataTypes.STRING,
			validate: {
				is: ["^[a-z]+$","i"]
			},
			allowNull: false
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: ["^[a-z]+$","i"]
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
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
	});

	User.associate = function(models) {
		User.belongsTo(models.school, {
			foreignKey: {
				allowNull: false
			}
		});
	}
	return User;
};
