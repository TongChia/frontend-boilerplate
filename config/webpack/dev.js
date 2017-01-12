const path = require('path');
const webpack = require('webpack');
const cssnext = require('postcss-cssnext');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./base');
const config = require('../development');
const isDll = !!process.env.DLL_FILES;
const dllFiles = isDll ? process.env.DLL_FILES.split(',') : [];

const cache = true;
const watch = true;
const devtool = '#source-map';
const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  // new webpack.WatchIgnorePlugin('.tmp/'),
  // new webpack.NoErrorsPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: false,
    debug: true,
    options: {
      postcss: () => [cssnext]
    },
  }),
  new HtmlWebpackPlugin({
    title: config.appName,
    lang: config.lang,
    dll: dllFiles,
    template: `${config.src}/index.html`,
    filename: 'index.html',
  })
];

if (isDll) {
  dllFiles.forEach(dll => {
    const manifest = path.join(config.out, dll.replace('.dll.js', '.manifest.json'));
    plugins.unshift(
      new webpack.DllReferencePlugin({
        context: '.',
        manifest,
      })
    );
  });
}

module.exports = Object.assign({}, base, {plugins , cache, watch, devtool});
