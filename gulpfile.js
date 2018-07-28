const config       = require('config');
const fs           = require('fs');
const gulp         = require('gulp');
const del          = require('del');
const {join}       = require('path');
const PluginError  = require('plugin-error');
const log          = require('fancy-log');
const template     = require('gulp-template');
const webpack      = require('webpack');
const webpackConf  = require('./webpack.config');
const browserSync  = require('browser-sync').create();
const {DllReferencePlugin, DllPlugin} = webpack;
const {src, output, vendors} = config;

const manifest = join(output, 'vendor.manifest.json');

const dllConf = {
  ...webpackConf,
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
};

const appConf = {
  ...webpackConf,
  plugins: [
    new DllReferencePlugin({
      context: src,
      manifest,
    })
  ]
};

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
  gulp.src(join(src, 'index.html'))
    .pipe(template({title: config.appName, ...config}))
    .pipe(gulp.dest(output));

const serve = (done) => {
  const reloadFiles = (path) => browserSync.reload(path.replace(`${output}`, ''));
  const reloadBrowser = () => browserSync.reload('/');
  browserSync.init({
    serveStatic: [output, src],
    // proxy: 'localhost:' + port,
  });
  gulp.watch(`${output}/*.*`)
    .on('change', reloadFiles)
    .on('unlink', reloadBrowser);
  gulp.watch(join(src, 'index.html'), {delay: 1000})
    .on('change', () => browserSync.reload('*.html'));
  return done();
};

gulp.task('clean', clean);
gulp.task('webpack:app', app);
gulp.task('webpack:dll', dll);
gulp.task('html', html);
gulp.task('serve', serve);
gulp.task('default', gulp.series(clean, dll, app, serve));

//TODO: test & zip & cdn
