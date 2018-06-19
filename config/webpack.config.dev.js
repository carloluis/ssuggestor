'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const PATHS = {
	example: path.join(__dirname, '../example'),
	dist: path.join(__dirname, '../dist'),
	root: path.join(__dirname, '..')
};

module.exports = {
	context: PATHS.root,
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
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader?cacheDirectory'
			},
			{
				test: /.scss$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							camelCase: 'dashes',
							localIdentName: '[path][name]__[local]'
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
			template: './node_modules/html-webpack-template/index.ejs',
			title: 'ssuggestor',
			appMountId: 'app',
			favicon: path.join(PATHS.example, 'favicon.ico'),
			filename: 'index.html',
			inject: false,
			links: ['https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'],
			meta: [
				{ name: 'robots', content: 'index, follow' },
				{
					name: 'keywords',
					content: 'react,reactjs component,component,suggestor,ssuggestor,select,autocomplete,javascript'
				},
				{ name: 'description', content: 'ssuggestor - React Simple Suggestor' }
			],
			minify: {
				collapseWhitespace: true,
				conservativeCollapse: true,
				preserveLineBreaks: true,
				useShortDoctype: true,
				html5: true
			},
			mobile: true
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
