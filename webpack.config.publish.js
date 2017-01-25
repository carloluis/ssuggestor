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
		ssugestor: __dirname + '/src/components/suggestor/Suggestor.js'
	},
	output: {
		filename: 'react-ssuggestor.js',
		sourceMapFilename: '[file].map',
		path: __dirname + '/dist',
		libraryTarget: 'commonjs'
	},
	externals: {
		'react': 'react',
		'react-dom': 'react-dom'
	},
	target: 'node',
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint'
			}
		],
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
	},
	devtool: '#source-map'
};