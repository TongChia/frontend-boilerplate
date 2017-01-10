module.exports = {
  appName: 'frontend boilerplate',
  apiUrl: 'http://localhost:3001/api/v1',
  port: 9000,
  proxies: [
    {path: '/api', url: 'http://localhost:3001/api/v1'},
  ],

  /**
   * Simple dll entries.
   * This option will bundle modules to a signed file.
   * Gulp will check entries with package.json.
   */
  dll_entry: {
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
