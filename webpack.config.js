'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const PATHS = {
	example: path.join(__dirname, 'example'),
	dist: path.join(__dirname, 'dist')
};

const productionFlag = process.argv.indexOf('-p') !== -1;
const NODE_ENV = productionFlag? 'production': 'development';

const envPluginConfig = new webpack.DefinePlugin({
	'process.env': {
		NODE_ENV: JSON.stringify(NODE_ENV)
	}
});
const commonsChunkConfig = new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js');
const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: PATHS.example + '/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: {
		app: PATHS.example + '/index.js',
		vendor: ["react", "react-dom"]
	},
	output: {
		filename: '[name].bundle.js',
		sourceMapFilename: '[file].map',
		path: PATHS.dist,
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