const gulp = require('gulp');
const browserSync = require('browser-sync');
const proxy = require('proxy-middleware');
const url = require('url');

/* eslint-env node */
const env = process.env.NODE_ENV || 'development';
const target = process.env.TARGET || 'browser';
const config = require(`../${env}.js`);

const addProxy = middlewareArr => {
  if (config && config.proxies) {
    const {proxies} = config;
    for (let i = 0; i < proxies.length; i++) {
      const opt = url.parse(proxies[i].url);
      opt.route = proxies[i].path;
      middlewareArr.push(proxy(opt));
    }
  }
};

gulp.task('browsersync', done => {
  const middleWares = [];

  addProxy(middleWares);

  browserSync.init({
    port: config.port || 9000,
    ui: {
      port: config.port ? config.port + 1 : 9001
    },
    server: {
      baseDir: env == 'development' ? ['.tmp', 'src'] : ['build'],
      middleware: middleWares
    },
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: false
    },
    open: env == 'development' && target == 'browser'
  });
  done();
});

gulp.task('browsersync:reload', done => {
  browserSync.reload();
  done();
});
