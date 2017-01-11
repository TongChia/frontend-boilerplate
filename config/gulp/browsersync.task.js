const gulp = require('gulp');
const browserSync = require('browser-sync');
const proxy = require('proxy-middleware');
const url = require('url');

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
    port: config.port,
    ui: {
      port: config.port + 1
    },
    server: {
      baseDir: [config.out, config.src],
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
