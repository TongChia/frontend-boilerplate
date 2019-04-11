const {env, browsers} = require('config');
const isProd = env === 'production';

module.exports = {
  // parser: 'sugarss',
  plugins: {
    'postcss-preset-env': browsers,
    'cssnano': isProd ? {} : false,
  }
};
