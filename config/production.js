const path = require('path');
const _default = require('./default');

module.exports = Object.assign({}, _default, {
  appName: 'frontend boilerplate',
  api: '/api',
  out: path.resolve(__dirname, '../dist'),
});
