/* eslint-env node */
process.env.NODE_ENV = 'test';

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'test/**/*.spec.js',
    ],
    exclude: [
    ],
    preprocessors: {
      'test/**/*.spec.js': ['webpack']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // browsers: ['Chrome', 'Firefox', 'IE'],
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    client: {
      mocha: {}
    },
    webpack: require('./webpack.config.js'),
    webpackMiddleware: {
      noInfo: true,
      stats: {
        chunks: false
      }
    },
  });
};
