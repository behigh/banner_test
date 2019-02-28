const path = require('path');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(webpackConfig, {
	mode: 'development',
	//devtool: 'eval',
	devtool: 'inline-source-map',

	output: {
		pathinfo: true,
		publicPath: '/js/',
		filename: '[name].js',
		//path: path.resolve(__dirname, 'dist'),
	},

	devServer: {
		//contentBase: './dist'
	},

	plugins: [
		//new CleanWebpackPlugin(['dist']),
	],

});