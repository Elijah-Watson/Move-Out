const path = require('path');

module.exports = {
	entry: {
		home: './resources/js/index.js',
		calculator: './resources/js/calculator.js',
		guides: './resources/js/guides.js',
		guide: './resources/js/guide.js'
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
					path.resolve(__dirname, 'resources/open-iconic'),
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
							sizes: [2000, 1200, 600, 300],
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