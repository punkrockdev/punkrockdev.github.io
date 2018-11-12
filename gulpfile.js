const gulp = require('gulp');
const image = require('gulp-image');
const webp = require('gulp-webp');


// just resize the images a bit
gulp.task('image', function () {
  gulp.src('./images/*')
    .pipe(image())
    .pipe(gulp.dest('./images'));
});

// create .webp version of the images
gulp.task('image-webp', function () {
  gulp.src('./images/**/*')
    .pipe(webp())
    .pipe(gulp.dest('./images/'));
});

gulp.task('default', ['image', 'image-webp']);
