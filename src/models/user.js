"use strict";

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				not: {
					args: ["^[0-9]+$","i"],
					msg: "first name may not consist of numbers"
				},
				}
			}
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				not:  {
					args: ["^[0-9]+$","i"],
					msg: "last name may not consist of numbers"
				},
				}
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				msg: "this email has already been taken"
			},
			validate: {
				isEmail: {
					msg: "must be a valid email"
				}
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: "users"
	});

	User.associate = function(models) {
		const { Application } = models;
		User.hasOne(Application, {
			foreignKey: "user_id"
		});
	}
	return User;
};
