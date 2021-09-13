'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

var DEV_JS = 'dev/js/*.js';
var DEV_SASS = 'dev/sass/*.scss';
var BUILT_PROD_JS = 'built/prod/js';
var BUILT_PROD_CSS = 'built/prod/css';
var BUILT_DEV_JS = 'built/dev/js';
var BUILT_DEV_CSS = 'built/dev/css';

gulp.task('concat', function(){
	return gulp.src(DEV_JS)
	.pipe(plumber())
	.pipe(concat('simple-ui.js'))
	.pipe(gulp.dest(BUILT_DEV_JS));
});

gulp.task('compress',['concat'], function(){
	return gulp.src(BUILT_DEV_JS + '/*.js')
	.pipe(plumber())
	// .pipe(uglify())
	.pipe(gulp.dest(BUILT_PROD_JS))
	.pipe(gulp.dest('demo/dev/js'));
});

gulp.task('sass', function(){
	return gulp.src(DEV_SASS)
	.pipe(plumber())
	.pipe(sass())
	.pipe(gulp.dest(BUILT_DEV_CSS));
});

gulp.task('minify-css',['sass'], function(){
	return gulp.src(BUILT_DEV_CSS + '/*.css')
	.pipe(plumber())
	.pipe(minifyCSS({keepSpecialComments: 1})
	.pipe(gulp.dest(BUILT_PROD_CSS))
	.pipe(gulp.dest('demo/dev/css')));
});

gulp.task('default', ['compress', 'minify-css']);