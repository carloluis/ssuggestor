'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packages = require('./package.json');

const NODE_ENV = 'development';

const envPluginConfig = new webpack.DefinePlugin({
	'process.env': {
		'NODE_ENV': JSON.stringify(NODE_ENV)
	}
});
const commonsChunkConfig = new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js');
const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: __dirname + '/example/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: {
		app: './example/index.js',
		vendor: Object.keys(packages.dependencies)
	},
	output: {
		filename: '[name].bundle.js',
		sourceMapFilename: '[file].map',
		path: __dirname + '/dist',
		publicPath: '/'
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
	plugins: [envPluginConfig, commonsChunkConfig, htmlWebpackPluginConfig],
	resolve: {
		extensions: ['', '.js']
	},
	devtool: '#source-map',
	devServer: {
		inline: true,
		port: 9000,
		colors: true,
		progress: true,
		contentBase: './dist',
		open: true
	}
};