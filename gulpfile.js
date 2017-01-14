const gulp = require('gulp');
const gutil = require('gulp-util');

require('./config/gulp/webpack.task');
require('./config/gulp/browsersync.task');
require('./config/gulp/test.task');
require('./config/gulp/misc.task');

const remind = done => {
  gutil.log(`Warning '${gutil.colors.yellow('If dll-libraries changed, please restart this task.')}'`);
  done();
};

gulp.task('watch', done => {
  gulp.watch('src/**/*.js', gulp.series('lint'));

  // TODO: watch package.json and rerun ['webpack:vendor' 'webpack:app']
  gulp.watch(['package.json', 'config/*.js'], remind);
  gulp.watch(['.tmp/**/*.js', '.tmp/**/*.html', '.tmp/**/*.css'], gulp.series('browsersync:reload'));
  done();
});

gulp.task('serve', gulp.series('clean', 'lint', 'browsersync', 'watch', 'webpack'));

gulp.task('default', gulp.series('serve'));
