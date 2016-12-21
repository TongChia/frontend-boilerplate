// const path = require('path');
const env = process.env.NODE_ENV || 'dev';

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory=true'
      },
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
  resolve: {
    alias: {
      actions: './src/actions/',
      components: './src/components/',
      sources: './src/sources/',
      stores: './src/stores/',
      styles: './src/styles/',
      config: `./config/${env}.js`,
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    },
  },
  entry: {
    'app': './src/index.js',
    // 'electron': './src/index.electron.js',
    // 'cordova': './src/index.cordova.js',
  },
  output: {
    path: './.tmp',
    filename: '[name].bundle.js'
  },
  cache: false,
};
