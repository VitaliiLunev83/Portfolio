var syntax = 'scss', // Syntax: sass or scss;
    gulpversion = '4'; //   4

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    rsync = require('gulp-rsync');

// Local Server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false,
        // open: false,
        // online: false, // Work Offline Without Internet Connection
        // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
    })
});

// Sass|Scss Styles
gulp.task('styles', function() {
    return gulp.src('app/' + syntax + '/**/*.' + syntax + '')
        .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream())
});

// JS
gulp.task('scripts', function() {
    return gulp.src([
            'app/libs/jquery/dist/jquery.min.js',
            'app/js/common.js', // Always at the end
        ])
        .pipe(concat('scripts.min.js'))
        // .pipe(uglify()) // Mifify js (opt.)
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }))
});

// HTML Live Reload
gulp.task('code', function() {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

// Deploy



// If Gulp Version 4
if (gulpversion == 4) {



    gulp.task('watch', function() {
        gulp.watch('app/' + syntax + '/**/*.' + syntax + '', gulp.parallel('styles'));
        gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
        gulp.watch('app/*.html', gulp.parallel('code'))
    });
    gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));

}