const path = require('path');
const root = path.resolve(__dirname, '../');

module.exports = {
  appName: 'frontend boilerplate',
  api: '/api',
  port: process.env.PORT || 9000,
  root,
  src: path.join(root, 'src'),
  out: path.join(root, '.tmp'),

  lang: 'en',

  /**
   * Simple dll entries.
   * This option will bundle modules to a signed file.
   * Gulp will check entries with package.json.
   */
  dllEntry: {
    'core': [
      'lodash', 'underscore', 'fetch', 'jquery', 'backbone'
    ],
    'react_dll': [
      'react', 'react-dom'
    ],
    'angular_dll': [
      'angular'
    ]
  },
};
