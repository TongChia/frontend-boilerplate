const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
// const webpackConfig = require('../../webpack.config');
// const vendorConfig = require('../../config/webpack/dll.js');
// const browserSync = require('browser-sync');

const env = process.env.NODE_ENV || 'dev';
// const target = process.env.TARGET || 'browser';
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
  cached: false,
  cachedAssets: false,
  reasons: false,
  source: false,
  errorDetails: false
};



const changeHandler = done => (err, stats) => {
  if (err) {
    gutil.log(gutil.colors.red('[Webpack]'), err.toString());
  }

  gutil.log(stats.toString(webpackLogOptions));

  if (done) {
    done();
    done = null;
  }
};


const bundleVendor = done =>
  webpack(require('../../config/webpack/dll'), changeHandler(done));

// const bundleApp = done => {
//   const webpackBundler = webpack(require('../../webpack.config'));
//
//   if (env == 'dev') {
//     webpackBundler.watch(200, changeHandler(done));
//   } else {
//     webpackBundler.run(changeHandler(done));
//   }
// };

const bundleApp = done =>
  webpack(require('../../webpack.config'), changeHandler(done));

gulp.task('webpack:vendor', bundleVendor);
gulp.task('webpack:app', bundleApp);

gulp.task('webpack', gulp.series('webpack:vendor', 'webpack:app'));
