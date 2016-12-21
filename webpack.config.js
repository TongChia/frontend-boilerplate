const dev = require('./config/webpack/dev');
const dist = require('./config/webpack/dist');
const test = require('./config/webpack/test');

/* eslint-env node */
const env = process.env.NODE_ENV;

module.exports = env == 'production' ? dist : env == 'test' ? test : dev;
