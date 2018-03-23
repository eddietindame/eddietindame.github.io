const gulp = require('gulp')
const gutil = require('gulp-util')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const browserify = require('browserify')
const babelify = require('babelify')
const webserver = require('gulp-webserver')
const rename = require('gulp-rename')
const sass = require('gulp-ruby-sass')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const opn = require('opn')
const pug = require('gulp-pug')

const paths = {
  SRC: {
    PUG:  './src/template/index.pug',
    SCSS: './src/scss/index.scss',
    JS:   './src/js/index.js'
  },
  DIST: {
    CSS:  './dist/css/',
    HTML: './',
    JS:   './dist/js/'
  }
}

const server = {
  HOST: 'localhost',
  PORT: '6969'
}

gulp.task('webserver', () => {
  return gulp.src('.')
    .pipe(webserver({
      host:             server.HOST,
      port:             server.PORT,
      livereload:       true,
      directoryListing: true
    }))
})

gulp.task('openbrowser', () => {
  opn('http://'
      + server.HOST
      + ':'
      + server.PORT
      + '/index.html',
      {app: ['google chrome']})
})

const js = () => {
  const b = browserify({
    entries: paths.SRC.JS,
    debug: true
  }).transform('babelify', {
    presets: ['env', 'react']
  })

  return b.bundle()
    .pipe(source(paths.SRC.JS))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadmaps: true
    }))
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(rename('app.js'))
    .pipe(gulp.dest(paths.DIST.JS))
}

const css = () =>
  sass(paths.SRC.SCSS)
    .on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(paths.DIST.CSS))

const html = () => {
  return gulp.src(paths.SRC.PUG)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.DIST.HTML))
}

gulp.task('assets', () => {
  return gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./dist/img'))
})

gulp.task('watch', () => {
  gulp.watch(['src/template/**/*.pug'], html)
  gulp.watch('src/scss/**/*.scss', css)
  gulp.watch(['src/js/**/*.js'], js)
})

gulp.task('dist', gulp.series(js, css, html, 'assets'))
gulp.task('server', gulp.parallel('watch', 'webserver'))
gulp.task('default', gulp.parallel('dist', 'server', 'openbrowser'))
