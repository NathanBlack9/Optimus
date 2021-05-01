const gulp        = require('gulp'), 
      htmlmin     = require('gulp-htmlmin'),
      browserSync = require('browser-sync');

gulp.task('minify-html', () => {
  return gulp.src('src/html/*.html')
    .pipe(htmlmin({ 
        removeComments: true  
    }))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});