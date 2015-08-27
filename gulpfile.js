'use strict';

// Add gulp plugin
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
// var cached = require('gulp-cached');
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
    .pipe(gulp.dest('public/js/'))
    .pipe(uglify())
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(gulp.dest('public/js/'));
});

// ------------------------------------------------------------------
// Task:CSS
// ------------------------------------------------------------------

// SCSS：Autoprefix => minify
gulp.task('sass', function() {
  return gulp.src(paths.scssSrc)
    .pipe(cached('sass'))
    .pipe(plumber())
    .pipe(compass({
      config_file: './compass-config.rb',
      css: paths.cssDir,
      sass: './src/public/page/sass'
    }))
    .pipe(please({
      autoprefixer: {browsers: ['last 2 versions']},
      minifier: true
    }))
    .pipe(gulp.dest(paths.cssDir));
    // .pipe(reload({stream: true}));
});

// ------------------------------------------------------------------
// Task:for Command
// ------------------------------------------------------------------

gulp.task('default', ['webpack', 'watch']);
gulp.task('watch', function() {
  // gulp.watch(paths.scssSrc, ['sass']);
  gulp.watch('./src/js/*.js', ['webpack']);
});
