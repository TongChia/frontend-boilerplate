const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(`../${env}.js`);

module.exports = {
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
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
      actions: path.join(config.src, 'actions'),
      components: path.join(config.src, 'components'),
      sources: path.join(config.src, 'sources'),
      stores: path.join(config.src, 'stores'),
      styles: path.join(config.src, 'styles'),
      CONFIG: path.join(config.root, `config/${env}.js`),
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    },
  },
  entry: {
    'app': `${config.src}/app.js`,
  },
  output: {
    path: config.out,
  },
  cache: false,
  watch: false,
};
