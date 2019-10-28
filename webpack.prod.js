const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { htmlPages } = require('./webpack.globals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	output: {
		filename: '[name].[contentHash].js',
		path: path.resolve(__dirname, 'build')
	},
	optimization: {
		minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
	},
	plugins: [
		new ImageminPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i,
			plugins: [
				imageminMozjpeg({
					quality: 50
				})
			]
		}),
		new MiniCssExtractPlugin({ filename: 'main.[contentHash].css' }),
		new CleanWebpackPlugin(),
		new CopyPlugin([
			{ from: 'android-chrome-192x192.png', to: '[name].[ext]', toType: 'template' },
			{ from: 'android-chrome-384x384.png', to: '[name].[ext]', toType: 'template' },
			{ from: 'apple-touch-icon.png', to: '[name].[ext]', toType: 'template' },
			{ from: 'browserconfig.xml', to: '[name].[ext]', toType: 'template' },
			{ from: 'favicon-16x16.png', to: '[name].[ext]', toType: 'template' },
			{ from: 'favicon-32x32.png', to: '[name].[ext]', toType: 'template' },
			{ from: 'favicon.ico', to: '[name].[ext]', toType: 'template' },
			{ from: 'mstile-150x150.png', to: '[name].[ext]', toType: 'template' },
			{ from: 'safari-pinned-tab.svg', to: '[name].[ext]', toType: 'template' },
			{ from: 'site.webmanifest', to: '[name].[ext]', toType: 'template' }
		])
	].concat(Object.keys(htmlPages).map(function (id) {
		return new HtmlWebpackPlugin({
			template: htmlPages[id].file,
			chunks: [htmlPages[id].chunk],
			filename: htmlPages[id].file,
			minify: {
				removeAttributeQuotes: true,
				collapseWhitespace: true,
				removeComments: true
			}
		});
	})),
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /(node_modules|build)/,
				enforce: 'pre',
				use: ['eslint-loader'],
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								require('autoprefixer')({ grid: "autoplace" }),
							]
						}
					}
				]
			},
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader'
			}
		]
	}
});