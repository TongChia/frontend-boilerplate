const path = require('path');
const webpack = require('webpack');
const cssnext = require('postcss-cssnext');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./base');
const isDll = !!process.env.DLL_FILES;
const env = process.env.NODE_EMV || 'development';
const config = require(`../${env}.js`);
const dllFiles = isDll ? process.env.DLL_FILES.split(',') : [];
const isDev = env === 'development';
const isDist = env === 'production';
const isTest = env === 'test';

const cache = isDev;
const watch = isDev;
const devtool = isDev ? '#source-map' : isTest ? 'eval' : 'source-map';
const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  // new webpack.WatchIgnorePlugin('.tmp/'),
  // new webpack.NoErrorsPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: isDist,
    debug: isDev,
    options: {
      postcss: () => [cssnext]
    }
  }),
  new HtmlWebpackPlugin({
    title: config.appName,
    lang: config.lang,
    dll: dllFiles,
    hash: isDist,
    minify: isDist || {
      removeComments: true,
      collapseWhitespace: true
    },
    template: `${config.src}/index.html`,
    filename: 'index.html',
  })
];

if (isDist) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
  plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}

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
