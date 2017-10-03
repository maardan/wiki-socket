var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
	entry: APP_DIR + '/index.js',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	watchOptions: {
	  // Necessary to get reasonable behavior from "watch" on Windows.
	  aggregateTimeout: 500,
	  poll: 500
	},
	module : {
		loaders : [
		{
			test : /\.js?/,
			include : APP_DIR,
			loader : 'babel-loader',
	        query: {
	          presets: ['env', 'react', 'stage-2'],
	          plugins: ['transform-class-properties']
	        }
		},
		{
			test: /\.css$/,
			loaders: ["style-loader", "css-loader"]
		},
		{
            test: /\.svg$/, loader: 'svg-loader'
		}]
	},
    plugins:
    [
    	new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.UglifyJsPlugin(
		{
            output: 
            {
                comments: false
            },  
			compress:
			{
				warnings: false
			}
	    })
  	]
};

module.exports = config;