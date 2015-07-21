module.exports = function () {

    var bower_components_dir = "../src/libs";

    var config = {
        indexPage: 'index.html',
        build: {
            allLibJs: 'all_libs.min.js',
            allLibCss: 'all_libs.min.css',
            allFonts: 'all_fonts',
            allAppJs: 'all_libs.min.js',
            allAppCss: 'all_libs.min.css'
        },
        allJs: [
            'app/**/*.js', //Files in app directory
            './*.js'        //Files in current directory
        ],
        // to inject in index page in perticular order
        appJs: [
            'app/**/*.module.js', //1st inject all 'module' files
            'app/**/*.service.js', //1st inject all 'service' files
            'app/**/*.directive.js', //2nd inject all 'directives' files
            'app/**/*.controller.js', //2nd inject all 'controller' files
            'app/**/*.js', //Then inject rest of js files
        ],
        tests: {
            unit: [
                'dev/tests/unit/**/*.js',
                // fixtures to load json mock data
                {
                    pattern: 'dev/tests/mocks/**/*.json',
                    watched: true,
                    served: true,
                    included: false
                }
            ],
            e2e: ['dev/tests/app-e2e/**/*.js']
        },
        styles: 'styles/',
        sassFiles: ['styles/*.scss'],    // For SASS files
        appCss: 'styles/style.css',     // For CSS files
        cssFiles: ['styles/*.css'],     // For cleaning
        html2js: {
            templates: [
                '../src/app/**/*.html',
                '!../src/**/index.html'
            ],
            options: {
                moduleName: 'app.templates',
                prefix: "src/app/"
            },
            file: 'app.templates.module.js',
            dest: '../src/app/'
        },
        /**
         * Bower and npm locations
         */
        bower: {
            json: require('./bower.json'),
            directory: bower_components_dir,
            ignorePath: ''
        }

    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    config.getRelative = function (pathToAppend, stringArray) {
        return stringArray.map(function (str) {
            return pathToAppend + str;
        });
    };

    config.getKarmaFiles = function () {

        var wiredep = require('wiredep')({devDependencies: true})['js'];
        var path = require('path');
        var bowerFiles = wiredep.map(function (file) {
//            return path.relative(process.cwd(), file);
            return file;
        });
        var devFiles = config.appJs.map(function (path) {
            return 'src/' + path;
        })
        var allFiles = bowerFiles.concat(devFiles).concat(config.tests.unit)
        return allFiles;
    };
    return config;
};
