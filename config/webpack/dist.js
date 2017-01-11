const webpack = require('webpack');
const cssnext = require('postcss-cssnext');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./base');
const config = require('../production');
const isDll = !!process.env.DLL_FILES;
const dllFiles = isDll ? process.env.DLL_FILES.split(',') : [];

const plugins = [
  new webpack.optimize.UglifyJsPlugin(),
  // new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  new HtmlWebpackPlugin({
    title: 'Web App',
    template: 'src/index.html',
    hash: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true
    }
  }),
  new webpack.NoErrorsPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
      postcss: () => [cssnext]
    }
  }),
  new HtmlWebpackPlugin({
    title: config.appName,
    dll: dllFiles,
    template: 'src/index.html',
    filename: 'index.html',
    hash: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true
    },
  })
];

if (isDll) {
  const dllFiles = process.env.DLL_FILES.split(',');
  dllFiles.forEach(dll => {
    const manifest = './.tmp/' + dll.replace('.dll.js', '.manifest.json');
    plugins.unshift(
      new webpack.DllReferencePlugin({
        context: '.',
        manifest,
      })
    );
  });
}

module.exports = Object.assign({}, base, {plugins,});
