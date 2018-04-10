'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const PATHS = {
	example: path.join(__dirname, '../example'),
	dist: path.join(__dirname, '../dist'),
	src: path.join(__dirname, '../src')
};

const productionFlag = process.argv.indexOf('-p') !== -1;
const NODE_ENV = productionFlag ? 'production' : 'development';

module.exports = {
	mode: 'development',
	entry: {
		app: path.join(PATHS.example, 'index.js'),
		vendor: ['prop-types', 'react', 'react-dom']
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
					name: 'vendor',
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
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
		}),
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
		port: 9000,
		openPage: '',
		inline: true,
		open: false
	}
};
