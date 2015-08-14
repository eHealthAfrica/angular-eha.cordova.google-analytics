'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: [
        'dist/'
      ],
      tmp: [
        '.tmp/'
      ]
    },
    copy: {
      scripts: {
        expand: true,
        cwd: '.tmp',
        src: [
          'scripts.js'
        ],
        dest: 'dist/',
        rename: function(dest, src) {
          return dest + src.replace('scripts', 'cordova.google-analytics');
        }
      },
      styles: {
        expand: true,
        flatten: true,
        src: 'src/**/*.css',
        dest: 'dist'
      }
    },
    concat: {
      scripts: {
        src: [
          'src/**/*.js',
          '!src/**/*.spec.js'
        ],
        dest: '.tmp/scripts.js',
        options: {
          process: function(src) {
            // Remove templates dependency from non-templates version if exists
            return src.replace(/,\n {2}'eha\.cordova.google-analytics\.template'/, '');
          }
        }
      }
    },
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      tmp: {
        files: [
          {
            expand: true,
            src: [
              '.tmp/**/*.js'
            ]
          }
        ]
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/cordova.google-analytics.min.js': [
            '.tmp/scripts.js'
          ]
        }
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      unit: {
        singleRun: true,
        autoWatch: false
      },
      watch: {
        singleRun: false,
        autoWatch: true
      }
    },
    eslint: {
      all: [
        '*.js',
        'src/*.js',
        'tests/**/*.js'
      ]
    }
  });

  grunt.registerTask('test', [
    'eslint',
    'karma:unit'
  ]);

  grunt.registerTask('test:watch', [
    'karma:watch'
  ]);

  grunt.registerTask('build', function() {
    grunt.task.run([
      'eslint',
      'clean',
      'concat:scripts',
      'ngAnnotate',
      'copy:scripts',
      'copy:styles',
      'uglify:dist'
    ]);
  });

  grunt.registerTask('default', [
    'build'
  ]);
};
