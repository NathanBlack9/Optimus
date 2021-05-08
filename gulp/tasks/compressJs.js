import gulp from 'gulp'
import browserSync from 'browser-sync'
import terser from 'gulp-terser'
import concat from 'gulp-concat'
import cleanDest from 'gulp-clean-dest'

gulp.task('compressJs', function() {
  return gulp.src(['src/js/modules/*.js','src/js/*.js'])
    .pipe(cleanDest('build/js/public'))  
    .pipe(concat('common-min.js'))
    .pipe(terser())
    .pipe(gulp.dest('build/js/public'))
    .pipe(browserSync.stream());
});