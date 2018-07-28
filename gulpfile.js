const config       = require('config');
const fs           = require('fs');
const gulp         = require('gulp');
const del          = require('del');
const {join}       = require('path');
const PluginError  = require('plugin-error');
const log          = require('fancy-log');
const template     = require('gulp-template');
const webpack      = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackConf  = require('./webpack.config');
const browserSync  = require('browser-sync').create();
const {DllReferencePlugin, DllPlugin} = webpack;
const {src, output, vendors} = config;

const manifest = join(output, 'vendor.manifest.json');

const dllConf = webpackMerge(webpackConf, {
  devtool: 'module-source-map',
  entry: vendors,
  output: {
    path: output,
    filename: 'vendor.dll.js',
    library: 'vendor_dll_[hash:8]',
  },
  plugins: [
    new DllPlugin({
      name: 'vendor_dll_[hash:8]',
      path: manifest,
      context: src,
    }),
  ]
});

const appConf = webpackMerge(webpackConf, {
  plugins: [
    new DllReferencePlugin({
      context: src,
      manifest,
    })
  ]
});

const clean = () => del(output);

const dll = (done) => vendors ?
  webpack(dllConf, (err, stats) => {
    if(err) throw new PluginError('webpack:dll', err);
    log.info(`[webpack:dll]\n${stats.toString({colors: true})}`);
    done();
  }) : done();

const app = (done) =>
  webpack(fs.existsSync(manifest) ? appConf : webpackConf, (err, stats) => {
    if(err) throw new PluginError('webpack:app', err);
    log.info(`[webpack:app]\n${stats.toString({colors: true})}`);
    done();
  });

const html = () =>
  gulp.src(join(src, '*.html'))
    .pipe(template({dll: fs.existsSync(manifest), title: config.appName, ...config}))
    .pipe(gulp.dest(output));

const watch = (done) => {
  gulp.watch(join(src, '**/*.js'), app);
  gulp.watch(join(src, '*.html'), html);
  done();
};

const serve = (done) => {
  browserSync.init({
    server: [output, src],
    // proxy: 'localhost:' + port,
  });
  browserSync.watch(output).on('change', browserSync.reload);
  return done();
};

gulp.task('clean', clean);
gulp.task('app', app);
gulp.task('dll', dll);
gulp.task('html', html);
gulp.task('serve', serve);
gulp.task('build', gulp.series(clean, dll, app, html));
gulp.task('default', gulp.series(clean, dll, app, html, watch, serve));

//TODO: test & zip & cdn
