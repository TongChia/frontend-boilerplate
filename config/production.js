const path = require('path');

module.exports = {
  env: 'production',

  appName: 'frontend boilerplate',

  out: path.resolve(__dirname, '../dist'),

  browsers: 'last 2 years'
};
