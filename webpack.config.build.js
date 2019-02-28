const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

	devtool: 'source-map',

	output: {
		path: path.join(__dirname, 'public/js'),
		filename: '[name].js'
	},

	plugins: [
		new CleanWebpackPlugin(['public/js'])
	]

});