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
				len: {
					args: [1, 100],
					msg: "first name may not exceed 100 characters in length"
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
				len: {
					args: [1, 100],
					msg: "last name may not exceed 100 characters in length"
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
		},
		passwordResetToken: {
			type: DataTypes.STRING(40),
			allowNull: true
	    },
		passwordResetTokenExpires: {
			type: DataTypes.DATE,
			allowNull: true
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
