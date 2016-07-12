var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    watchPath = require('gulp-watch-path'),
    combiner = require('stream-combiner2'),
    sourcemaps = require('gulp-sourcemaps'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    sass = require('gulp-ruby-sass'),
    imagemin = require('gulp-imagemin'),

    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat');

var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
}

gulp.task('watchjs', function () {
    gulp.watch('../Public/static/js/**/*.js', function (event) {
        var combined = combiner.obj([
        gulp.src('../Public/static/js/**/*.js'),
        concat('all.min.js'),
        uglify(),
        gulp.dest('dist/js/')
    ])
    combined.on('error', handleError);
    })
})

gulp.task('uglifyjs', function () {
    var combined = combiner.obj([
        gulp.src('../Public/static/js/**/*.js'),
        concat('all.min.js'),
        uglify(),
        gulp.dest('dist/js/')
    ])
    combined.on('error', handleError)
})


gulp.task('watchcss', function () {
    gulp.watch('../Public/static/css/**/*.css', function (event) {
        gulp.src('../Public/static/css/**/*.css')
        .pipe(autoprefixer({
          browsers: 'last 2 versions'
        }))
        .pipe(concat('all.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css/'));
    })
})

gulp.task('minifycss', function () {
    gulp.src('../Public/static/css/**/*.css')
        .pipe(autoprefixer({
          browsers: 'last 2 versions'
        }))
        .pipe(concat('all.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css/'))
})

gulp.task('watchimage', function () {
    gulp.watch('src/images/**/*', function (event) {
        var paths = watchPath(event,'src/','dist/')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(imagemin({
                progressive: true
            }))
            .pipe(gulp.dest(paths.distDir))
    })
})

gulp.task('image', function () {
    gulp.src('src/images/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'))
})

gulp.task('watchcopy', function () {
    gulp.watch('src/fonts/**/*', function (event) {
        var paths = watchPath(event,'src/', 'dist/')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir))
    })
})


gulp.task('default', ['uglifyjs', 'minifycss', 'watchjs', 'watchcss', 'watchimage'])