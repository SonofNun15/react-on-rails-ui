var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'source/polyfill'),
    path.resolve(__dirname, 'source/index'),
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'source'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    // create HTML file that includes reference to bundle,
    new HtmlWebpackPlugin({
      template: 'source/index.html',
      inject: true,
    }),
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']},
    ]
  }
};
