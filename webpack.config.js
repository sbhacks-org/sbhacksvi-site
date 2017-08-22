const path = require("path");

module.exports = {
	entry: path.join(__dirname, "src/client/index.js"),
	output: {
		path: path.join(__dirname, "src/static/js"),
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},
	devtool: "source-map"
};
