module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    karma: {
      unit: {
        configFile: './public/javascripts/spec/karma.conf.js'
      }
    },

    protractor: {
      options: {
        configFile: './public/javascripts/spec/e2e/conf.js',
        noColor: false,
        debug: false,
        args: {}
      },
      e2e: {
        options: {
          keepAlive: false
        }
      },
      continuous: {
        options: {
          keepAlive: true
        }
      }
    },

    protractor_webdriver: {
      your_target: {
        options: {
          path: './node_modules/protractor/bin/',
          command: 'webdriver-manager start'
        },
      },
    },

    express: {
      options: {
        server: path.resolve('./app')
      },
      run: {

      }
    }




  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-protractor-webdriver');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.registerTask('default', ['karma']);
  grunt.registerTask('e2e-test', ['express', 'protractor_webdriver', 'protractor:e2e']);
};
