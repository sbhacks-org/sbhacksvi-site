"use strict";

module.exports = function(sequelize, DataTypes) {
	var School = sequelize.define("School", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		}
	}, {
		timestamps: false
	});

	return School;
};
