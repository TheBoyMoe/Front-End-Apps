let gulp = require('gulp');
let uglify = require('gulp-uglify');
let pump = require('pump');
let livereload = require('gulp-livereload');
let concat = require('gulp-concat');
let minifycss = require('gulp-minify-css');
let autoprefixer = require('gulp-autoprefixer');
let sourcemaps = require('gulp-sourcemaps');
let sass = require('gulp-sass');
let babel = require('gulp-babel');
let del = require('del');
let zip = require('gulp-zip');
let imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');
let jpgrecompress = require('imagemin-jpeg-recompress');

const JS_SRC_PATH = 'src/js/**/*.js';
const IMGS_PATH = 'src/imgs/**/*.{png,jpeg,jpg,svg,gif}';


gulp.task('export', function () {
	return gulp.src('public/**/*')
		.pipe(zip('webapp.zip'))
		.pipe(gulp.dest('./'));
});

// clean unwanted files from the public folder
gulp.task('clean', function () {
	return del.sync([
		'public/imgs/**/*.{png,jpeg,jpg,svg,gif}',
		'public/css/**/*.css',
		'public/js/**/*.js',
	]);
});

// compress png/jpg/jpeg/svg & gif using lossy/lossless algos
gulp.task('images', function () {
	
	return	gulp.src(IMGS_PATH)
		.pipe(
		imagemin([
			imagemin.gifsicle(),
			imagemin.jpegtran(),
			imagemin.optipng(),
			imagemin.svgo(),
			pngquant(),
			jpgrecompress()
		]))
		.pipe(gulp.dest('public/imgs'));
});

// autoprefix, minify, concatenate and preprocess sass to css
gulp.task('sass-styles', function (cb) {
	pump([
		gulp.src('src/scss/app.scss'),
		sourcemaps.init(),
		autoprefixer({
			browsers: ['last 2 versions']
		}),
		sass({
			outputStyle: 'compressed'
		}),
		sourcemaps.write(),
		gulp.dest('public/css'),
		livereload()
	], cb);
	
});

// transpile es6, minify and concatenate js files
gulp.task('scripts', function (cb) {
	pump([
		gulp.src(JS_SRC_PATH),
		sourcemaps.init(),
		babel({
			presets: ['es2015']
		}),
		uglify(),
		concat('app.js'),
		sourcemaps.write(),
		gulp.dest('public/js'),
		livereload()
	], cb);
	
});

// watch task - execute all the tasks prior to monitoring for any changes to css/js files
gulp.task('watch', ['default'], function () {
	
	// start static-server & launch livereload
	require('./server.js');
	livereload.listen();
	
	// watch for any changes to js & css files
	gulp.watch(JS_SRC_PATH, ['scripts']);
	gulp.watch('src/scss/**/*.scss', ['sass-styles']);
	
});

// default task - calls other tasks, before finishing with default task
gulp.task('default', ['clean', 'images', 'sass-styles', 'scripts'], function () {
	console.log(`...completing tasks!`);
});