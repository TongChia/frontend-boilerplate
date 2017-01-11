const webpack = require('webpack');
const base = require('./base');
const env = process.env.NODE_ENV || 'development';
const isDev = env == 'development';
const config = require(`../${env}`);

const defaultOutName = '[name].[hash:8]';

module.exports = Object.assign({}, base, {
  entry: config.dllEntry,
  output: {
    path: (env == 'production') ? 'build' : '.tmp',
    // filename: (env == 'dev') ? '[name].bundle.js' : '[name].[hash:8].js',
    filename: `${defaultOutName}.dll.js`,
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
      path: `.tmp/${defaultOutName}.manifest.json`,
      context: '.',
    }),
  ],
  devtool: isDev ? 'source-map' : ''
});
