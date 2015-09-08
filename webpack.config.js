var path = require("path");
var webpack = require("webpack");
var BowerWebpackPlugin = require("bower-webpack-plugin");

module.exports = {
  entry: {
    // sample: './src/js/sample.js'
    test: './src/js/test.js'
  },
  output: {
    filename: '[name].bundle.js'
  },
  resolve: {
    root: path,
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['node_modules', 'bower_components'],
    alias: {

    }
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  plugins: [
    new BowerWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};
