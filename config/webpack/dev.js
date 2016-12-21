const webpack = require('webpack');
const cssnext = require('postcss-cssnext');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Vendors = require('../helper/vendors');
const base = require('./base');

// const manifest = path.join('.tmp/', 'vendor.manifest.json');
const v = new Vendors();
const list = v.getManifest();
const isDll = list.length > 0;
let headScript = '';

const conf = Object.assign({}, base, {
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.WatchIgnorePlugin('.tmp/'),
    // new webpack.NoErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      options: {
        postcss: () => [cssnext]
      },
    })
  ],
  cache: true,
  watch: true,
  devtool: '#source-map'
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
    // chunks: ['app'],
  })
);

module.exports = conf;
