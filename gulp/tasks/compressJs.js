const gulp        = require('gulp'),
      minify      = require('gulp-minify'),
      browserSync = require('browser-sync');

gulp.task('compressJs', function() {
  return gulp.src(['src/js/modules/*.js','src/js/*.js'])
    .pipe(minify())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});