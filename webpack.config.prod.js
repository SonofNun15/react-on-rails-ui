var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  debug: false,
  devtool: null,
  noInfo: false,
  entry: {
    polyfills: path.resolve(__dirname, 'source/polyfill'),
    main: path.resolve(__dirname, 'source/index'),
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),

    // Generate a css file with cache busting
    new ExtractTextPlugin('[name].[contenthash].css'),

    // Generate hash of bundles for cache busting
    new WebpackMd5Hash(),

    // create HTML file that includes reference to bundle,
    new HtmlWebpackPlugin({
      template: 'source/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJs: true,
        minifyCss: true,
        minifyUrls: true,
      }
    }),

    // Eliminate duplicate packages
    new webpack.optimize.DedupePlugin(),

    // Minify
    new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('css?sass') },
    ]
  }
};
