"use strict";
module.exports = function(sequelize, DataTypes) {
	var Subscriber = sequelize.define("subscriber", {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		}
	});
	return Subscriber;
};