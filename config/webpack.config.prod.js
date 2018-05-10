'use strict';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');
const buildHelpers = require('./build-external-helpers');

const PATHS = {
	root: path.join(__dirname, '..'),
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	helpers: path.join(__dirname, 'helpers.js')
};

buildHelpers(PATHS.helpers);

const shared = {
	entry: {
		ssugestor: [
			path.join(PATHS.src, 'suggestor/styles/index.scss'),
			PATHS.helpers,
			path.join(PATHS.src, 'suggestor/Suggestor.jsx')
		]
	},
	externals: {
		react: {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		},
		'prop-types': {
			root: 'PropTypes',
			commonjs2: 'prop-types',
			commonjs: 'prop-types',
			amd: 'prop-types'
		}
	},
	output: {
		filename: 'ssuggestor.js',
		libraryTarget: 'umd',
		library: 'SSuggestor',
		path: PATHS.dist,
		auxiliaryComment: {
			root: 'Root export',
			commonjs: 'CommonJS export',
			commonjs2: 'CommonJS2 export',
			amd: 'AMD export'
		}
	},
	target: 'web',
	plugins: [
		new CleanWebpackPlugin(['dist'], {
			root: PATHS.root,
			verbose: true,
			dry: false,
			exclude: ['ssuggestor.js', 'ssuggestor.min.js']
		})
	],
	resolve: {
		extensions: ['.js', '.jsx']
	}
};

const development = {
	...shared,
	devtool: 'none',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['env', 'stage-2', 'react'],
					plugins: ['external-helpers']
				}
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
							localIdentName: '[local]'
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
		...shared.plugins,
		new MiniCssExtractPlugin({
			filename: 'styles.css'
		})
	]
};

const production = {
	...shared,
	mode: 'production',
	output: {
		...shared.output,
		filename: 'ssuggestor.min.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['env', 'stage-2', 'react'],
					plugins: [
						[
							'transform-react-remove-prop-types',
							{
								mode: 'remove',
								removeImport: true
							}
						],
						'external-helpers'
					]
				}
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
							localIdentName: '[local]',
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
		...shared.plugins,
		new MiniCssExtractPlugin({
			filename: 'styles.min.css'
		})
	]
};

module.exports = [development, production];
