var path = require("path");
var webpack = require("webpack");
var BowerWebpackPlugin = require("bower-webpack-plugin");

module.exports = {
  entry: {
    sample: './src/js/sample.js'
  },
  output: {
    filename: '[name].bundle.js'
  },
  resolve: {
    root: path.join(__dirname, 'src/js/'),
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['node_modules', 'bower_components'],
    alias: {
      // bowerのmainに設定されていないもので。必要なものは個別にパスを指定
      'famous-global': 'famous/dist/famous-global.js',
      'ui-grid': 'angular-ui-grid/ui-grid.js'
    }
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" }
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
