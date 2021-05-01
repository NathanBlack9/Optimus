const gulp        = require('gulp'),
      browserSync = require('browser-sync');

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
});