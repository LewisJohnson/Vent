'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        proxy: "localhost/public_html/app/index.html",
        port: 8000
    });
    gulp.watch("app/sass/**/*.{scss, _scss}", ['sass', browserSync.reload]);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/php/*.php").on('change', browserSync.reload);
    gulp.watch("app/scripts/*.js").on('change', browserSync.reload);
});

//Compile JS
gulp.task('babel',  function () {
    return gulp.src('src/app.js')
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('dist'));
});

//Compile SASS
gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/styles'));
});