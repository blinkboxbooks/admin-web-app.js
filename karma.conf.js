// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
			// libraries
			'app/bower_components/jquery/jquery.js',
			'app/bower_components/angular/angular.js',
			'app/bower_components/angular-mocks/angular-mocks.js',
			'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
			'app/bower_components/angular-sanitize/angular-sanitize.js',
			'app/bower_components/angular-animate/angular-animate.js',
			'app/bower_components/angular-route/angular-route.js',
			'app/bower_components/moment/moment.js',
			'app/bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
			'app/lib/template/html/assets/data-tables/jquery.dataTables.js',
			'app/lib/template/html/assets/data-tables/DT_bootstrap.js',

			// our app
      'app/scripts/*.js',
			'app/scripts/**/*.js',

			// templates
			'app/views/templates/*.html',

			// tests
      'test/spec/**/*.js'
    ],

		// generate js files from html templates
		preprocessors: {
			'app/views/templates/*.html': 'ng-html2js',
			'app/scripts/**/*.js': 'coverage'
		},

		ngHtml2JsPreprocessor: {
			// Paths by default are relative to DISK root,
			// so we need to make them relative to this folder
			cacheIdFromPath : function(filepath) {
				return filepath.substr("app/".length);
			},
			// setting this option will create only a single module that contains templates from all the files, so you can load them all with module('templates')
			moduleName: 'templates'
		},

		reporters: ['progress', 'coverage'],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
