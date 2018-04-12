'use strict';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	root: path.join(__dirname, '..')
};

const shared = {
	entry: {
		ssugestor: path.join(PATHS.src, 'suggestor/Suggestor.js')
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
		path: PATHS.dist
	},
	target: 'web',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['env', 'stage-2', 'react']
				}
			}
		]
	},
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
	mode: 'development'
};

const production = {
	...shared,
	mode: 'production',
	output: {
		...shared.output,
		filename: 'ssuggestor.min.js'
	}
};

module.exports = [development, production];
