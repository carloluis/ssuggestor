'use strict';

const webpack = require('webpack');
const packages = require('./package.json');

const NODE_ENV = 'production';

const envPluginConfig = new webpack.DefinePlugin({
	'process.env': {
		'NODE_ENV': JSON.stringify(NODE_ENV)
	}
});

module.exports = {
	entry: {
		ssugestor: __dirname + '/src/suggestor/Suggestor.js'
	},
	output: {
		filename: 'ssuggestor.js',
		path: __dirname + '/dist',
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
	plugins: [envPluginConfig],
	resolve: {
		extensions: ['', '.js']
	}
};