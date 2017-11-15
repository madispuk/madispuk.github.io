var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var critical = require('critical');

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


gulp.task('minify-css', () => {
  return gulp.src([
    'assets/css/styles-11.css',
    'assets/plugins/bootstrap/css/bootstrap.min.css',
    'assets/plugins/font-awesome/css/font-awesome.css',
  ])
  .pipe(minifyCSS())
  .pipe(concat('style.min.css'))
  .pipe(gulp.dest('dist/css'))
})

gulp.task('copy-fonts', () => {
  return gulp.src('./assets/plugins/font-awesome/fonts/*', {base: './assets/plugins/font-awesome/fonts'})
    .pipe(gulp.dest('./dist/fonts/'));
})

gulp.task('build', function() {
  critical.generate({
      inline: true,
      src: 'index-raw.html',
      dest: 'index.html',
      minify: true,
      width: 1300,
      height: 900
  });
    // return gulp.src('./index.html')
    //     .pipe(inlineCss())
    //     .pipe(gulp.dest('build/'));
});
