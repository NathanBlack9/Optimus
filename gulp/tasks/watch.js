// const gulp        = require('gulp'),
//       browserSync = require('browser-sync');

      import gulp from 'gulp'
      import browserSync from 'browser-sync'

gulp.task('watch', function() {
  gulp.watch("src/scss/**/*.+(scss|sass)", gulp.parallel('css'), browserSync.reload);
  gulp.watch("src/html/*.html", gulp.parallel('minify-html'),browserSync.reload);
  gulp.watch("src/js/**/*.js", gulp.parallel('compressJs'),browserSync.reload);
});