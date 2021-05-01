const gulp        = require('gulp'),
      cleanCSS    = require('gulp-clean-css'),
      autoprefixer= require('gulp-autoprefixer'),
      browserSync = require('browser-sync'),
      rename      = require('gulp-rename'),
      sass        = require('gulp-sass');

gulp.task('css', function() {
  return gulp.src("src/scss/**/*.+(scss|sass)")
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(rename({
        prefix: "",
        suffix: ".min",
      }))
      .pipe(autoprefixer({
          overrideBrowserslist:  ['last 2 versions'],
          cascade: false
      }))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest("build/styles"))
      .pipe(browserSync.stream());
});