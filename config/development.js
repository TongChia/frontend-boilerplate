const _default = require('./default');

module.exports = Object.assign({}, _default, {
  appName: 'frontend boilerplate development',
  lang: 'zh-cn',
  api: '/api',
  proxies: [
    {path: '/api', url: 'http://localhost:3001/api/v1'},
  ]
});
