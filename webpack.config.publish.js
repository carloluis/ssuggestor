'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packages = require('./package.json');

const NODE_ENV = 'production';

const envPluginConfig = new webpack.DefinePlugin({
	'process.env': {
		'NODE_ENV': JSON.stringify(NODE_ENV)
	}
});
var uglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: true
	},
	mangle: true,
	comments: false
});
const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: __dirname + '/src/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: {
		ssugestor: __dirname + '/src/components/suggestor/Suggestor.js',
		vendor: Object.keys(packages.dependencies)
	},
	output: {
		filename: '[name].lib.js',
		sourceMapFilename: '[file].map',
		path: __dirname + '/dist'
	},
	externals: {
		'react': 'react',
		'react-dom': 'react-dom'
	},
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
				},
				cacheDirectory: true
			}
		]
	},
	plugins: [envPluginConfig, uglifyJsPluginConfig, htmlWebpackPluginConfig],
	resolve: {
		extensions: ['', '.js']
	},
	devtool: '#source-map'
};