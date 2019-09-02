var gulp = require('gulp');
var runSequence = require('run-sequence');
var protractor = require('gulp-protractor').protractor;
var taskListing = require('gulp-task-listing');
var webdriver_update = require('gulp-protractor').webdriver_update_specific;

// Application under Test
const APP_NAME = 'SuperCalculator';

gulp.task('webdriver_update', webdriver_update({
    webdriverManagerArgs: ['--ignore_ssl', 'update', '--ie64']
}));

gulp.task('protractor', function() {
    var configFile = 'test/e2e/conf.js';

    return gulp
        .src([`./test/apps/${APP_NAME}/testCases/*.js`])
        .pipe(protractor({
            configFile: configFile
        }))
        .on('error', function(e) {
            throw e;
        });
});

gulp.task('test:apps', function(callback) {
    runSequence(
        //'webdriver_update',
        'protractor',
        callback
    );
});

gulp.task('default', taskListing);