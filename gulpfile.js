var gulp = require('gulp');
var webpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var jpegtran = require('imagemin-jpegtran');
var imagemin = require('gulp-imagemin');
var optipng = require('imagemin-optipng');
var imageResize = require('gulp-image-resize');
var responsive = require('gulp-responsive');
var exec = require('child_process').exec;

// hugo server
gulp.task('default', function(cb) {
  var watcher = gulp.watch('src/images/**/*.jpg');
  watcher.on('change', function(event) {
    console.log(event);
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.src(event.path, { base: 'src'})
    .pipe(responsive({
      // Resize all JPG images to three different sizes: 200, 500, and 630 pixels
      'images/**/*.jpg': [{
        width: 640,
      }, {
        width: 64,
        rename: { suffix: '-64x'},
      }, {
        width: 320,
        rename: { suffix: '-320x' },
      }, {
        width: 640,
        rename: { suffix: '-640x' },
      }, {
        width: 1280,
        rename: { suffix: '-1280x' },
      }, {
        // Compress, strip metadata, and rename original image
        rename: { suffix: '-o' },
      }],
      // Resize all PNG images to be retina ready TODO
      // '/images/**/*.png': [{
      //   width: 250,
      // }, {
      //   width: 250 * 2,
      //   rename: { suffix: '@2x' },
      // }],
    }, {
      // Global configuration for all images
      // The output quality for JPEG, WebP and TIFF output formats
      quality: 70,
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Strip all metadata
      withMetadata: false,
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('static/'));
  });
  
  // hugo
  exec('hugo server -t hugo-zen', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (err) return cb(err); // return error
    cb(); // finished task
  });
});

//CSS圧縮
gulp.task('minify-css', function() {
  return gulp.src("themes/hugo-zen/static/css/*.css")
  .pipe(cleanCSS())
  .pipe(gulp.dest('dist/css/'));
});

gulp.task('imagemin', function() {
  return gulp.src('src/images/**/*.jpg')
  .pipe(imageResize({
    width : 600,
  }))
  .pipe(imagemin())
  // .pipe(webpack())
  .pipe(gulp.dest('static/'));
});

gulp.task('imagemin-1', function() {
  return gulp.src(event.path, {base: 'src'})
  .pipe(gulp.dest('static/'));
})

gulp.task('responsive', function(){
  return gulp.src(['src/images/**/*.jpg','src/images/**/*.png'], { base: 'src'})
  .pipe(responsive({
    // Resize all JPG images to three different sizes: 64, 320, 640, and 1280 pixels
    'images/**/*.jpg': [{
      width: 640, // default size
    },  {
      width: 64,
      rename: { suffix: '-64x'},
    }, {
      width: 320,
      rename: { suffix: '-320x' },
    }, {
      width: 640,
      rename: { suffix: '-640x' },
    }, {
      width: 1280,
      rename: { suffix: '-1280x' },
    }, {
      // Compress, strip metadata, and rename original image
      rename: { suffix: '-o' },
    }],
    // Resize all PNG images to be retina ready
    'images/**/*.png': [{
      width: 250,
    }, {
      width: 250 * 2,
      rename: { suffix: '@2x' },
    }],
  }, {
    // Global configuration for all images
    // The output quality for JPEG, WebP and TIFF output formats
    quality: 70,
    // Use progressive (interlace) scan for JPEG and PNG output
    progressive: true,
    // Strip all metadata
    withMetadata: false,
  }))
  .pipe(imagemin())
  .pipe(gulp.dest('static/'));
});
