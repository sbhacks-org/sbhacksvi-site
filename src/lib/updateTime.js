/*
 * function to manually update the updatedAt column
 */

const { User } = require("../models");

module.exports = (user) => {
	return new Promise((resolve, reject) => {
		User.findOne({
			where: {
				uid: user.uid
			}
		}).then((user) => {
			user.changed("updatedAt", true); // key point
			user.update({
				updatedAt: new Date()
			}).then(() => {
				resolve();
			});
		}).catch((err) => {
			reject(err);
		});
	});

};
