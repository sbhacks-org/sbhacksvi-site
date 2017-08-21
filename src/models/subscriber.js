"use strict";
module.exports = function(sequelize, DataTypes) {
	var Subscriber = sequelize.define("Subscriber", {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		notified: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}
	}, {
		tableName: "subscribers"
	});
	return Subscriber;
};