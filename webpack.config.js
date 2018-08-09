const path = require('path');

module.exports = {
	entry : './src/app.js',
	output: {
		path : path.join(__dirname, 'public'),
		filename : 'bundle.js'
	},
	module: {
		rules:[{
			loader: 'babel-loader',
			test: /\.js$/,
			exclude : /node_modules/
		},
		{
			test:/\.s?css$/,
			use: [
				'style-loader',
				'css-loader',
				'sass-loader'
				] 
		}]
	},
	devtool: 'cheap-module-eval-source-map',
	devServer:{
		contentBase:path.join(__dirname, 'public'),
		historyApiFallback:true //tells the dev-server to always serve index.html and let react router do the client side routing
	}
};