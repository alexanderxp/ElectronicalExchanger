const gulp        = require('gulp'),
      babel       = require('gulp-babel'),
      del         = require('del'),
      exec        = require('child_process').exec,
      newer       = require('gulp-newer'),
      sourcemaps  = require('gulp-sourcemaps'),
      concat      = require('gulp-concat'),
      plumber     = require('gulp-plumber'),
      uglify      = require('gulp-uglify'),
      rename      = require('gulp-rename'),
      browserSync = require('browser-sync'),
      cssnano     = require('gulp-cssnano'),
      htmlMin     = require('gulp-htmlmin'),

      paths = {
        src_html: './app/*.html',
        src_js:   './app/js/*.js',
        src_css:  './app/css/*.css',
        dst_js:   './dist/js',
        dst_html: './dist/',
        dst_css:  './dist/css'
      },

      files = [
                  '*.html',
                  './css/**/*.css',
                  './js/**/*.js'
              ];

gulp.task('clean', () => {
  return del(paths.dst_html)
});

gulp.task('css', () => {
  return gulp.src(paths.src_css)
    .pipe(cssnano())
    .pipe(gulp.dest(paths.dst_css))
});

gulp.task('html', () => {
  return gulp.src(paths.src_html)
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.dst_html))
});

gulp.task('js', () => {
  return gulp.src(paths.src_js)
    .pipe(plumber())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(paths.dst_js)) 
});

gulp.task('build', gulp.series('html', 'css', 'js'), () => {});

gulp.task('watching', () => {
  return gulp.src(paths.src_js)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dst_js))
    .pipe(browserSync.stream({ match: 'dist/*.html' }))
})

gulp.task('browser-sync', () => {
  browserSync.init(files, {
    server: {
      baseDir: './dist',
      injectChanges: true
    }
  });
});

gulp.task('watch', gulp.series('browser-sync'), () => {
  gulp.watch(paths.src_js, gulp.series('watching'));
  gulp.watch(paths.dst_html, browserSync.reload);
});

