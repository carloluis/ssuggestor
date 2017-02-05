'use strict';

const webpack = require('webpack');
const packages = require('./package.json');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const NODE_ENV = 'production';

const PATHS = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist'),
	cwd: __dirname
};

const envPluginConfig = new webpack.DefinePlugin({
	'process.env': {
		'NODE_ENV': JSON.stringify(NODE_ENV)
	}
});
const cleanWebpackConfig = new CleanWebpackPlugin(['dist'], {
	root: PATHS.cwd,
	verbose: true,
	dry: false,
	exclude: ['ssuggestor.js']
});

module.exports = {
	entry: {
		ssugestor: PATHS.src + '/suggestor/Suggestor.js'
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
		}
	},
	target: 'node',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-2']
				}
			}
		]
	},
	plugins: [cleanWebpackConfig, envPluginConfig],
	resolve: {
		extensions: ['', '.js']
	}
};