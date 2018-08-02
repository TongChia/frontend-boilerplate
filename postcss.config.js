const {env} = require('config');
const isProd = env === 'production';

module.exports = {
  // parser: 'sugarss',
  plugins: {
    // 'postcss-preset-env': {}
    'postcss-sprites': isProd ? {} : false,
    'cssnano': isProd ? {} : false,
  }
};
