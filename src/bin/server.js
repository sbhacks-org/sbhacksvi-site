require("dotenv").config();
global.Promise = require("bluebird");

const models = require("../models/index");
const port = ( process.env.PORT || 5000 );
const app = require("../app");

models.sequelize.sync({
	logging: false
}).then(() => {
	console.log("Successfully migrated and connected to database");
	app.listen(port, () => {
		console.log("Server listening in on port", port);
	});
}).catch((err) => {
	console.log("Could not connect to database", err);
});
