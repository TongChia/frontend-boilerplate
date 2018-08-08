const {env, browsers} = require('config');
const isProd = env === 'production';
const isTest = env === 'test';

module.exports = {
  presets: [
    ['@babel/env', {
      debug: !isProd,
      useBuiltIns: 'usage',
      modules: 'commonjs',
      targets: {browsers}
    }]
  ],
  plugins: [
    '@babel/plugin-proposal-function-bind',
    '@babel/proposal-nullish-coalescing-operator',
    '@babel/proposal-optional-chaining',
    ['@babel/proposal-decorators', {legacy: true}],
    ['@babel/proposal-class-properties', {loose: true}],
    ['@babel/proposal-pipeline-operator', {proposal: 'minimal'}]
  ]
};
