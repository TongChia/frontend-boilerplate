const config       = require('config');
const fs           = require('fs');
const gulp         = require('gulp');
const del          = require('del');
const {join}       = require('path');
const PluginError  = require('plugin-error');
const log          = require('fancy-log');
const template     = require('gulp-template');
const ejs          = require('gulp-ejs');
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
  gulp.src(join(src, '*.ejs'))
    .pipe(ejs({dll: fs.existsSync(manifest), ...config}, {}, {ext: '.html'}))
    .pipe(gulp.dest(output));

const watch = (done) => {
  gulp.watch([join(src, '**/*'), '!' + join(src, '**/*.html')], gulp.series('webpack:app'));
  gulp.watch(join(src, '**/*.html'), gulp.series('html'));
  done();
};

const serve = (done) => {
  browserSync.init({
    server: [output, src],
  });
  browserSync.watch(output).on('change', browserSync.reload);
  return done();
};

gulp.task('clean', clean);
gulp.task('webpack:dll', dll);
gulp.task('webpack:app', app);
gulp.task('html', html);
gulp.task('build', gulp.series('clean', 'webpack:dll', 'webpack:app', 'html'));
gulp.task('default', gulp.series('build', watch, serve));

//TODO: test & zip & cdn
