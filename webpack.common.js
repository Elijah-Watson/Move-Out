const path = require('path');

module.exports = {
	entry: {
		home: './resources/js/index.js',
		calculator: './resources/js/calculator.js',
		guides: './resources/js/guides.js'
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: { 
					loader: 'html-loader', 
					options: { interpolate: true } 
				}
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				include: [
					path.resolve(__dirname, 'resources/css/images'),
				],
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'images',
							name: '[name].[hash].[ext]',
						}
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				include: [
					path.resolve(__dirname, 'resources/images'),
				],
				use: [
					{
						loader: 'responsive-loader',
						options: {
							outputPath: 'images',
							sizes: [300, 600, 1200, 2000],
							placeholder: true,
							placeholderSize: 50,
							name: '[name]-[width].[hash].[ext]'
						}
					}
				]
			}
		]
	}
}