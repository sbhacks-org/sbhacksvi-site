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
				is: {
					args: ["^[a-z]+$","i"],
					msg: "First name cannot contain numbers"
				}
			}
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is:  {
					args: ["^[a-z]+$","i"],
					msg: "Last name cannot contain numbers"
				}
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				msg: "This email has already been taken"
			},
			validate: {
				isEmail: true
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
