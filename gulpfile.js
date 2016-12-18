const gulp = require('gulp');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const browserSync = require('browser-sync');
const del = require('del');

/* eslint-env node */
const env = process.env.NODE_ENV;
const target = process.env.TARGET;
const isDev = env != 'production' && env != 'test';
const isBrowser = target != 'cordova' && target != 'phonegap' && target != 'electron';

// console.log(process.env.npm_lifecycle_event);
// console.dir(process.env.npm_package_license);

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

  if (isDev) {
    webpackBundler.watch(200, webpackChangeHandler);
  } else {
    webpackBundler.run(webpackChangeHandler);
  }
});

///////////////////////////////
// BROWSER-SYNC TASK
///////////////////////////////
gulp.task('browsersync', done => {
  browserSync.init({
    server: {
      baseDir: isDev ? ['.tmp', 'src'] : ['build']
    },
    open: isDev && isBrowser
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

//TODO: bundle [react, jquery, vue, backbone...] to library.js without pass webpack;
