const gulp     = require('gulp'),
      imagemin = require('gulp-imagemin');

gulp.task('compressImg', function() {
  gulp.src('src/img/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('build/img'));
});