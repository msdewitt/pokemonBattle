(function() {
  'use strict';
  var gulp = require('gulp');
  var order = require('gulp-order');
  var concat = require('gulp-concat');
  var plumber = require('gulp-plumber');
  var sourcemaps = require('gulp-sourcemaps');
  var babel = require('gulp-babel');
  var connect = require('gulp-connect');
  // var uglify = require('uglify');

  gulp.task('bundle', bundle);
  // gulp.task('vendor', vendor);
  // gulp.task('css', css);
  gulp.task('start-web-server', startWebServer);
  gulp.task('watch', watch);
  gulp.task('default', ['bundle', 'start-web-server', 'watch']); //'vendor', 'css'

  ////////////////////

  var jsFiles = [
    'app/**/*.js',
    '!app/bower_components/**/*',
    '!app/content/bundle.js'
  ];
  // var vendorJSFiles = [
  //   'app/bower_components/jquery/dist/jquery.min.js',
  //   'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
  //   'app/bower_components/angular-loader/angular-loader.min.js',
  //   'app/bower_components/angular/angular.js',
  //   'app/bower_components/angular-ui-router/release/angular-ui-router.js',
  //   'app/bower_components/angular-flash-alert/dist/angular-flash.js',
  //   'app/bower_components/textAngular/dist/textAngular-rangy.min.js',
  //   'app/bower_components/textAngular/dist/textAngular-sanitize.min.js',
  //   'app/bower_components/textAngular/dist/textAngular.min.js'
  // ];
  // var vendorCSSFiles = [
  //   <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Merriweather:400,300,300italic|Oxygen:400,300,700">
  //   'content/bower_components/font-awesome/css/font-awesome.css',
  //   'content/bower_components/bootstrap/dist/css/bootstrap.css',
  //   'content/bower_components/textAngular/dist/textAngular.css'
  // ];

  function bundle() {
    return gulp.src(jsFiles)
      .pipe(order([
        'app/app.module.js',              // put the main module first
        'app/**/*.module.js',             // followed by all other modules
        'app/**/*.js'                     // and all other JS files
      ], { base: './' }))
      .pipe(plumber())                    // restart gulp on error
      .pipe(sourcemaps.init())            // let sourcemaps watch this pipeline
      .pipe(babel({
        presets: ['es2015']
      }))                                 // transpile into ES5 for browsers
      .pipe(concat('bundle.js'))          // concatenate all JS files
      .pipe(sourcemaps.write('.'))        // emit the .map file for debugging
      .pipe(gulp.dest('app/content'));
  }

  // function vendor() {
  //   return gulp.src(vendorJSFiles)
  //     .pipe(order([
  //       'app/app.module.js',              // put the main module first
  //       'app/**/*.module.js',             // followed by all other modules
  //       'app/**/*.js'                     // and all other JS files
  //     ], { base: './' }))
  //     .pipe(plumber())                    // restart gulp on error
  //     .pipe(sourcemaps.init())            // let sourcemaps watch this pipeline
  //     .pipe(babel({
  //       presets: ['es2015']
  //     }))                                 // transpile into ES5 for browsers
  //     .pipe(concat('bundle.js'))
  //     .pipe(uglify())          // concatenate all JS files
  //     .pipe(sourcemaps.write('.'))        // emit the .map file for debugging
  //     .pipe(gulp.dest('app/content'));
  // }
  {/*function css(){
    return gulp.src(vendorCssFiles)
  }*/}

  function startWebServer() {
    connect.server({
      root: 'app',
      port: 8000
    });
  }

  function watch() {
    gulp.watch(['app/**/*', 'gulpfile.js'], ['bundle']); //'!app/content/bundle.*' ['vendor', 'css']
  }
})();
