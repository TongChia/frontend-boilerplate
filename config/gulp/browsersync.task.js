const gulp = require('gulp');
const browserSync = require('browser-sync');
const proxy = require('proxy-middleware');
const url = require('url');
const hlpCnf = require('../helper.js');

/* eslint-env node */
const env = process.env.NODE_ENV || 'dev';
const target = process.env.TARGET || 'browser';
const config = require('../helper.js');

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
    port: hlpCnf.port || 9000,
    ui: {
      port: hlpCnf.port ? hlpCnf.port + 1 : 9001
    },
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

gulp.task('browsersync:reload', done => {
  browserSync.reload();
  done();
});
