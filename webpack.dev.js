const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { htmlPages } = require('./webpack.globals');

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		proxy: {
			'/.netlify': {
				target: 'http://localhost:9000',
				pathRewrite: { '^/.netlify/functions': '' }
			}
		}
	},
	devtool: 'inline-source-map',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'build'),
		publicPath: 'http://localhost:8080/',
	},
	plugins: Object.keys(htmlPages).map(function (id) {
		return new HtmlWebpackPlugin({
			template: htmlPages[id],
			chunks: [id],
			filename: htmlPages[id]
		});
	}),
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	}
});