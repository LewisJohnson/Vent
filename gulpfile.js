'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var htmlmin = require('gulp-htmlmin');
var clean = require('gulp-clean');
var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');
var runSequence = require('run-sequence');

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';


/* +===================+
   | DEVELOPMENT TASKS |
   +===================+
*/ 
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        proxy: "localhost/Vent/app/index.html",
        port: 8000
    });
    gulp.watch("./app/sass/**/*.{scss, _scss}", ['sass-dev', browserSync.reload]);
    gulp.watch("./app/*.html", browserSync.reload);
    gulp.watch("./app/php/**/*.php", ['php', browserSync.reload]);
    gulp.watch("./app/scripts/*.js", browserSync.reload);
});

//Compile SASS sourcemaps
gulp.task('sass-dev', function () {
    return gulp.src('./app/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/styles'));
});

//Clean dist folder
gulp.task('clean-dist', function () {
    gulp.src('./dist/**/*.*').pipe(clean());
});

//Copies all needed files to prod
gulp.task('php', function () {
    gulp.src('./app/php/**/*.php').pipe(gulp.dest('../public_html/php'));
});

/* +==================+
   | PRODUCTION TASKS |
   +==================+
*/ 


//Clean prod folder
gulp.task('clean-prod', function () {
    gulp.src('../public_html/**/*.*').pipe(clean({force: true}));
});

//Copies all needed files to prod
gulp.task('copy-to-prod', function () {
    gulp.src('./app/root/*.*').pipe(gulp.dest('../public_html'));
    gulp.src('./dist/*.html').pipe(gulp.dest('../public_html'));
    gulp.src('./dist/styles/*.css').pipe(gulp.dest('../public_html/styles'));
    gulp.src('./dist/scripts/*.js').pipe(gulp.dest('../public_html/scripts'));
    gulp.src('./app/php/**/*.php').pipe(gulp.dest('../public_html/php'));
    gulp.src('./app/images/*.*').pipe(gulp.dest('../public_html/images'));
});

//Copies all needed files to dist
gulp.task('copy-to-dist', function () {
    return gulp.src('./app/*.html').pipe(gulp.dest('./dist'));
});


//Compile and fuck up JS to dist
gulp.task('babel',  function () {
    return gulp.src('./app/scripts/**/*.js')
        .pipe(babel({
        	presets: ['es2015'],
        	comments: false,
        	minified: false
        }))
        .pipe(gulp.dest('./dist/scripts'));
});

//Minify HTML in dist
gulp.task('minify-html', function() {
    return gulp.src('./dist/*.html')
        .pipe(htmlmin({
        	collapseWhitespace: true, 
        	collapseInlineTagWhitespace: true, 
        	caseSensitive: true, 
        	decodeEntities: true, 
        	minifyCSS: true, 
        	minifyJS: true,
        	removeComments: true,
        	useShortDoctype: true
        }))
        .pipe(gulp.dest('./dist'));
});

//Compile SASS to dist
gulp.task('sass', function () {
    return gulp.src('./app/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/styles'));
});

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: './app/images/favicon-template.png',
		dest: './app/root',
		iconsPath: '/public_html',
		design: {
			ios: {
				pictureAspect: 'backgroundAndMargin',
				backgroundColor: '#ffffff',
				margin: '35%',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: true,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#ffffff',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: true,
					windows10Ie11EdgeTiles: {
						small: true,
						medium: true,
						big: true,
						rectangle: true
					}
				}
			},
			androidChrome: {
				pictureAspect: 'shadow',
				themeColor: '#000000',
				manifest: {
					name: 'Vent.',
					display: 'standalone',
					orientation: 'portrait',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: true,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'blackAndWhite',
				threshold: 60,
				themeColor: '#000000'
			}
		},
		settings: {
			compression: 5,
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
	return gulp.src('./dist/*.html')
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('./dist/'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});

//default
gulp.task('default', function(done) {
	runSequence('clean-dist', 'copy-to-dist', 'generate-favicon', 'inject-favicon-markups', 'minify-html', 'sass', 'babel', 'copy-to-prod', function() {
		gulp.start('clean-dist');
        done();
    });
});


//default
gulp.task('prod', function(done) {
    runSequence('clean-dist', 'copy-to-dist', 'inject-favicon-markups', 'minify-html', 'sass', 'babel', 'copy-to-prod', function() {
        gulp.start('clean-dist');
        done();
    });
});