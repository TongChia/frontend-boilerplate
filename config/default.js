const path = require('path');
const root = path.resolve(__dirname, '../');

module.exports = {
  env: 'development',

  appName: 'frontend boilerplate (dev)',
  lang: 'en',

  port: 9000,

  root,
  src: path.join(root, 'src'),
  entry: {app: path.join(root, 'src', 'app.js')},
  output: path.join(root, '.tmp'),

  vendors: ['lodash'],
  proxies: [
    {path: '/api', url: 'http://localhost:3001/api/v1'},
  ]
};
