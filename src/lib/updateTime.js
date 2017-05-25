/*
 * function to manually update the updatedAt column
 */

const models = require("../models/index");

module.exports = (user) => {
	return new Promise((resolve, reject) => {
		models.user.findOne({
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
