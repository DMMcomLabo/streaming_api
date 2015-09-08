'use strict';

// Add gulp plugin
var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cached = require('gulp-cached');
var plumber = require('gulp-plumber');

// Add webpack-stream
var webpack = require('webpack-stream');

// ------------------------------------------------------------------
// Task:JS
// ------------------------------------------------------------------

// Webpack (Concat => Uglify )
gulp.task('webpack', function() {
  return gulp.src('./src/js/lib.js')
    .pipe(plumber())
  	.pipe(webpack(require('./webpack.config.js')))
    // .pipe(gulp.dest('public/js/'))
    // .pipe(uglify())
    // .pipe(rename({
    //     extname: '.min.js'
    // }))
    .pipe(gulp.dest('./public/js/'));
});

// ------------------------------------------------------------------
// Task:CSS
// ------------------------------------------------------------------
var fontArr = [
    './public/js/**/*.eot',
    './public/js/**/*.woff2',
    './public/js/**/*.ttf',
    './public/js/**/*.svg',
    './public/js/**/*.woff'
];

// Webfont:Copy => DirectoryChange
gulp.task('copy:font', function() {
    return gulp.src(fontArr)
    .pipe(gulp.dest('public/'))
    .on('end', function(){
        del(fontArr);
    });
});

// SCSS：Autoprefix => minify
gulp.task('sass', function () {
  gulp.src('./src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(cached('sass'))
    .pipe(sass())
    .pipe(gulp.dest('./public/css'));
});

// ------------------------------------------------------------------
// Task:for Command
// ------------------------------------------------------------------

gulp.task('default', ['webpack', 'watch']);
gulp.task('watch', ['sass', 'webpack'], function() {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/js/*.js', ['webpack']);
});
