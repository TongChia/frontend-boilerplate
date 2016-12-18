const gulp = require('gulp');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const browserSync = require('browser-sync');
const del = require('del');
const proxy = require('proxy-middleware');
const url = require('url');

/* eslint-env node */
const env = process.env.NODE_ENV || 'dev';
const target = process.env.TARGET || 'browser';
const config = require(`./config/${env}.js`);

///////////////////////////////
// WEBPACK TASK
///////////////////////////////
gulp.task('webpack', done => {
  const webpackBundler = webpack(webpackConfig);

  const webpackChangeHandler = (err, stats) => {
    if (err) {
      gutil.log(gutil.colors.red('[Webpack]'), err.toString());
      this.emit('end');
    }

    gutil.log(stats.toString({
      colors: gutil.colors.supportsColor,
      hash: false,
      timings: true,
      chunks: true,
      chunkModules: false,
      modules: false,
      children: true,
      version: false,
      cached: false,
      cachedAssets: false,
      reasons: false,
      source: false,
      errorDetails: false
    }));

    if (done) {
      done();
      done = null;
    }
    browserSync.reload();
  };

  if (env == 'dev') {
    webpackBundler.watch(200, webpackChangeHandler);
  } else {
    webpackBundler.run(webpackChangeHandler);
  }
});

///////////////////////////////
// BROWSER-SYNC TASK
///////////////////////////////
gulp.task('browsersync', done => {
  const middleWares = [];
  if (config && config.apiUrl) {
    const proxyOpt = url.parse(config.apiUrl);
    proxyOpt.route = proxyOpt.path;
    middleWares.push(proxy(proxyOpt));
  }
  browserSync.init({
    server: {
      baseDir: env == 'dev' ? ['.tmp', 'src'] : ['build'],
      middleware: middleWares
    },
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: false
    },
    open: env == 'dev' && target == 'browser'
  });
  done();
});

///////////////////////////////
// CLEAN TASK
///////////////////////////////
gulp.task('clean', done => {
  del(['tmp', '.tmp', 'dist', 'build', 'logs', 'www']).then(paths => {
    gutil.log('Deleted files and folders:\n', paths.join('\n'));
    done();
  });
});

///////////////////////////////
// LINT TASK
///////////////////////////////
gulp.task('lint', () =>
  gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

///////////////////////////////
// WATCH TASK
///////////////////////////////
gulp.task('watch', done => {
  gulp.watch('src/**/*.js', ['lint']);
  done();
});

///////////////////////////////
// DEV SERVER TASK
///////////////////////////////
gulp.task('serve', ['watch', 'webpack', 'browsersync']);

///////////////////////////////
// DEFAULT TASK
///////////////////////////////
gulp.task('default', ['serve']);

//TODO: bundle [react, jquery, vue, backbone...] to library.js without pass webpack;
