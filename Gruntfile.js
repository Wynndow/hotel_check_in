
var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    express: {
      options: {
        port: process.env.PORT || 3000,
        hostname: 'localhost'
      },
      test: {
        options: {
          server: path.resolve('./app')
        },
      }
    },
    karma: {
      options: {
        configFile: './public/javascripts/spec/karma.conf.js'
      },
      run: {
      }
    },
    protractor: {
      options: {
        configFile: './public/javascripts/spec/e2e/conf.js',
        keepAlive: true
      },
      run: {
      }
    },
    protractor_webdriver: {
      start: {
        options: {
          path: 'node_modules/protractor/bin/',
          command: 'webdriver-manager start'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-protractor-webdriver');
  grunt.registerTask('e2e', ['express:test', 'protractor_webdriver', 'protractor']);

};
