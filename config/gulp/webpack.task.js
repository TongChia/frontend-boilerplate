const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const _ = require('lodash');
// const env = process.env.NODE_ENV || 'development';
// const target = process.env.TARGET || 'browser';
const isWatch = process.env.WATCH != 'false';
// const config = require(`../${env}.js`);
const {red, cyan} = gutil.colors;

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

const vendorCompiler = done => {
  process.env.DLL_FILES = '';
  const dllFiles = [];
  const dllCnf = require('../webpack/dll');
  const pkgCnf = require('../../package.json');
  const entry = ensureDllEntry(dllCnf.entry, pkgCnf.dependencies);

  if (_.isEmpty(entry)) {
    gutil.log(`Warning '${gutil.colors.yellow('None of dll-libraries installed!')}'`);
    return done();
  }

  const compiler = webpack(Object.assign(dllCnf, {entry}));

  compiler.plugin('after-emit', (compilation, callback) => {
    Object.keys(compilation.assets).forEach(function (outName) {
      if (compilation.assets[outName].emitted && path.extname(outName) != '.map') {
        dllFiles.push(outName);
      }
    });
    callback();
  });

  compiler.plugin('done', stats => {
    process.env.DLL_FILES = dllFiles.join(',');
    gutil.log(`Consoled '${cyan('webpack:vendor')}'...\r\n`, stats.toString(webpackLogOptions));
    done();
  });

  compiler.plugin('failed', err => {
    if (err)
      gutil.log(red('webpack:vendor'), err.toString());
  });

  compiler.run();
};

const appCompiler = done => {
  const appCnf = require('../../webpack.config');
  const compiler = webpack(appCnf);
  const handler = (err, stats) => {
    if (err) {
      gutil.log(red('webpack:app'), err.toString());
    }

    gutil.log(`Consoled '${cyan('webpack:app')}'...\r\n`, stats.toString(webpackLogOptions));

    if (done) {
      done();
      done = null;
    }
  };
  isWatch ? compiler.watch(100, handler) : compiler.run(handler);
};

gulp.task('webpack:vendor', vendorCompiler);
gulp.task('webpack:app', appCompiler);

gulp.task('webpack', gulp.series('webpack:vendor', 'webpack:app'));
