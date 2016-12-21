const webpack = require('webpack');
const cssnext = require('postcss-cssnext');
const base = require('./base');

const test = Object.assign({}, base, {
  devtool: 'eval',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [cssnext]
      },
      debug: true
    })
  ],
});

module.exports = test;
