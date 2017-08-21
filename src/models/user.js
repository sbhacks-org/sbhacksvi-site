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
