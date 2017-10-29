let gulp = require("gulp");
let babel = require("gulp-babel");
let rename = require("gulp-rename");
let uglify = require("gulp-uglify");
let exec = require("child_process").exec;
let gutil = require("gulp-util");

const js_bundle_dest = "bin/";

gulp.task("js_dev", function () {
  return gulp.src('bin/dev_bundle.js')
    .pipe(babel())
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(rename('dev_bundle.min.js'))
    .pipe(gulp.dest(js_bundle_dest));
});

gulp.task("js_prod", function () {
  return gulp.src('bin/prod_bundle.js')
    .pipe(babel())
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(rename('prod_bundle.min.js'))
    .pipe(gulp.dest(js_bundle_dest));
});

gulp.task("default", ['js_dev', 'js_prod']);
