'use strict';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const PATHS = {
	root: path.join(__dirname, '..'),
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
		]),
		new MiniCssExtractPlugin({
			filename: '[name].[chunkhash].css'
		}),
		new CleanWebpackPlugin(['dist'], {
			root: PATHS.root
		})
	],
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devtool: 'source-map'
};
