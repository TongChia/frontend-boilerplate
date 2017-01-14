const path = require('path');
const gulp = require('gulp');
// const gutil = require('gulp-util');
const env = process.env.NODE_ENV || 'development';
const config = require(`../${env}.js`);
const KarmaServer = require('karma').Server;

gulp.task('test', done => {
  new KarmaServer({
    configFile: path.join(config.root, 'karma.conf.js'),
    singleRun: true
  }, done).start();
});

gulp.task('test:watch', function (done) {
  new KarmaServer({
    configFile: path.join(config.root, 'karma.conf.js')
  }, done).start();
});
