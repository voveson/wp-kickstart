/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2011-2014 Webcomm Pty Ltd
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// Load plugins
var
  gulp         = require('gulp'),
  less         = require('gulp-less'),
  minifycss    = require('gulp-minify-css'),
  uglify       = require('gulp-uglify'),
  rimraf       = require('gulp-rimraf'),
  concat       = require('gulp-concat'),
  notify       = require('gulp-notify'),
  cache        = require('gulp-cache'),
  imagemin     = require('gulp-imagemin'),
  path         = require('path'),
  livereload   = require('gulp-livereload'),
  gulpif       = require('gulp-if'),
  template     = require('gulp-template-compile');

var config = {
  
  // Should CSS & JS be compressed?
  minifyCss: false,
  uglifyJS: true,
  optimize: true,
  assetDir: 'wp-content/themes/project-theme/',
  templateDir: 'wp-content/themes/project-theme/page_templates/',
  themeDir: 'wp-content/themes/project-theme/'
};

// CSS
gulp.task('css', function() {
  var stream = gulp
    .src('src/less/styles.less')
    .pipe(less().on('error', notify.onError(function (error) {
      return 'Error compiling LESS: ' + error.message;
    })));
    
  if (config.minifyCss === true) {
    stream.pipe(minifycss());
  }

  return stream
    .pipe(gulp.dest(config.assetDir + 'css'))
    .pipe(notify({ message: 'Successfully compiled LESS', onLast: true }));
});

// Materialize Fonts
gulp.task('materialize-fonts', function() {
  return gulp.src('bower_components/materialize/dist/font/**/*')
    .pipe(gulp.dest(config.assetDir + 'font'))
    .pipe(notify({ message: 'Successfully processed Materialize Fonts', onLast: true}));
});

// Materialize CSS
gulp.task('materialize', function() {
  return gulp.src('bower_components/materialize/dist/css/materialize.css')
    .pipe(gulp.dest(config.assetDir + 'css'))
    .pipe(notify({ message: 'Successfully processed Materialize.css'}));
});

/*
gulp.task('animate', function() {
  return gulp.src('css_libraries/animate_css/animate.min.css')
    .pipe(gulp.dest(config.assetDir + 'css'))
    .pipe(notify({ message: 'Successfully processed Animate.css'}));
});*/

// Templates
gulp.task('templates', function() {
	return gulp.src('src/page_templates/*.php')
	  .pipe(gulp.dest(config.templateDir))
	  .pipe(notify({ message: 'Successfully processed Page Templates', onLast: true }));
});

// Templates
gulp.task('theme-files', function() {
  return gulp.src('src/theme_files/*.php')
      .pipe(gulp.dest(config.themeDir))
      .pipe(notify({ message: 'Successfully processed Theme Files', onLast: true }));
});

// JS
var jsFiles = {
  library: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/materialize/dist/js/materialize.js',
    'bower_components/jquery-ui/jquery-ui.js',
    'bower_components/jquery.cookie/jquery.cookie.js'
  ],
  theme: [
    'src/js/*.js'
  ]
};

function js(index)
{
  return gulp.src(jsFiles[index])
    .pipe(concat(index+'.js'))
    .pipe(gulpif(config.uglifyJS === true, uglify()))
    .pipe(gulp.dest(config.assetDir + 'js'))
    .pipe(notify({ message: 'Successfully compiled JavaScript: ' + index }));
}

gulp.task('js-library', function() {
  return js('library');
});

gulp.task('js', function(){
  return js('theme');
});

// Images
gulp.task('images', function() {
  return gulp
    .src('src/images/**/*')
    .pipe(gulpif(config.optimize, imagemin()))
    .pipe(gulp.dest(config.assetDir+'images'))
    .pipe(notify({ message: 'Successfully processed Images', onLast: true }));
});

// Webfonts
gulp.task('webfonts', function() {
  return gulp
    .src([
      'src/webfonts/**/*'
    ])
    .pipe(gulp.dest(config.assetDir + 'webfonts'))
    .pipe(notify({ message: 'Successfully processed Webfonts', onLast: true }));
});

// Rimraf
gulp.task('rimraf', function() {
  return gulp
    .src(['css', 'js'], {read: false})
    .pipe(rimraf());
});

// Default task
gulp.task('default', ['rimraf'], function() {
    gulp.start('css', 'materialize-fonts', 'materialize', 'js-library', 'js', 'images', 'webfonts', 'templates', 'theme-files');
});

// Watch
gulp.task('watch', function() {

  // Watch .less files
  gulp.watch('src/less/**/*.less', ['css']);

  // Watch .js files
  gulp.watch(jsFiles['library'], ['js-library']);
  gulp.watch(jsFiles['theme'], ['js']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Watch webfonts
  gulp.watch('src/webfonts/**/*', ['webfonts']);

  // Watch templates
  gulp.watch('src/page_templates/*.php', ['templates']);

  // Watch theme files
  gulp.watch('src/theme_files/*.php', ['theme-files']);

  // Livereload
  livereload.listen();
  gulp.watch(config.assetDir + '**/*').on('change', livereload.changed);
  gulp.watch(config.templateDir + '**/*').on('change', livereload.changed);
});
