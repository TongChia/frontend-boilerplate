const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const _ = require('lodash');
const env = process.env.NODE_ENV || 'development';
const target = process.env.TARGET || 'browser';
// const config = require(`./config/${env}.js`);

const webpackLogOptions = {
  colors: gutil.colors.supportsColor,
  hash: false,
  timings: true,
  chunks: true,
  chunkModules: false,
  modules: false,
  children: true,
  version: false,
  cached: true,
  cachedAssets: false,
  reasons: false,
  source: false,
  errorDetails: false
};

const ensureDllEntry = (entries, dependencies) => {
  if (_.isString(entries)) {
    entries = entries.split[' '];
  }
  if (_.isArray(entries)) {
    entries = {dll: entries};
  }

  _.forEach(entries, (entryModules, bundleName) => {
    entryModules = _.isString(entryModules) ? entryModules.split[' '] : entryModules;
    entryModules = _.intersection(entryModules, Object.keys(dependencies));
    if (_.isEmpty(entryModules))
      delete entries[bundleName];
    else
      entries[bundleName] = entryModules;
  });

  return entries;
};

const changeHandler = done => (err, stats) => {
  if (err) {
    gutil.log(gutil.colors.red('Webpack'), err.toString());
  }

  gutil.log(`Consoled '${gutil.colors.cyan('webpack:vendor')}'...\r\n`, stats.toString(webpackLogOptions));

  if (done) {
    done();
    done = null;
  }
};

const bundleVendor = done => {
  const dllCnf = require('../webpack/dll');
  const pkgCnf = require('../../package.json');
  const solveCnf = Object.assign({}, dllCnf, {entry: ensureDllEntry(dllCnf.entry, pkgCnf.dependencies)});
  const compiler = webpack(solveCnf, changeHandler(done));

  compiler.plugin('after-emit', (compilation, callback) => {
    Object.keys(compilation.assets).forEach(function (outName) {
      if (compilation.assets[outName].emitted && path.extname(outName) != '.map') {
        const manifest = outName.replace('dll.js', 'json')
        if (process.env.MANIFESTS)
          process.env.MANIFESTS += ',' + manifest;
        else
          process.env.MANIFESTS = manifest;
      }
    });
    callback();
  });
};

const bundleApp = done =>
  webpack(require('../../webpack.config'), changeHandler(done));

gulp.task('webpack:vendor', bundleVendor);
gulp.task('webpack:app', bundleApp);

gulp.task('webpack', gulp.series('webpack:vendor', 'webpack:app'));
