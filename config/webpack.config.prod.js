'use strict';

const CleanWebpackPlugin = require('clean-webpack-plugin');
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
		ssugestor: [PATHS.helpers, path.join(PATHS.src, 'suggestor/Suggestor.js')]
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
		extensions: ['.js']
	}
};

const development = {
	...shared,
	devtool: 'none',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['env', 'stage-2', 'react'],
					plugins: ['external-helpers']
				}
			}
		]
	}
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
				test: /\.js$/,
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
			}
		]
	}
};

module.exports = [development, production];
