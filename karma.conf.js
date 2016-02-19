module.exports = function(config) {
  config.set({

    basePath: './',

    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/mockfirebase/browser/mockfirebase.js',
      'app/bower_components/jquery/dist/jquery.min.js',
      'app/bower_components/datatables/media/js/jquery.dataTables.js',
      'app/bower_components/angular-datatables/dist/angular-datatables.js',
      'app/bower_components/angular-xeditable/dist/js/xeditable.js',
      'app/bower_components/angularfire/dist/angularfire.js',
      'test/lib/**/*.js',
      'app/app.js',
      'app/config.js',
      'app/components/**/*.js',
      'app/account/**/*.js',
      'app/home/**/*.js',
      'app/login/**/*.js',
      'app/hotel_login/**/*.js',
      'app/userDash/**/*.js',
      'app/hoteldash/**/*.js',
      'app/dashTables/*.js',
      'app/photo/**/*.js',
      'app/config_test.js'
    ],
    
    exclude: ['app/photo/streamConfig.js'],

    autoWatch: true,

    frameworks: ['jasmine'],

    logLevel: config.LOG_INFO,

    colors: true,

    singleRun: true,

    reporters: ["progress", "spec", "coverage"],

    preprocessors: {
    'app/!(*components)/**/!(*test|*webcam*).js': ['coverage'],
    'app/components/pictureStore/!(*test).js': ['coverage']
    },

    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/'
    },

    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true // do not print information about skipped tests
    },


    browsers: ['Firefox'],

    plugins: [
      'karma-spec-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-coverage',
    ],

  });
};
