var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();
const webp = require('gulp-webp');
const extReplace = require("gulp-ext-replace");

gulp.task('build', shell.task(['bundle exec jekyll serve']));

gulp.task('serve', function () {
    browserSync.init({server: {baseDir: '_site/'}});
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

// create .webp version of the images
gulp.task('images', function () {
  return gulp.src('./images/**/*.{jpg,png,tif}')
    .pipe(webp({preset: 'photo', quality: 90, method: 6, lossless: true}))
    .pipe(extReplace(".webp"))
    .pipe(gulp.dest('./images/'));
});

gulp.task('default', ['build', 'serve']);
