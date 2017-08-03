const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const browserSync = require('browser-sync');
const proxy = require('proxy-middleware');
const babelify = require('babelify');
const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const run = require('gulp-run');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const url = require('url');
const watchify = require('watchify');

const customOpts = {
  entries: ['src/scripts/index.js'],
  debug: true,
  transform: [babelify],
};

const opts = Object.assign({}, watchify.args, customOpts);
const b = watchify(browserify(opts));

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build'));
}

b.on('update', bundle);
b.on('log', gutil.log);

// tasks
// ----------------------
gulp.task('watchify', () => bundle());

gulp.task('clean:build', () => del('./build/*'));

gulp.task('build:js', () => browserify(Object.assign({}, customOpts, { debug: false }))
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(gulp.dest('./build')));

gulp.task('copy:html', () => gulp.src('./src/index.html')
  .pipe(gulp.dest('./build')));

gulp.task('copy:styles', () => gulp.src('./src/styles/*.css')
  .pipe(gulp.dest('./build')));

gulp.task('dev:server', () => run('yarn run freddie').exec());

gulp.task('watch', () => gulp.watch('./src/**/*.js', () => {
  run('yarn run lint').exec();
  run('yarn run test').exec();
}));

gulp.task('browser-sync', () => {
  const proxyOpts = function proxyoptions(value) {
    const proxyOptions = url.parse(value);
    proxyOptions.route = '/api';
    return proxyOptions;
  };

  const bs = browserSync.create();

  bs.watch('./build/*').on('change', bs.reload);
  bs.init({
    server: {
      name: 'dev',
      baseDir: './build',
      middleware: [proxy(proxyOpts('http://localhost:4000/api'))],
    },
    port: 5000,
    ui: {
      port: 3012,
    },
    reloadDelay: 3000,
  });
});

gulp.task('dev', ['dev:server', 'watch']);

gulp.task('default', ['dev:server', 'copy:html', 'copy:styles', 'watch', 'watchify', 'browser-sync']);

gulp.task('build', () => {
  runSequence('clean:build', 'build:js', 'copy:html', 'copy:styles');
});
