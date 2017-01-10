const webpack = require('webpack');
const cssnext = require('postcss-cssnext');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./base');
const isDll = !!process.env.MANIFESTS;

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
    }),
    new HtmlWebpackPlugin({
      title: 'Web App',
      template: 'src/index.html',
      filename: 'index.html',
    })
  ],
  cache: true,
  watch: true,
  devtool: '#source-map'
});

if (isDll) {
  const manifests = process.env.MANIFESTS.split(',');
  manifests.forEach(manifest => {
    manifest = './.tmp/' + manifest;
    conf.plugins.unshift(
      new webpack.DllReferencePlugin({
        context: '.',
        manifest,
      })
    );
  });
}

// conf.plugins.push(
//   new HtmlWebpackPlugin({
//     title: 'Web App',
//     headScript,
//     template: 'src/index.html',
//     filename: 'index.html',
//     // chunks: ['app'],
//   })
// );

module.exports = conf;
