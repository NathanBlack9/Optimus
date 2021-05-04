import gulp from 'gulp'
import browserSync from 'browser-sync'
import terser from 'gulp-terser'
import concat from 'gulp-concat'

gulp.task('compressJs', function() {
  return gulp.src(['build/js/modules/*.js','build/js/*.js'])
    .pipe(concat('common-min.js'))
    .pipe(terser())
    .pipe(gulp.dest('build/js/public'))
    .pipe(browserSync.stream());
});