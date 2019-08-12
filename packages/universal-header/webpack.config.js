const path = require('path')
const webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    // filename: '[name].[hash].bundle.js',
    filename: '[name].dev.bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
}
