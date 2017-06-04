const path = require("path");

module.exports = {
	entry: "./src/components/main.js",
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
	}
};
