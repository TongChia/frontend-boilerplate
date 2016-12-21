const gulp = require('gulp');

require('./config/gulp/misc.task');
require('./config/gulp/webpack.task');
require('./config/gulp/browsersync.task');

gulp.task('watch', done => {
  gulp.watch('src/**/*.js', gulp.series('lint'));
  // gulp.watch('package.json', gulp.series('webpack:vendor'));
  // TODO: watch package.json restart 'webpack:vendor' and 'webpack:app'
  gulp.watch(['.tmp/**/*.js', '.tmp/**/*.html', '.tmp/**/*.css'], gulp.series('browsersync:reload'));
  done();
});

gulp.task('serve', gulp.series('clean', 'lint', 'webpack', 'browsersync', 'watch'));
