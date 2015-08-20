// include gulp
var gulp = require('gulp'); 
 
// include plug-ins
var jshint = require('gulp-jshint');
 
// JS hint task
gulp.task('jshint', function() {
  gulp.src('./js/app.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// include plug-ins
var minifyHTML = require('gulp-minify-html');
 
// minify new or changed HTML pages
gulp.task('index', function() {
  var htmlSrc = './*.html',
      htmlDst = './build';
 
  gulp.src(htmlSrc)
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});


// include plug-ins
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
 
// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(["css/offline-language-english.css","css/offline-theme-chrome.css","css/style.css", "css/windy.css","css/demo.css","css/style1.css","css/bootstrap.min.css",])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css/'));
  });

// include plug-ins
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
 
// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src([ "js/knockout-3.3.0.js","./js/jquery.min.js", "js/modernizr.custom.79639.js","js/app.js","js/jquery.windy.js","js/windy.nav.js","js/offline.min.js"])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

// default gulp task
gulp.task('default', [ 'index', 'scripts', 'styles'], function() {
});
