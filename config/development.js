const _default = require('./default');

module.exports = Object.assign({}, _default, {
  appName: 'frontend boilerplate development',
  api: '/api',
  proxies: [
    {path: '/api', url: 'http://localhost:3001/api/v1'},
  ]
});
