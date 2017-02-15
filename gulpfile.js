var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

gulp.task('default', function() {
  console.log("task");
});

//CSS圧縮
gulp.task('minify-css', function() {
    return gulp.src("themes/hugo-zen/static/css/*.css")
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css/'));
});