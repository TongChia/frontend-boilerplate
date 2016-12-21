const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const Vendors = require('../helper/vendors');
const hlpCnf = require('../helper');
const pkgCnf = require('../../package.json');

const env = process.env.NODE_ENV || 'dev';
const isDev = env == 'dev';
const v = new Vendors(hlpCnf, pkgCnf);

module.exports = {
  entry: v.getEffectiveModules(),
  output: {
    path: (env == 'production') ? 'build' : '.tmp',
    filename: (env == 'dev') ? '[name].bundle.js' : '[name].[hash:8].js',
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({sourceMap: isDev}),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: isDev,
    }),
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: '.tmp/[name].manifest.json',
      context: '.',
    }),
  ],
  devtool: isDev ? 'source-map' : ''
};
