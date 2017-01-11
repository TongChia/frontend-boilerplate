const gulp = require('gulp');

require('./config/gulp/webpack.task');
require('./config/gulp/browsersync.task');
require('./config/gulp/misc.task');

gulp.task('watch', done => {
  gulp.watch('src/**/*.js', gulp.series('lint'));
  // gulp.watch('package.json', gulp.series('webpack:vendor'));
  // TODO: watch package.json and rerun ['webpack:vendor' 'webpack:app']
  gulp.watch(['.tmp/**/*.js', '.tmp/**/*.html', '.tmp/**/*.css'], gulp.series('browsersync:reload'));
  done();
});

gulp.task('serve', gulp.series('clean', 'lint', 'webpack', 'browsersync', 'watch'));
