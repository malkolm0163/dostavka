var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSynk = require('browser-sync'),
// concat = require('gulp-concat'),
// uglify = require('gulp-uglifyjs'),
// rename = require('gulp-rename'),
// cssnano = require('gulp-cssnano'),
// del = require('del'),
// imagemin = require('gulp-imagemin'),
// pngquant = require('imagemin-pngquant'),
// cache = require('gulp-cache'),
    autoPrefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(autoPrefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade:true}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSynk.reload({
            stream: true
        }))
});
gulp.task('browserInit', function () {
    browserSynk({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});
gulp.task('startWatch', ['browserInit', 'sass'], function () {
    gulp.watch('app/sass/**/*.sass', [sass]);
    gulp.watch('app/**/*.html', browserSynk.reload);
    gulp.watch('app/js/**/*.js', browserSynk.reload);
});
gulp.task('default', ['startWatch']);