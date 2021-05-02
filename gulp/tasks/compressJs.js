// const gulp        = require('gulp'),
//       minify      = require('gulp-minify'),
//       browserSync = require('browser-sync');

import gulp from 'gulp'
import browserSync from 'browser-sync'
import minify from 'gulp-minify'

gulp.task('compressJs', function() {
  return gulp.src(['src/js/modules/*.js','src/js/*.js'])
    .pipe(minify())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});