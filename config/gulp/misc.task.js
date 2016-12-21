const gulp = require('gulp');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const del = require('del');

gulp.task('clean', done => {
  del(['tmp', '.tmp', 'dist', 'build', 'logs', 'www']).then(paths => {
    gutil.log('Deleted files and folders:\n', paths.join('\n'));
    done();
  });
});

gulp.task('lint', () =>
  gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    // .pipe(eslint.failAfterError())
);
