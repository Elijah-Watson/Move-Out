const path = require('path');

module.exports = {
	entry: {
		home: './resources/js/index.js',
		calculator: './resources/js/calculator.js',
		articles: './resources/js/articles.js'
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				test: /\.(svg|png|jpg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						outputPath: 'images',
						name: '[name].[hash].[ext]',
					}
				}
			}
		]
	}
}