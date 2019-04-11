const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {src, output, entry, env, ...config} = require('config');

const isDev = env === 'development';
const isProd = env === 'production';

module.exports = {
  mode: env,
  target: 'web',
  context: src,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              sourceMap: true
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              failOnError: true,
              failOnWarning: isProd
            }
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          'postcss-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          'postcss-loader',
          'sass-loader?outputStyle=expanded&indentedSyntax'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          'postcss-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
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
  entry,
  output: {
    path: output
  },
  node: {
    fs: 'empty',
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_CONFIG': JSON.stringify(JSON.stringify(config)),
    }),
  ],
  cache: true
};
