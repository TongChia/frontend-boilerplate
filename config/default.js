const path = require('path');

module.exports = {
  appName: 'frontend boilerplate',
  api: '/api',
  port: process.env.PORT || 9000,
  src: path.resolve(__dirname, '../src'),
  out: path.resolve(__dirname, '../.tmp'),

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
