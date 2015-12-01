/* global require, module */

'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    dirs: {
      src: 'src',
      dist: 'dist',
      demo: 'demo',
    },

    meta: {
      banner: '/**\n' +
      ' * <%= pkg.description %>\n' +
      ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
      ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
      ' */\n'
    },

    //
    // Configuring grunt helpers
    //

    clean: ['<%= dirs.dist %>'],

    concat: {  // grunt-contrib-concat
      options: {
        banner: '<%= meta.banner %>'
      },
      js: {
        src: ['<%= dirs.src %>/*.js'],
        dest: '<%= dirs.dist %>/<%= pkg.name %>.js'
      },
      css: {
        src: ['<%= dirs.src %>/*.css'],
        dest: '<%= dirs.dist %>/<%= pkg.name %>.css'
      }
    },

    connect: {  // grunt-contrib-connect
      dev: {
        options: {
          port: 9999,
          hostname: '0.0.0.0',
          base: '<%= dirs.demo %>',
          keepalive: true
        }
      },
      e2e: {
        options: {
          port: 9999,
          hostname: '0.0.0.0',
          base: '<%= dirs.demo %>',
          keepalive: false
        }
      }
    },

    copy: {
      demo: {
        files: [{
          expand: true,
          flatten: true,
          src: [
            '<%= dirs.dist %>/<%= pkg.name %>.js',
            '<%= dirs.dist %>/<%= pkg.name %>.css'
          ],
          dest: '<%= dirs.demo %>/',
          filter: 'isFile'
        }]
      }
    },

    cssmin: {  // grunt-contrib-cssmin
      combine: {
        files: {
          '<%= dirs.dist %>/<%= pkg.name %>.min.css': ['<%= dirs.dist %>/<%= pkg.name %>.css']
        }
      }
    },

    jshint: {  // grunt-contrib-jshint
      all: [
        'Gruntfile.js',
        '<%= dirs.src %>/**/*.js',
        'test/unit/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    karma: {  // grunt-karma
      single: {
        configFile: 'karma-unit.conf.js',
        singleRun: true
      }
    },

    ngmin: {  // grunt-ngmin
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dirs.dist %>',
          src: '*.js',
          dest: '<%= dirs.dist %>'
        }]
      }
    },

    open: {  // grunt-open
      demo: {
        path: 'http://localhost:9999/'
      }
    },

    protractor: {
      options: {
        configFile: 'node_modules/protractor/example/conf.js', // Default config file
        keepAlive: true,
        noColor: false,
        args: {

        }
      },
      demoApp: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
        options: {
          configFile: 'protractor-e2e.conf.js', // Target-specific config file
          args: {} // Target-specific arguments
        }
      }
    },

    release: {  // grunt-release
      options: {
        file: 'bower.json',
        npm: false
      }
    },

    uglify: {  // grunt-contrib-uglify
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['<%= dirs.dist %>/<%= pkg.name %>.js'],
        dest: '<%= dirs.dist %>/<%= pkg.name %>.min.js'
      }
    },

    watch: {  // grunt-contrib-watch
      src: {
        files: [
          '<%= dirs.src %>/*.js',
          '<%= dirs.src %>/*.css',
        ],
        tasks: ['test'],
      }
    }
  });


  //
  // Grunt tasks.
  //

  // Default task.
  grunt.registerTask('default', [
    'clean',
    'build',
    'run'
  ]);

  // Test task.
  grunt.registerTask('test', [
    'jshint:all',
    'karma:single',
    'connect:e2e',
    'protractor'
  ]);

  // Build task.
  grunt.registerTask('build', [
    // 'test',
    'concat',
    'ngmin',
    'uglify',
    'cssmin',
    'copy'
  ]);

  // Run dev server.
  grunt.registerTask('run', [
    'open',
    'connect'
  ]);

  // Shortcuts
  grunt.registerTask('b', 'build');
  grunt.registerTask('c', 'clean');
  grunt.registerTask('s', 'run');
  grunt.registerTask('t', 'test');
};
