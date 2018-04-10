'use strict';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const packages = require('../package.json');

const productionFlag = process.argv.indexOf('-p') !== -1;
const NODE_ENV = productionFlag ? 'production' : 'development';

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	root: path.join(__dirname, '..')
};

module.exports = {
	mode: 'production',
	entry: {
		ssugestor: path.join(PATHS.src, 'suggestor/Suggestor.js')
	},
	output: {
		filename: 'ssuggestor.js',
		path: PATHS.dist,
		libraryTarget: 'umd',
		library: 'SSuggestor'
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
	target: 'node',
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
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
		})
	],
	resolve: {
		extensions: ['.js']
	}
};
