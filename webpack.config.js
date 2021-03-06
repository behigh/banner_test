const path = require('path');
const webpack = require('webpack');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'assets/js');

/**
 * Webpack Configuration
 */
module.exports = {
	entry: {
		getadd: path.join(dirApp, 'getadd')
	},
	resolve: {
		modules: [
			dirNode,
			dirApp
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			IS_DEV: IS_DEV
		}),
	],
	module: {
		rules: [
			// BABEL
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /(node_modules)/,
				options: {
					compact: true
				}
			},
		]
	}
};
