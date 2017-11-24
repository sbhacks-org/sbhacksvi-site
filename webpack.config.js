const path = require("path");
const webpack = require("webpack");

if(process.env["NODE_ENV"] !== "production") require("dotenv").config();

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
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify(process.env.NODE_ENV),
				"S3_BUCKET_NAME": JSON.stringify(process.env.S3_BUCKET_NAME)
			}
		})
	],
	devtool: process.env.NODE_ENV === "production" ? "none" : "source-map"
};
