const webpack = require('webpack');
const cssnext = require('postcss-cssnext');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Vendors = require('../helper/vendors');
const base = require('./base');

const v = new Vendors();
const list = v.getManifest();
const isDll = list.length > 0;
let headScript = '';

const conf = Object.assign({}, base, {
  output: {
    path: './build',
    filename: '[name].[hash:8].js',
  },
  plugins: [
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
    })
  ]
});

if (isDll) {
  list.forEach(manifest => {
    manifest = './.tmp/' + manifest;
    conf.plugins.unshift(
      new webpack.DllReferencePlugin({
        context: '.',
        manifest,
      })
    );
  });

  headScript = v.getBundleJsTags().join('\r\n  ');
}

conf.plugins.push(
  new HtmlWebpackPlugin({
    title: 'Web App',
    headScript,
    template: 'src/index.html',
    filename: 'index.html',
    hash: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true
    },
  })
);

module.exports = conf;
