// const gulp = require('gulp');
import gulp from 'gulp'

gulp.task('default', gulp.parallel('watch', 'css', 'compressImg'));