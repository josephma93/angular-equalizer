module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      options: {
        port: 9001,
        livereload: true,
        open: 'http://localhost:9001/'
      },
      dev: {
        options: {
          livereload: true
        }
      },
      serve: {}
    },
    jshint: {
      // see: http://jshint.com/docs/options/
      options: {
        curly: true,
        eqeqeq: true,
        futurehostile: true,
        latedef: true,
        maxdepth: 3,
        nonew: true,
        undef: true,
        unused: true,
        browser: true,
        validthis: true,
        globals: {
          angular: true
        }
      },
      dev: {
        options: {
          unused: false,
          globals: {
            console: true
          }
        },
        src: [
          'js/**/*.js'
        ]
      },
      prod: {
        src: [
          'js/**/*.js'
        ]
      },
    },
    uglify: {
      options: {
        sourceMap: true,
        mangle: {
          except: [
            'angular'
          ]
        }
      },
      prod: {
        files: {
          'release/angular-equalize.min.js': [
            'js/**/*-module.js',
            'js/**/*.js'
          ]
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: [
          'js/**/*.js'
        ],
        tasks: ['jshint:dev']
      },
      others: {
        files: [
          '**/*{.html,.css}',
          'tests/**/*',
        ],
        tasks: []
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['jshint:prod', 'uglify:prod', 'connect:serve']);
  grunt.registerTask('dev', ['connect:dev', 'watch']);

};