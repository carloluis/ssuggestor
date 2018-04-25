'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const PATHS = {
	example: path.join(__dirname, '../example'),
	dist: path.join(__dirname, '../dist')
};

module.exports = {
	mode: 'development',
	entry: {
		app: PATHS.example
	},
	output: {
		filename: '[name].bundle.js',
		sourceMapFilename: '[file].map',
		path: PATHS.dist,
		publicPath: '/'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					enforce: true,
					chunks: 'all'
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader?cacheDirectory'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(PATHS.example, 'index.html'),
			filename: 'index.html',
			inject: 'body'
		}),
		new CopyWebpackPlugin([
			{
				from: path.join(PATHS.example, 'favicon.ico'),
				to: path.join(PATHS.dist, 'favicon.ico')
			}
		])
	],
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devtool: 'eval',
	devServer: {
		contentBase: PATHS.dist,
		host: '0.0.0.0',
		inline: true,
		openPage: '',
		open: false,
		overlay: true,
		port: 9000
	}
};
