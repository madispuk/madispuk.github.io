var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('vendor-bundle', function() {
  gulp.src([
    'assets/plugins/jquery-3.2.1.min.js',
    'assets/plugins/popper.min.js',
    'assets/plugins/bootstrap/js/bootstrap.min.js',
    'assets/plugins/back-to-top.js',
    'assets/plugins/jquery-scrollTo/jquery.scrollTo.min.js',
    'assets/plugins/easy-pie-chart/dist/jquery.easypiechart.min.js',
    'assets/plugins/imagesloaded.pkgd.min.js',
    'assets/plugins/isotope.pkgd.min.js',
    'assets/js/main.js',

  ])
  .pipe(concat('bundle.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});
