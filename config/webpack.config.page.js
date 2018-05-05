'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

const PATHS = {
	example: path.join(__dirname, '../example'),
	dist: path.join(__dirname, '../dist')
};

module.exports = {
	mode: 'production',
	entry: {
		app: PATHS.example
	},
	output: {
		filename: '[name].[chunkhash].js',
		sourceMapFilename: '[file].map',
		path: PATHS.dist,
		publicPath: './'
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
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							camelCase: 'dashes',
							localIdentName: '[hash:base64:6]',
							minimize: true
						}
					},
					{
						loader: 'sass-loader'
					}
				]
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
		]),
		new MiniCssExtractPlugin({
			filename: '[name].[chunkhash].css'
		})
	],
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devtool: 'source-map'
};
