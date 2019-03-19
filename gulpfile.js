var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();
// const image = require('gulp-image');
const webp = require('gulp-webp');
gulp.task('build', shell.task(['bundle exec jekyll serve']));

gulp.task('serve', function () {
    browserSync.init({server: {baseDir: '_site/'}});
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

// // just resize the images a bit
// gulp.task('image', function () {
//   gulp.src('./images/*')
//     .pipe(image())
//     .pipe(gulp.dest('./images'));
// });

// create .webp version of the images
gulp.task('image-webp', function () {
  gulp.src('./images/**/*.{jpg,png,tif}')
    .pipe(webp({preset: 'photo', quality: 90, method: 6, lossless: true}))
    .pipe(gulp.dest('./images/'));
});

gulp.task('default', ['build', 'serve']);
