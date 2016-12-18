const webpack = require('webpack');
const cssnext = require('postcss-cssnext');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/* eslint-env node */
const env = process.env.NODE_ENV;

///////////////////////////////
// WEBPACK BASE CONFIG
///////////////////////////////
const base = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(pug|jade)$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?prefix=font/&limit=8192&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)$/,
        loader: 'file-loader?prefix=font/'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      },
    ]
  },
  entry: './src/index.js',
  output: {
    path: './.tmp',
    filename: 'bundle.js'
  },
  cache: true,
};

///////////////////////////////
// WEBPACK DEV CONFIG
///////////////////////////////
const dev = Object.assign({}, base, {
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      options: {
        postcss: () => [cssnext]
      },
    })
  ]
});

///////////////////////////////
// WEBPACK DIST CONFIG
///////////////////////////////
const dist = Object.assign({}, base, {
  output: {
    path: './build',
    filename: 'bundle.js',
  },
  cache: false,
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
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

///////////////////////////////
// WEBPACK TEST CONFIG
///////////////////////////////
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

module.exports = env == 'production' ? dist : env == 'test' ? test : dev;
