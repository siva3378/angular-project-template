var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

var buildPath = '../build/';
var srcPath = "../src/";
var srcPath = srcPath;
var indexPath = '../';

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);
/************************************************************************
 * CSS Related tasks
 ***********************************************************************/
/* To remove generated CSS from SASS */
gulp.task('clean-styles', function (done) {
    clean(srcPath + config.appCss, true, done);
});
/* To generate CSS from SASS */
gulp.task('styles', ['clean-styles'], function () {
    return gulp
            .src(srcPath + config.sassFiles)
            .pipe($.plumber())
            .pipe($.sass())
            .pipe(gulp.dest(srcPath + config.styles));
});
/* Watch for any change in SASS files*/
gulp.task('sass-watcher', function () {
    gulp.watch([srcPath + config.sassFiles], ['styles']);
});

gulp.task('build-css', function () {

})

//Get all main lib files into one folder
gulp.task('vendor-main-files', function () {
    var mainBowerFiles = require('main-bower-files');
    var jsFilter = $.filter('*.js');
    var cssFilter = $.filter('*.css');
    var fontFilter = $.filter(['*.eot', '*.woff', '*.svg', '*.ttf']);

    return gulp.src(mainBowerFiles())
            // grab vendor js files from bower_components, minify and push in /public
            .pipe(jsFilter)
//            .pipe(gulp.dest(buildPath + '/js/vendor'))
            .pipe($.concat(config.build.allLibJs))
            .pipe($.uglify())
            .pipe(gulp.dest(buildPath+'/js'))
            .pipe(jsFilter.restore())
            // grab vendor css files from bower_components, minify and push in /public
            .pipe(cssFilter)
            .pipe($.minifyCss())
            .pipe($.concat(config.build.allLibCss))
            .pipe(gulp.dest(buildPath+'/css'))
            .pipe(cssFilter.restore())

            // grab vendor font files from bower_components and push in /public 
            .pipe(fontFilter)
            .pipe($.flatten())
            .pipe(gulp.dest(buildPath + '/fonts'))

});

gulp.task('inject-build', ['vendor-main-files', 'styles'], function () {
    log('Wire up the app css into the html and call wiredep');
    var indexFile = indexPath + config.indexPage;
    var files = config.getRelative(srcPath, config.cssFiles)
            .concat(config.getRelative(srcPath, config.appJs));
//            .concat(config.getRelative('!' + srcPath, config.specJs));
    log(files);
    return gulp
            .src(indexFile)
            .pipe($.print())
            .pipe($.inject(gulp.src(files, {read: false}), {addRootSlash: false, relative: true}))
            .pipe(gulp.dest(indexPath));

});
/************************************************************************
 * Tasks to Inject application Related files into index page
 ************************************************************************/

gulp.task('wiredep', function () {
    log('Wire up the bower css, js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;
    log(wiredep(options))
    var indexFile = indexPath + config.indexPage;
    return gulp
            .src(indexFile)
            .pipe(wiredep(options))
            .pipe(gulp.dest(indexPath));
});


gulp.task('inject', ['wiredep', 'styles'], function () {
    log('Wire up the app css into the html and call wiredep');
    var indexFile = indexPath + config.indexPage;
    var files = config.getRelative(srcPath, config.cssFiles)
            .concat(config.getRelative(srcPath, config.appJs));
//            .concat(config.getRelative('!' + srcPath, config.specJs));
    log(files);
    return gulp
            .src(indexFile)
            .pipe($.print())
            .pipe($.inject(gulp.src(files, {read: false}), {addRootSlash: false, relative: true}))
            .pipe(gulp.dest(indexPath));

});

/* To remove generated template file for angular template cache */
gulp.task('clean-templates', function (done) {
    clean(config.html2js.dest + config.html2js.file, true, done);
});
gulp.task('html2js', ['clean-templates'], function () {
    var ngHtml2Js = require("lingon-ng-html2js");

    return gulp.src(config.html2js.templates)
            .pipe($.print())
            .pipe(ngHtml2Js(config.html2js.options))
            .pipe($.concat(config.html2js.file))
            .pipe(gulp.dest(config.html2js.dest));
});
gulp.task('html2js-watcher', function () {
    gulp.watch(config.html2js.templates, ['html2js']);
});
/*****************************************************************************
 * Tasks for Unit testing coverage cleaning
 *****************************************************************************/
gulp.task('karma-coverage-files', function () {
    return gulp
            .src(['../src/app/**/*.js.html', '../src/app/**/index.html'])
            .pipe($.print())
            .pipe(gulp.dest('temp/'));
});
gulp.task('clean-karma-coverage', ['karma-coverage-files'], function (done) {
    clean('../src/app/**/*.js.html', done);
    clean('../src/app/**/index.html', done);
})

///////////////// Helper methods //////////////////////////////////////////////
function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

function clean(path, isForce, done) {
    log('Cleaning:' + $.util.colors.gray(path));
    del(path, {force: isForce}, done);
}