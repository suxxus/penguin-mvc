const gulp = require('gulp');
const run = require('gulp-run');

gulp.task('watch', function() {
    return gulp.watch('src/**/*', function() {
        run('npm run lint').exec();
        run('npm run test').exec();
    });
});

gulp.task('default', ['watch']);
