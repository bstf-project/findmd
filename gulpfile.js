var gulp = require('gulp')
// Requires the gulp-sass plugin
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var minifycss = require('gulp-uglifycss') // Minifies CSS files.
var mmq = require('gulp-merge-media-queries')
var browserSync = require('browser-sync').create()

// Utility related plugins.
var rename = require('gulp-rename') // Renames files E.g. style.css -> style.min.css
var filter = require('gulp-filter') // Enables you to work on a subset of the original files by filtering them using globbing.
var sourcemaps = require('gulp-sourcemaps') // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css)
var notify = require('gulp-notify') // Sends message notification to you

const AUTOPREFIXER_BROWSERS = [
  'last 2 version',
  '> 1%',
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4',
  'bb >= 10'
]

var input = 'sass/**/*.scss'
var output = 'css/'

gulp.task('sass', function () {
  return gulp.src(input)
  .pipe(sass({
    errLogToConsole: true,
    outputStyle: 'compact',
    precision: 10
  }
  )
  .on('error', sass.logError)
  )
  .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
  .pipe(gulp.dest(output))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss({
    maxLineLen: 10
  }))

    .pipe(filter('css/*.css')) // Filtering stream to only css files
    .pipe(mmq({log: true})) // Merge Media Queries only for .min.css version.
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream())
})
gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: './',
    injectChanges: true
  })

  gulp.watch(input, ['sass'])
  gulp.watch('*.html').on('change', browserSync.reload)
  gulp.watch('js/*.js').on('change', browserSync.reload)
})

gulp.task('default', ['serve'])
