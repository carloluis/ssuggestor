'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const PATHS = {
	example: path.join(__dirname, 'example'),
	dist: path.join(__dirname, 'dist'),
	src: path.join(__dirname, 'src')
};

const productionFlag = process.argv.indexOf('-p') !== -1;
const NODE_ENV = productionFlag? 'production': 'development';

const envPluginConfig = new webpack.DefinePlugin({
	'process.env': {
		NODE_ENV: JSON.stringify(NODE_ENV)
	}
});

const commonsChunkConfig = new webpack.optimize.CommonsChunkPlugin({
	name: 'vendor',
	minChunks: module => /node_modules/.test(module.resource)
});

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: PATHS.example + '/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: {
		app: path.join(PATHS.example, 'index.js'),
		vendor: ['prop-types', 'react', 'react-dom']
	},
	output: {
		filename: '[name].bundle.js',
		sourceMapFilename: '[file].map',
		path: PATHS.dist,
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				include: PATHS.src,
				loader: 'eslint-loader',
				enforce: 'pre'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader?cacheDirectory',
				query: {
					presets: ['react', 'es2015', 'stage-2']
				}
			}
		]
	},
	plugins: [envPluginConfig, commonsChunkConfig, htmlWebpackPluginConfig],
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devtool: 'eval-source-map',
	devServer: {
		contentBase: PATHS.dist,
		host: '0.0.0.0',
		port: 9000,
		openPage: '',
		inline: true,
		open: true
	}
};
